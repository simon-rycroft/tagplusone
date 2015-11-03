'use strict';

import {spawn} from 'child_process';

export default class GitClient {

    tag(done) {

        console.log('arse');

        let tag = spawn('git', ['tag']),
            output, err;

        tag.stdout.on('data', (data) => {
            console.log('Calling...');
            output += data.toString();
        });

        tag.stderr.on('data', (data) => {
            console.log('Receiving data...');
            err += data.toString();
        });

        tag.on('close', (code) => {
            console.log('Closing...');
            if (code !== 0) {
                err += "git tag exited with error code " + code;
            }
            done(err, output);
        });
    }
}

