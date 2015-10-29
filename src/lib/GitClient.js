'use strict';

import {spawn} from 'child_process';

export default class GitClient {

    tag(done) {
        let tag = spawn('git', ['tag']);

        tag.stdout.on('data', (data) => {
            console.log('stdout: ' + data);
            done(data);
        });

        tag.stderr.on('data', (data) => {
            console.log('stderr: ' + data);
            done(data);
        });

        tag.on('close', (code) => {
            console.log('child process exited with code ' + code);
            done(code);
        });
    }
}

