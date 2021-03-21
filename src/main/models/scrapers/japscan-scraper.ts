'use strict';

import SourceScraper from './source-scraper';
import UrlUtils from "../../commons/utils/url-utils";
import BrowserService from "../../services/browser-service";

const puppeteer = require('puppeteer');

export default class JapscanScraper extends SourceScraper {

    constructor(url: string) {
        super(url);
    }

    getManga(mangaId: string) {
        return Promise.resolve(mangaId);
    }

    getMangaUrl(mangaId: string): string {
        return UrlUtils.url(true, this.url, mangaId);
    }

    async getChapters(mangaId: string): Promise<string[]> {
        const mangaUrl = this.getMangaUrl(mangaId);
        this.browserService = await BrowserService.getInstance();
        const page = await this.browserService.getPage(0);

        await page.goto(mangaUrl);

        const result = await page.evaluate(() => {
            const chapterLinks: string[] = [];
            const elements = document.querySelectorAll('#chapters_list .chapters_list a');

            elements.forEach(element => {
                const href = element.getAttribute('href');
                if (href !== null) chapterLinks.push(href);
            });

            return chapterLinks;
        });

        await this.browserService.closePage(page);

        return result;
    }

    async getPages(chapter: string): Promise<string[]> {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        const chapterUrl = UrlUtils.url(true, this. url, chapter);
        await page.goto(chapterUrl);
        const imageLinks: string[] = [];

        // TODO: go next page
        // TODO: setup image extractor
        await page.evaluate(() => {
            const element = document.querySelector('#image');
            if (element !== null) {
                const href = element.getAttribute('data-src');
                if (href !== null) imageLinks.push(href);
            }

            return imageLinks;
        });

        await browser.close();
        return Promise.resolve([]);
    }

    getVolumes() {
        return Promise.resolve(null);
    }
}
