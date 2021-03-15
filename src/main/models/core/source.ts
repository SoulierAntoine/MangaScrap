import SourceScraper from '../source-scraper';
import DefaultScraper from "../scrapers/default-scraper";
import JapScanScraper from "../scrapers/japscan-scraper";


export default class Source {
    private readonly _label: string;
    private readonly _name: string;
    private readonly _url: string;
    private readonly _scraper: SourceScraper

    constructor(label: string, name: string, url: string, scraper: string) {
        this._label = label;
        this._name = name;
        this._url = url;
        this._scraper = this.scraperSolver(scraper);
    }

    get scraper(): SourceScraper {
        return this._scraper;
    }

    get label(): string {
        return this._label;
    }

    get name(): string {
        return this._name;
    }

    get url(): string {
        return this._url;
    }

    scraperSolver(scraperRequested: string): SourceScraper {
        switch (scraperRequested) {
            // case 'MangafoxScraper':
            //     return new MangafoxScraper(this.url);
            case 'JapScanScraper':
                return new JapScanScraper(this.url);
            // case 'LireScanScraper':
            //     return new LireScanScraper(this.url);
            default:
                return new DefaultScraper(this.url);
        }
    }
}
