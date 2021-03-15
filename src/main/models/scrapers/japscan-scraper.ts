import SourceScraper from '../source-scraper';
import UrlUtils from "../../commons/utils/url-utils";
const puppeteer = require('puppeteer');

export default class JapScanScraper extends SourceScraper {

    constructor(url: string) {
        super(url);
    }

    getChapters() {
        return Promise.resolve(null);
    }

    getMangaUrl(id: string): string {
        return UrlUtils.addTrailingSlash(
            super.getMangaUrl(id)
        );
    }

    async getManga(id: string): Promise<any> {
        // TODO: have some config : if dev or test, set headless to false
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        const mangaUrl = this.getMangaUrl(id);
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

    getPages() {
        return Promise.resolve(null);
    }

    getVolumes() {
        return Promise.resolve(null);
    }
}
