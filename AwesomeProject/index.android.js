/**
 * Created by admin on 2017/5/8.
 */
import React from 'react';
import {
    AppRegistry
} from 'react-native';
import {Global,datastorage} from './js/AgainBody/data'
import {City,dataCitystorage} from './js/AgainBody/dataCity'
import {SelectionOld,dataSelectstorage} from './js/AgainBody/dataSelect'
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import MoreStack from './js/Home/More_Button'
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
import DesignerScreen from './js/Designer/designer'

class AwesomeProject extends React.Component{
    render(){
        return(
            <App/>
        )
    }
}

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
    pDesigner:{screen:DesignerScreen},
    pHomeKind:{screen:HomeKindScreen}
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
