import {AppRegistry} from 'react-native';
import App from './app/root';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
if (__DEV__) {
  // eslint-disable-next-line global-require
  require("react-native").YellowBox.ignoreWarnings([
    "Warning: Failed child context type: Invalid child context",
  ]);
}
console.disableYellowBox = true;
// console.warn('YellowBox is disabled.');
