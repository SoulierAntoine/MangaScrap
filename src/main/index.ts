'use strict';

import Source from './models/core/source';

const sourcesFromConfig = require('./conf/sources.json');

// TODO: more thoroughly check params
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Error in arguments. TODO: display usage...');
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
const test = sourceUsed.scraper.getManga(mangaRequested);
console.log(test)
