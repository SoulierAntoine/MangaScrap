import SourceScraper from "../source-scraper";

export default class MangafoxScraper implements SourceScraper {
    getChapters(): string[] {
        return [];
    }

    getManga(id: string): string[] {
        return [];
    }

    getPages(): string[] {
        return [];
    }

    getVolumes(): string[] {
        return [];
    }
}
