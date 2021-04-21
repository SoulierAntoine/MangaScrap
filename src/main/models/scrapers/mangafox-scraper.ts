'use strict';

import SourceScraper from './source-scraper';
import BrowserService from '../../services/browser-service';
import {Page} from 'puppeteer';
import ImageExtractor from '../extractors/image-extractor';
import ImageExtractorContext from '../extractors/image-extractor-context';
import UrlUtils from "../../commons/utils/url-utils";


export default class MangaFoxScraper extends SourceScraper {

    imageExtractorCtx: ImageExtractorContext;

    static readonly SELECTORS = {
        chapter_list: '#chapterlist',
        expand_btn: '#chapterlist a[onclick=\'javascript:showMore(this);\']',
        all_chapters_link: '#chapterlist li a',
        image: '.reader-main .reader-main-img'
    };

    constructor(url: string, strategy: ImageExtractor) {
        super(url);
        this.imageExtractorCtx = new ImageExtractorContext(strategy);
    }

    async getChapters(mangaId: string): Promise<string[]> {
        this.browserService = await BrowserService.getInstance();
        const page = await this.browserService.getPage(0);
        const mangaUrl = this.getMangaUrl(mangaId);

        await page.goto(mangaUrl);
        await this.expandChaptersList(page);

        const result = await page.evaluate((selectors) => {
            const chapterLinks: string[] = [];
            const elements = document.querySelectorAll(selectors.all_chapters_link);

            elements.forEach(element => {
                const href = element.getAttribute('href');
                if (href !== null) chapterLinks.push(href);
            });

            return chapterLinks;
        }, MangaFoxScraper.SELECTORS);

        await this.browserService.closePage(page);

        return result;
    }

    async getPages(chapter: string): Promise<string[]> {
        this.browserService = await BrowserService.getInstance();

        const page = await this.browserService.getPage(0);
        const chapterUrl = UrlUtils.url(false, this.url, chapter);

        await page.goto(chapterUrl);
        await this.goNextPage(page);
        const result = await this.getImage(page);

        await this.browserService.closePage(page);
        return Array.of(result);
    }

    /**
     * TODO: if null, might want to wrap up everything in a setInterval with a exponential backoff strategy
     * @param page
     * @private
     */
    private async getImage(page: Page) {
        return await page.evaluate((selectors) => {
            const element = document.querySelector(selectors);
            let result = '';
            if (element !== null) {
                const href = element.getAttribute('src');
                if (href !== null) result = href;
            }

            return result;
        }, MangaFoxScraper.SELECTORS.image);
    }

    private async goNextPage(page: Page): Promise<void> {
        await Promise.all([
            page.waitForNavigation(),
            page.click(MangaFoxScraper.SELECTORS.image)
        ]);
    }

    private async expandChaptersList(page: Page) {
        let canExpand = true;
        do {
            try {
                await Promise.all([
                    page.waitForNavigation(),
                    page.click(MangaFoxScraper.SELECTORS.expand_btn)
                ]);
            } catch (_) {
                canExpand = false;
            }
        } while (canExpand)
    }
}
