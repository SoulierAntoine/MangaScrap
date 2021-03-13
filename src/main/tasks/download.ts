const
	http = require('http'),
	fs = require('fs');

import Node from '../../main/models/node';

export const download = async (url: string, destination: string) => {
	const file = fs.createWriteStream(destination);

	await http
		.get(url, (response: any) => {
			response.pipe(file);
			file.on('finish', file.close);
		})
		.on('error', (err: any) => {
			console.error(err);
			fs.unlink(destination, null);
		})
		.end();

	// return Promise.resolve(new Node(1, -1, [], 1));
};
