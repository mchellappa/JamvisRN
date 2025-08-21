import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native-web';
import App from './App';
import { name as appName } from './app.json';

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Get the app component and render it
const { element, getStyleElement } = AppRegistry.getApplication(appName);
const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(element);
