gulp-cordova-app-loader-manifest
================================

Gulp plugin to create cordova-app-loader manifests.
This plugin is fork from [antonpenev/gulp-cordova-app-loader-manifest](https://github.com/antonpenev/gulp-cordova-app-loader-manifest), so all kudos go to him.

Added the `options.load` parameter to be directly copied to the final `manifest.json` and preserves order.

This is important when loading in a specific order is important, for example [ionic framework](http://ionicframework.com/)

##Installation

There are 2 ways depending on your needs

1. Clone the repo into your `node_modules` directory

  `cd node_mobules`

  `clone git@github.com:ObjectiveTruth/gulp-cordova-app-loader-manifest.git`

  `cd gulp-cordova-app-loader-manifest`

  `npm install`

2. Mark it as a dependancy to your `package.json` via `npm`

  `npm install --save https://github.com/ObjectiveTruth/gulp-cordova-app-loader-manifest.git`


## Usage

```javascript
var calManifest = require('gulp-cordova-app-loader-manifest');

gulp.task('manifest', function() {

    var options = {};
    
    options.load = [
        "js/app.js",
        "js/controllers.js",
        "js/services.js",
        "js/templates.js"
    ];

    options.hashAlgo = 'sha1';

  return gulp.src('./www/**')
    .pipe(calManifest(options))
    .pipe(gulp.dest('./'));
});
```

## Options

#### load

The values passed will be passed literaly to the final `manifest.json` preserving file ordering when cordova-app-loader loads them to the DOM

```javascript
options.load = [
  'lib/your-app.js',
  'css/your-css.css'
];
```

#### root
```javascript
options.root = './';
```
Specifies the manifest.root option.

#### prefixSplit
```javascript
options.prefixSplit = '/'
```
Specifies prefix to split the _options.load_ filenames (default value is '/').

This means `options.prefixSplit = 'www/` for the `['www/lib/app.js', 'www/css/style.css']` will produce the following output:
```javasript
manifest.load = [
  'lib/app.js',
  'css/style.css'
]
```

#### hashAlgo
```javascript
options.hashAlgo = 'sha1'
```
Specifies the algorithm used for create the version string for the files.

Availble options are algorithms supported by the version of OpenSSL on the platform. Examples are 'sha256', 'sha512', etc. On recent releases of OpenSSL, `openssl list-message-digest-algorithms` will display the available digest algorithms.
