/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp();

app.import({development: 'bower_components/firebase/firebase-debug.js', production: 'bower_components/firebase/firebase.js'});
app.import({development: 'bower_components/emberfire/dist/emberfire.js', production: 'bower_components/emberfire/dist/emberfire.min.js'});
app.import({development: 'bower_components/firebase-simple-login/firebase-simple-login.js', production: 'bower_components/firebase-simple-login/firebase-simple-login.js'});
app.import({development: 'bower_components/md5-jkmyers/md5.js', production: 'bower_components/md5-jkmyers/md5.min.js'});
app.import({development: 'bower_components/geofire/dist/geofire.js', production: 'bower_components/geofire/dist/geofire.min.js'});
app.import({development: 'bower_components/rsvp/rsvp.js', production: 'bower_components/rsvp/rsvp.min.js'});
app.import({development: 'bower_components/Autolinker.js/dist/Autolinker.js', production: 'bower_components/Autolinker.js/dist/Autolinker.min.js'});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

var fonts = pickFiles('bower_components/ratchet/fonts', {
  srcDir: '/',
  files: ['ratchicons.eot', 'ratchicons.svg', 'ratchicons.ttf', 'ratchicons.woff'],
  destDir: '/fonts'
});

module.exports = mergeTrees([app.toTree(), fonts]);
