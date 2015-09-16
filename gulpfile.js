var gulp    = require('gulp');

var getFileContent = require('./gulp-tasks/getFileContent.js');
var imageRemoval = require('./gulp-tasks/imageRemoval.js');
var htmlUpdate = require('./gulp-tasks/htmlUpdate.js');

// finds all the images not refrenced in a source file and removes them from the project
gulp.task('removeUnusedImages', function() {

    imageRemoval('./public/test-banner/');

});

// add the necessary stuff to the html (if it isn't already) to comply with double click
gulp.task('updateHTML', function() {

    htmlUpdate('./public/test-banner/', 300, 600, 'test');

});

gulp.task('default', ['removeUnusedImages', 'updateHTML'], function(a) {
    return;
});
