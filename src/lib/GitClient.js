'use strict';

import {spawn} from 'child_process';

export default class GitClient {

    tag() {
        let tag = spawn('git', ['tag']);

        tag.stdout.on('data', (data) => {
            console.log('stdout: ' + data);
        });

        tag.stderr.on('data', (data) => {
            console.log('stderr: ' + data);
        });

        tag.on('close', (code) => {
            console.log('child process exited with code ' + code);
        });
    }
}

