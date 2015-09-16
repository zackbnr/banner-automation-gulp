var fs = require('fs');

// helper function for getting the contents of a file
module.exports = function(filepath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filepath, 'utf-8', function(err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};
