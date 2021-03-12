'use strict';

import {Type} from "../models/meta";
import Download from '../models/download';

const
	puppeteer = require('puppeteer');


/**
 * Possible future elaboration : multithreading
 * Having several child process in this case might come in handy :
 * The master slice the download into several children (children A download the first 5 chapters, children B the 5 next, etc.)
 *
 * Input : manga, liste de chapitres
 * {
 *      source: "mangafox",
 *      manga: "onepunch_man"
 * }
 *
 * In the end we get an array of .png / .jpg from the scraping function to organise
 * How it does it and the end result entirely depends on exterior elements (the source we're scraping)
 *
 * Output:
 * {
 *     manga: "onepunch_man",
 *     downloaded: false,
 *     completion: 0.5,
 *     volumes: [{
 *         name:
 *         number: 1,
 *         completion: <number_of_chapters_downloaded>
 *         downloaded: false,
 *         chapters: [{
 *             downloaded: false,
 *             completion: 0.5,
 *             pages: [{number: 1, downloaded: true}, {number: 2, downloaded: false}]
 *         }]
 *     }]
 * }
 *
 * Or:
 * {
 *     parent: null if root (type: manga)
 *     children: [
 *          {parent, children: [{...}]
 *     ]
 *     data: name, number, type, downloaded, completion...
 * }
 */

export const scrape = async (name: string, chapters: number[]): Promise<Download> => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://fanfox.net/manga/onepunch_man/v01/c001/1.html');


	const result = await page.evaluate(() => {
		const element: HTMLImageElement | null = document.querySelector('.reader-main-img');
		const url = element?.src;
		const name = '01.jpg';

		// TODO: if url might be undefined
		return {url, name};
	});

	console.log("result: ", result);
	await browser.close();

	return Promise.resolve(new Download({}, result.url));
	// download(result.url, result.name);
};
