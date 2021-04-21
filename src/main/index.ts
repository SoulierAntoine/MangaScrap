'use strict';

import Source from './models/core/source';
import UrlUtils from "./commons/utils/url-utils";

const main = async() => {

    const sourcesFromConfig = require('./conf/sources.json');

    // japscan one-punch-man
    // mangafox onepunch_man

    // TODO: more thoroughly check params, and display usage
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.error('Error in arguments.');
        process.exit(1);
    }

    const sourceRequested = args[0];

    const sourceUsed = sourcesFromConfig
        .map((source: any) => new Source(source.label, source.name, source.url, source.scraper))
        .find((source: Source) => source.name === sourceRequested);

    if (sourceUsed === undefined) {
        console.error('Please use a source that exists in the source configuration file');
        process.exit(1);
    }

    const mangaRequested = args[1];
    // TODO: RetryStrategy


    // TODO: check if we should manipulate URL object instead of strings,
    //  if so, extends URL with the utilities of UrlUtils

    // const chapters = await sourceUsed.scraper.getChapters(mangaRequested);
    // const images = await sourceUsed.scraper.getPages(chapters[0]);
    const images = await sourceUsed.scraper.getPages('/onepunch_man/v01/c001/1.html');
    await sourceUsed.scraper.imageExtractorCtx.getImageFromUrl(UrlUtils.prependProtocol(images[0], 'https'), './test.png');

    // const result = await sourceUsed.scraper.imageExtractorCtx.checkImage('./test.png');
    // console.log('Image downloaded: ', result);

    // for await (const chapter of await sourceUsed.scraper.getChapters(mangaRequested)) {
    //     const images = await sourceUsed.scraper.getPages(chapter);
    //     console.log(images);
    // }

    return 1;
};

main()
    .then((res) => {
        console.log('Exit code: ', res);
    })
    .catch((e) => {
        console.error(e);
        process.exit(-1);
    });
