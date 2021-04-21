import ImageExtractor from './image-extractor';
const
	http = require('http'),
	https = require('https'),
	fs = require('fs');

export default class ImageLinkExtractor implements ImageExtractor {

	async download(url: string, destination: string) {
		const file = fs.createWriteStream(destination);
		const protocol = url.startsWith('https') ? https : http;

		await protocol
			.get(url, (response: any) => {
				response.pipe(file);
				file.on('finish', file.close);
			})
			.on('error', (err: any) => {
				console.error(err);
				fs.unlink(destination, null);
			})
			.end();
	}

	async check(destination: string): Promise<boolean> {
		const stats = await fs.promises.stat(destination);
		return stats.size;
	}
}
