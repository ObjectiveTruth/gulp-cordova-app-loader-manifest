'use strict';

var Stream = require('stream');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'gulp-cordova-app-loader-manifest';


var calManifest = function calManifest(options) {
    options = options || {};

    options.prefixSplit = options.prefixSplit || '/';

    if (!options.load) {
        options.load = ['**'];
    } else if (!(options.load instanceof Array)) {
        options.load = [options.load];
    }
    
    if (!options.hashAlgo) {
        options.hashAlgo = 'sha256';
    }

    var manifest = {
        files: {},
        load: options.load.slice(),
        root: options.root || './',
        timestamp: new Date().getTime()
    };

    var stream = new Stream.Transform({ objectMode: true });

    // this is for an alternative(to looping) faster way to search for a filename
    var stringOfLoadFileNames = options.load.join(' ');

    stream._transform = function(file, unused, done) {
        if (file.isNull() || !file.stat.isFile()) {
            return done();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return done();
        }

        var hasher = require('crypto').createHash(options.hashAlgo);
        var filename = encodeURI(file.relative.replace(/\\/g, "/")); //for windows, change backslash to forwardslash first only then encode
        var key = filename.replace(/\//g, '_');
        manifest.files[key] = {
            filename: filename,
            version: hasher.update(file.contents).digest('hex')
        };

        done();
    };

    stream._flush = function(done) {
        var file = new gutil.File({
            path: 'manifest.json',
            contents: new Buffer(JSON.stringify(manifest, null, 4))
        });
        stream.push(file);
        return done();
    };


    return stream;
};

module.exports = calManifest;
