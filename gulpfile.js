var gulp    = require('gulp'),
    _       = require('lodash');

var getFileContent = require('./gulp-tasks/getFileContent.js');
var imageRemoval = require('./gulp-tasks/imageRemoval.js');
var htmlUpdate = require('./gulp-tasks/htmlUpdate.js');

var banners = require('./banners.json');
var variations = _.flatten(_.pluck(banners, 'variations'));

// NOTE: this is hard-coded for the moment
var exitTagName = 'test';

// helper function to get a directory path based on a file path
var getDirectory = function(path) {
    path = path.split('/');
    path.pop();
    path = path.join('/') + '/';
    return path;
};

// finds all the images not refrenced in a source file and removes them from the project
gulp.task('removeUnusedImages', function() {
    _.each(variations, function(banner) {
        // get the directory path (without the file name)
        var path = getDirectory(banner.path);
        // run the image removal task
        imageRemoval(path);
    });
});

// add the necessary stuff to the html (if it isn't already) to comply with double click
gulp.task('updateHTML', function() {
    _.each(variations, function(banner) {
        // get the directory path
        var path = getDirectory(banner.path);
        // get the sizes
        var size = banner.name.split('x');
        // run the update task
        htmlUpdate(path, size[0], size[1], exitTagName);
    });
});

// compress the banners and move them to the dist folder
gulp.task('compress', function() {

});

gulp.task('default', ['removeUnusedImages', 'updateHTML', 'compress'], function() {
    return;
});
