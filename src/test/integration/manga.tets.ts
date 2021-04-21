'use strict';

describe('manga', () => {
	test('will scrape', () => {
		/*
		 * Check if we want to proceed by 'tasks':
		 *   1) scrape
		 *   2) download
		 *   3) save
		 */

		/**
		 * [{data: {}, }]
		 * Could be a 'chapter download' which would return an array of image
		 * Or this could be a node
		 * Lets say we try to download the entire manga
		 * We provide onepunch_man, it could be the id
		 * no parent
		 * We set the data as ...?
		 *
		 * Then for each chapter
		 *
		 * The 'business' side has to come up with a way to get all the chapters from the page, depending on the source
		 * The 'main_page', also business related, should be the page of the first chapter, first image
		 */
		// const downloads = scrape('onepunch_man', [1,2,3])
	});
	test('will download', async () => {
		/*
		 * {
		 *     parent: null if root (type: manga)
		 * 	   level: 1,
		 *     children: [
		 *          {parent, children: [{...}]
		 *     ],
		 *     data: name, number, type, downloaded, completion...
		 * }
		 */
		// const root = await download('onepunch_man', './'); // download chapter 1, 2 and 3 one_punchman to current dir
		// expect(root.level === 1 && root.children.length === 1);
		// const chapters = NodeUtils.getNodesAtLevel(root, 3);
		// expect(chapters.map((chapter: Node) => chapter.id).toEqual([1,2,3]));
	})
})
