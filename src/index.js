#! /usr/bin/env node
'use strict';

import GitClient from './lib/modules/git-client';
import GitParser from './lib/modules/git-parser';

const git = new GitClient();
const parser = new GitParser();
const prefix = process.argv[2];

git.tag(prefix, (err, tags) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    parser.getNextTag(tags, prefix, (err, nextTag) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(nextTag);
    });
});

