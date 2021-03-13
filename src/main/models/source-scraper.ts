
export default interface SourceScraper {
    getManga(id: string): string[];
    getVolumes():         string[];
    getChapters():        string[];
    getPages():           string[];
}
