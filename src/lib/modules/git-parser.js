'use strict';

export default class GitParser {

    parseTags(tagsString, callback) {

        let data = [],
            err = '';

        if (typeof tagsString !== "string") {
            err += 'tags must be a string';
        } else {
            data = tagsString.split('\n');
        }

        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    }
}
