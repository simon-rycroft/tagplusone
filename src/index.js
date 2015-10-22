#! /usr/bin/env node
'use strict';

import GitClient from './lib/GitClient';

let git = new GitClient();

git.sayHello();
