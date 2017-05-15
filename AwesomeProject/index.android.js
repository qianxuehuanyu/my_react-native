/**
 * Created by admin on 2017/5/8.
 */
import React from 'react';
import {
    AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {MoreStack} from './js/Home/More_Button'
import FindScreen from './js/Find/FindScreen'
import ShowScreen from './js/Show/ShowScreen'
import CloudScreen from './js/Cloud/CloudScreen'
import Main from './js/AgainBody/main'
const App=StackNavigator({
    Box:{screen:Main},
    Find:{screen:FindScreen},
    Show:{screen:ShowScreen},
    Cloud:{screen:CloudScreen},
});

export {MoreStack}


AppRegistry.registerComponent('AwesomeProject', () => App);
