var gulp    = require('gulp'),
    glob    = require('glob'),
    fs      = require('fs'),
    _       = require('lodash');

// finds all the images not refrenced in a source file and removes them from the project
gulp.task('removeUnusedImages', function() {

    // path that we will be working in (NOTE: this can be abstracted later on)
    var path = './public/test-banner/';

    // get the javascript file that refrences the images
    var getSource = function() {
        return new Promise(function(resolve, reject) {
            fs.readFile(path + 'scripts.js', 'utf-8', function(err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    };

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
    }

    // loop through an array of image files and remove them
    var removeFiles = function(files) {
        return new Promise(function(resolve, reject) {
            _.each(files, function(file) {
                fs.unlink(path + 'images/' + file);
            });
            resolve();
        });
    }

    return getSource()
        .then(getUnusedImages)
        .then(removeFiles);

});

gulp.task('default', ['removeUnusedImages'], function(a) {
    return;
});
