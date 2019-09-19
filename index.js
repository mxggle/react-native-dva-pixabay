import {AppRegistry} from 'react-native';
import App from './app/root';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');