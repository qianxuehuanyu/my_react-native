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
import {upload,dataUpload} from './js/AgainBody/dataShow'
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
import HomeAuthSkillScreen from './js/Home/HomeAuthSkill'
import HomeAuthWaitScreen from './js/Home/HomeAuthWait'
import HomeKindScreen from './js/Home/HomeKind'
import HomeCityScreen from './js/Home/HomeCity'
import DesignerScreen from './js/Designer/Designer'
import WorksScreen from './js/Works/Works'
import ShowWriteScreen from './js/Show/ShowWrite'
import Activity from './js/AgainBody/Activity'
import AdvertisementScreen from './js/AgainBody/Advertisement'
import WorkScreen from './js/Works/Works'

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
    ShowWrite:{screen:ShowWriteScreen},
    Cloud:{screen:CloudScreen},
    Designer:{screen:DesignerScreen},
    Activity:{screen:Activity},
    Advertisement:{screen:AdvertisementScreen},
    Works:{screen:WorkScreen},
    pHomeLocal:{screen:HomeLocalScreen},
    pHomeCitySelect:{screen:HomeCityScreen},
    pHomeSelect:{screen:HomeSelectScreen},
    pHomeSelectResult:{screen:HomeSelectResultScreen},
    pHomeAuth:{screen:HomeAuthScreen},
    pHomeAuthSkill:{screen:HomeAuthSkillScreen},
    pHomeAuthWait:{screen:HomeAuthWaitScreen},
    pHomeKind:{screen:HomeKindScreen}


});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
