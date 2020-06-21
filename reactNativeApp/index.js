/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import Routes from './src/Routes';
import { name as appName } from './app.json';
console.disableYellowBox = true;  //Code to Disabling Yellow Warning globally in complete app
AppRegistry.registerComponent(appName, () => Routes);
