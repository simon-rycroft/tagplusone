#! /usr/bin/env node
'use strict';

import GitClient from './lib/modules/git-client';

const git = new GitClient();

git.tag((err, data) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Data: ${data}`);
});
