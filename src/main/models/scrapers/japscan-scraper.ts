'use strict';

import SourceScraper from '../source-scraper';

const puppeteer = require('puppeteer');

export default class JapScanScraper extends SourceScraper {

    constructor(url: string) {
        super(url);
    }

    async getChapters(mangaId: string): Promise<string[]> {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        const mangaUrl = this.getMangaUrl(mangaId);
        console.log('mangaUrl: ', mangaUrl);
        await page.goto(mangaUrl);

        await browser.close();
        return Promise.resolve([]);
    }
}
