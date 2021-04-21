'use strict';

import SourceScraper from './source-scraper';
import UrlUtils from '../../commons/utils/url-utils';
import BrowserService from '../../services/browser-service';
import ImageExtractorContext from '../extractors/image-extractor-context';
import ImageExtractor from "../extractors/image-extractor";

export default class JapscanScraper extends SourceScraper {

    imageExtractorCtx: ImageExtractorContext;

    private static readonly SELECTORS = {
        all_chapters_link: '#chapters_list .chapters_list a',
        image: '#image'
    };

    constructor(url: string, strategy: ImageExtractor) {
        super(url);
        this.imageExtractorCtx = new ImageExtractorContext(strategy);
    }

    getManga(mangaId: string) {
        return Promise.resolve(mangaId);
    }

    getMangaUrl(mangaId: string): string {
        return UrlUtils.url(true, this.url, mangaId);
    }

    // TODO: Given a fixed HTML page, this should output a list of strings considering of all the
    //  chapters
    async getChapters(mangaId: string): Promise<string[]> {
        const mangaUrl = this.getMangaUrl(mangaId);
        this.browserService = await BrowserService.getInstance();
        const page = await this.browserService.getPage(0);

        await page.goto(mangaUrl);

        const result = await page.evaluate(() => {
            const chapterLinks: string[] = [];
            const elements = document.querySelectorAll(JapscanScraper.SELECTORS.all_chapters_link);

            elements.forEach(element => {
                const href = element.getAttribute('href');
                if (href !== null) chapterLinks.push(href);
            });

            return chapterLinks;
        });

        await this.browserService.closePage(page);

        return result;
    }

    // TODO: this closes and reopen a window : this might be unnecessary
    async getPages(chapter: string): Promise<string[]> {
        const chapterUrl = UrlUtils.url(true, this.url, chapter);

        this.browserService = await BrowserService.getInstance();
        const page = await this.browserService.getPage(0);

        // TODO: go to next page after getting the image
        await page.goto(chapterUrl);
        /* await page.waitForNavigation({
            timeout: 0,
            waitUntil: ['domcontentloaded', 'networkidle0']
        }); */

        const result: string = await page.evaluate(() => {
            const element = document.querySelector('#image');
            let result = '';
            if (element !== null) {
                const href = element.getAttribute('data-src');
                if (href !== null) result = href;
            }

            return result;
        });

        await this.browserService.closePage(page);

        return Array.of(result);
    }

    getVolumes() {
        return Promise.resolve(null);
    }
}
