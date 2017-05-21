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
import HomeLocalScreen from './js/Home/HomeLocal'
import HomeSelectScreen from './js/Home/HomeSelect'
import HomeSelectResultScreen from './js/Home/HomeSelectResult'
import HomeAuthScreen from './js/Home/HomeAuth'
import HomeKindScreen from './js/Home/HomeKind'
import HomeCityScreen from './js/Home/HomeCity'

const App=StackNavigator({
    Box:{screen:Main},
    Find:{screen:FindScreen},
    Show:{screen:ShowScreen},
    Cloud:{screen:CloudScreen},
    pHomeLocal:{screen:HomeLocalScreen},
    pHomeCitySelect:{screen:HomeCityScreen},
    pHomeSelect:{screen:HomeSelectScreen},
    pHomeSelectResult:{screen:HomeSelectResultScreen},
    pHomeAuth:{screen:HomeAuthScreen},
    pHomeKind:{screen:HomeKindScreen}
});

export {MoreStack}


AppRegistry.registerComponent('AwesomeProject', () => App);
