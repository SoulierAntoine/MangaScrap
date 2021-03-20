'use strict';

import SourceScraper from '../source-scraper';
import UrlUtils from "../../commons/utils/url-utils";

const puppeteer = require('puppeteer');

export default class MangafoxScraper extends SourceScraper {

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
        // TODO: have some config : if dev or test, set headless to false
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        const mangaUrl = this.getMangaUrl(mangaId);
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

        // TODO: depending on the behavior and what tasks must be done,
        //  we might need to create an abstract class to take care of common tasks
        //  e.g closing the browser must be done automatically each time otherwise resources are not freed.
        await browser.close();
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
        const result = await page.evaluate(() => {
            const element = document.querySelector('#image');
            const href = element.getAttribute('data-src');
            if (href !== null) imageLinks.push(href);

            return imageLinks;
        });

        await browser.close();
        return result;
    }

    getVolumes() {
        return Promise.resolve(null);
    }
}
