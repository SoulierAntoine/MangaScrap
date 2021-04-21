import ImageExtractor from './image-extractor';

export default class ImageExtractorContext {
	strategy: ImageExtractor;

	constructor(strategy: ImageExtractor) {
		this.strategy = strategy;
	}

	async getImageFromUrl(url: string, destination: string): Promise<void> {
		return await this.strategy.download(url, destination);
	}

	async checkImage(destination: string) {
		return await this.strategy.check(destination);
	}
}
