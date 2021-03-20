'use strict';

import UrlUtils from "../commons/utils/url-utils";

export default abstract class SourceScraper {
    url: string;

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
