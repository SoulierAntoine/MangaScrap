import BrowserService from '../../main/services/browser-service';

describe('browser service', () => {
	let service: BrowserService;

	beforeAll(async () => {
		service = await BrowserService.getInstance();
	});

	afterAll(async() => {
		await service.close();
	});

	test('should be instantiated', async () => {
		expect(service).not.toBe(null);
		expect(service instanceof BrowserService).toBe(true);
	});

	describe('with page', () => {
		test('should have one per default', async () => {
			const page = await service.getPage(0);
			expect(page).not.toBe(null);
			await service.closePage(page);
		});
	});
});

