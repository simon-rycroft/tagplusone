#! /usr/bin/env node
'use strict';

import GitClient from './lib/GitClient.js';

let git = new GitClient();

git.sayHello();
