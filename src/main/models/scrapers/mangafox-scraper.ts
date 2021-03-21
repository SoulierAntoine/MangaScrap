'use strict';

import SourceScraper from './source-scraper';
import BrowserService from '../../services/browser-service';
import {Page} from 'puppeteer';

const puppeteer = require('puppeteer');

export default class MangaFoxScraper extends SourceScraper {

    private static readonly SELECTORS = {
        chapter_list: '#chapterlist',
        expand_btn: () => `${MangaFoxScraper.SELECTORS.chapter_list} a[onclick='javascript:showMore(this);']`,
        all_chapters_link: () => `${MangaFoxScraper.SELECTORS.chapter_list} li a`
    };

    constructor(url: string) {
        super(url);
    }

    async getChapters(mangaId: string): Promise<string[]> {
        this.browserService = await BrowserService.getInstance();
        const page = await this.browserService.getPage(0);
        const mangaUrl = this.getMangaUrl(mangaId);

        await page.goto(mangaUrl);
        await this.expandChaptersList(page);

        const result = await page.evaluate(() => {
            const chapterLinks: string[] = [];
            const elements = document.querySelectorAll(MangaFoxScraper.SELECTORS.all_chapters_link());

            elements.forEach(element => {
                const href = element.getAttribute('href');
                if (href !== null) chapterLinks.push(href);
            });

            return chapterLinks;
        });

        await this.browserService.closePage(page);

        return result;
    }

    private async expandChaptersList(page: Page): Promise<void> {
        let canExpand = true;
        do {
            try {
                await Promise.all([
                    page.waitForNavigation(),
                    page.click(MangaFoxScraper.SELECTORS.expand_btn())
                ]);
            } catch (_) {
                canExpand = false;
            }
        } while (canExpand)
    }
}
