'use strict';

import {Browser, HTTPRequest, HTTPResponse, Page} from 'puppeteer';

const puppeteer = require('puppeteer');

/**
 * Singleton used as a 'proxy' for puppeteer to handle page delivery and setup requests interceptors
 */
export default class BrowserService {

	private browser!: Browser;
	private static instance: BrowserService|null = null;

	private paused = false;
	private pausedRequests: any = [];

	private constructor() {}

	static async getInstance(): Promise<BrowserService> {
		if (this.instance === null) {
			this.instance = new BrowserService();
			await this.instance.init();
		}
		return this.instance;
	}

	private async init() {
		// TODO: do config, e.g.: if dev or test, set headless to false
		this.browser = await puppeteer.launch();
	}

	async getPage(index: number): Promise<Page> {
		const pages = await this.browser.pages();
		if (index < pages.length) {
			const page = pages[index];
			await this.setPageInterceptors(page);
			return page;
		} else {
			return this.newPage();
		}
	}

	async newPage(): Promise<Page> {
		const page = await this.browser.newPage();
		await this.setPageInterceptors(page);
		return page;
	}

	async closePage(page: Page) {
		await page.close();
		const pages = await this.browser.pages();
		if (pages.length === 0) {
			await this.browser.close();
			BrowserService.instance = null;
		}
	}

	private async setPageInterceptors(page: Page) {
		// Enables page interceptors, disables pages caching.
		await page.setRequestInterception(true);

		// Cannot provide methods name directly because context would be lost and 'this' would be undefined
		page
			.on('request', (request) => this.onRequest(request))
			.on('requestfinished', (request) => this.onRequestFinished(request))
			.on('requestfailed', () => this.nextRequest());
	}

	private onRequest(request: HTTPRequest) {
		if (this.paused) {
			this.pausedRequests.push(() => request.continue());
		} else {
			// pause, as we are processing a request now
			this.paused = true;
			request.continue();
		}
	}

	private async onRequestFinished(request: HTTPRequest) {
		const response: HTTPResponse|null = await request.response();
		if (response !== null) {
			console.log(`[${new Date().toISOString()}] ${request.url()} => ${response.status()} ${response.statusText()}`)
		}
		this.nextRequest();
	}

	/**
	 * Continue the next request, or 'unpause'
	 * @private
	 */
	private nextRequest() {
		if (this.pausedRequests.length === 0) {
			this.paused = false;
		} else {
			// Continue first request in "queue"
			(this.pausedRequests.shift())(); // Calls the request.continue function
		}
	}
}
