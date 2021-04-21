
export default interface ImageExtractor {
	download(url: string, destination: string): Promise<void>;
	check(filePath: string): Promise<boolean>;
}
