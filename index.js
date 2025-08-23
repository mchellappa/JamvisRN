/**
 * @format
 */

var AppRegistry = require('react-native').AppRegistry;
var App = require('./App.es5');
var appName = require('./app.json').name;

AppRegistry.registerComponent(appName, function() { return App; });
