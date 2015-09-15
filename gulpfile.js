var gulp    = require('gulp'),
    glob    = require('glob'),
    fs      = require('fs'),
    _       = require('lodash'),
    replace = require('gulp-batch-replace');

// helper function for getting the contents of a file
var getFileContent = function(filepath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filepath, 'utf-8', function(err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};

// finds all the images not refrenced in a source file and removes them from the project
gulp.task('removeUnusedImages', function() {

    // path that we will be working in (NOTE: this can be abstracted later on)
    var path = './public/test-banner/';

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

    return getFileContent(path + 'scripts.js')
        .then(getUnusedImages)
        .then(removeFiles);

});

// add the necessary stuff to the html (if it isn't already) to comply with double click
gulp.task('updateHTML', function() {

    // common information: NOTE: this should be abstracted later on
    var path = './public/test-banner/';
    var width = 300;
    var height = 600;
    var name = 'test';

    // enabler, meta tag, opening click tag, closing click tag
    var updateOptions = [
        [/\<\/title\>/g, '$&\n\t<script src="http://s0.2mdn.net/ads/studio/Enabler.js"></script>'],
        [/\<\/head\>/g, '\t<meta name="ad.size" content="width=' + width + ',height=' + height + '">\n$&'],
        [/\<body\>/g, '$&\n\t<a href="javascript:Enabler.exit(\'' + name + '_exit\');">'],
        [/\<\/body\>/g, '\t</a>\n$&']
    ];

    // remove the updates that are already in place
    var getUpdates = function(html) {
        return new Promise(function(resolve, reject) {
            var updates = _.filter(updateOptions, function(update) {
                var newCode = update[1].replace('$&', '');
                return html.indexOf(newCode) == -1;
            });
            resolve(updates);
        });
    };

    // run the above then overwrite the html with the new stuff
    getFileContent(path + 'index.html')
        .then(getUpdates)
        .then(function(updates) {
            gulp.src(path + 'index.html')
                .pipe(replace(updates))
                .pipe(gulp.dest(path));
        });

});

gulp.task('default', ['removeUnusedImages', 'updateHTML'], function(a) {
    return;
});
