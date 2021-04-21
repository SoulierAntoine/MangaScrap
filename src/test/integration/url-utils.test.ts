import UrlUtils from '../../main/commons/utils/url-utils';

describe('url utils', function () {

	// Arguments should all be string
	const tests = new Map([
		[['', 'https'], ''],
		[['https://google.com', 'https'], 'https://google.com'],
		[['google.com', 'https'], 'https://google.com'],
		[['ftp://google.com', 'https'], 'https://google.com'],
		[['//google.com', 'smtp'], 'smtp://google.com'],
	]);

	// @ts-ignore
	for (const [[url, protocol], output] of tests) {
		test(`prependProtocol with arguments: [${url}] [${protocol}]`, () => {
			expect(UrlUtils.prependProtocol(url, protocol)).toEqual(output);
		});
	}
});
