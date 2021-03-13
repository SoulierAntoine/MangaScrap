import SourceScraper from "../source-scraper";

export default class DefaultScraper implements SourceScraper {
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
