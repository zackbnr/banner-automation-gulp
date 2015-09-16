var gulp    = require('gulp'),
    _       = require('lodash'),
    replace = require('gulp-batch-replace');

var getFileContent = require('./getFileContent.js');

module.exports = function(path, width, height, name) {

    // enabler, meta tag, opening click tag, closing click tag, removing http:
    var updateOptions = [
        [/\<\/title\>/g, '$&\n\t<script src="http://s0.2mdn.net/ads/studio/Enabler.js"></script>'],
        [/\<\/head\>/g, '\t<meta name="ad.size" content="width=' + width + ',height=' + height + '">\n$&'],
        [/\<body\>/g, '$&\n\t<a href="javascript:Enabler.exit(\'' + name + '_exit\');">'],
        [/\<\/body\>/g, '\t</a>\n$&'],
        [/"http:\/\/animate/g, '"//animate']
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

};
