/**
 * @format
 */

var ReactNative = require('react-native');
var App = require('./App');
var appConfig = require('./app.json');

var AppRegistry = ReactNative.AppRegistry;

AppRegistry.registerComponent(appConfig.name, function() { 
  return App; 
});
