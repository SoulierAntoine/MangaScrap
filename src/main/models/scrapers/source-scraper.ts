'use strict';

import UrlUtils from "../../commons/utils/url-utils";
import BrowserService from '../../services/browser-service';

export default abstract class SourceScraper {
    url: string;
    browserService: BrowserService|null = null;

    protected constructor(url: string) {
        this.url = url;
    }

    getMangaUrl(mangaId: string): string {
        return UrlUtils.url(false, this.url, mangaId);
    }

    getChapters(mangaId: string): Promise<string[]> {
        return Promise.resolve([]);
    }

    getManga(mangaId: string): Promise<string> {
        return Promise.resolve('');
    }

    getPages(chapter: string): Promise<string[]> {
        return Promise.resolve([]);
    }

    getVolumes() {
        return Promise.resolve(null);
    }
}
