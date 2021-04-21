import ImageExtractor from "./image-extractor";


export default class ImageNetworkExtractor implements ImageExtractor {
	check(filePath: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	download(url: string, destination: string): Promise<void> {
		return Promise.resolve(undefined);
	}
}
