'use strict';

import {spawn} from 'child_process';

export default class GitClient {
    tag() {
        spawn('git tag');
    }
}

