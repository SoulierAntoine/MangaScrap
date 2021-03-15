import UrlUtils from "../commons/utils/url-utils";

export default abstract class SourceScraper {
    url: string;

    protected constructor(url: string) {
        this.url = url;
    }

    getMangaUrl(id: string): string {
        return UrlUtils.url(this.url, id);
    }

    getChapters() {
        return Promise.resolve(null);
    }

    getManga(id: string) {
        return Promise.resolve(null);
    }

    getPages() {
        return Promise.resolve(null);
    }

    getVolumes() {
        return Promise.resolve(null);
    }
    // abstract getManga(id: string): Promise<any>;
    // abstract getVolumes():         Promise<any>;
    // abstract getChapters():        Promise<any>;
    // abstract getPages():           Promise<any>;
}
