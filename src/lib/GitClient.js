'use strict';

import {exec} from 'child_process';

export default class GitClient {
    tag() {
        exec('git tag');
    }
}

