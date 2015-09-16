var glob    = require('glob'),
    fs      = require('fs'),
    _       = require('lodash');

var getFileContent = require('./getFileContent.js');

module.exports = function(path) {

    // find all the images not refrenced in the source file (string)
    var getUnusedImages = function(source) {
        return new Promise(function(resolve, reject) {
            glob('*', { cwd: path + 'images/', ignore: 'backup.*' }, function(err, files) {
                if (err) reject(err);
                var unused = _.filter(files, function(file) {
                    return source.indexOf(file) == -1;
                });
                resolve(unused);
            });
        });
    };

    // loop through an array of image files and remove them
    var removeFiles = function(files) {
        return new Promise(function(resolve, reject) {
            _.each(files, function(file) {
                fs.unlink(path + 'images/' + file);
            });
            resolve();
        });
    };

    return getFileContent(path + 'scripts.js')
        .then(getUnusedImages)
        .then(removeFiles);
};
