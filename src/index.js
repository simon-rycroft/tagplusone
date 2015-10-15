#! /usr/bin/env node
'use strict';

import {GitClient} from './lib/GitClient.js';

let client = new GitClient();
console.log(client);
