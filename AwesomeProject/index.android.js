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
import MoreStack from './js/Home/More_Button'
import FindScreen from './js/Find/FindScreen'
import ShowScreen from './js/Show/ShowScreen'
import CloudScreen from './js/Cloud/CloudScreen'
import Main from './js/AgainBody/main'
import ImageBox from './js/AgainBody/ImageBox'

import HomeLocalScreen from './js/Home/HomeLocal'
import HomeSelectScreen from './js/Home/HomeSelect'
import HomeSelectResultScreen from './js/Home/HomeSelectResult'
import HomeAuthScreen from './js/Home/HomeAuth'
import HomeAuthSkillScreen from './js/Home/HomeAuthSkill'
import HomeAuthWaitScreen from './js/Home/HomeAuthWait'
import HomeKindScreen from './js/Home/HomeKind'
import HomeCityScreen from './js/Home/HomeCity'
import DesignerScreen from './js/Designer/designer'
import WorksScreen from './js/Works/Works'
import ShowWriteScreen from './js/Show/ShowWrite'
import Activity from './js/AgainBody/Activity'
import AdvertisementScreen from './js/AgainBody/Advertisement'
import WorkScreen from './js/Works/Works'
import OtherScreen from './js/Self/Other'
import TheChatProject from './js/Chat/ChatProject'
import TheTipProject from './js/Chat/ChatTip'
import TheWorksScreen from './js/Chat/ChatWorks'
import TheAdvertisementScreen from './js/Chat/ChatAdvertisement'
import ChatProjectPage from './js/Chat/ChatProjectPage'
import ChatTipPage from './js/Chat/ChatTipPage'
import Screen11 from './js/Home/11'
class AwesomeProject extends React.Component{
    render(){
        return(
            <App />
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
    ImageBox:{screen:ImageBox},

    Works:{screen:WorkScreen},
    Other:{screen:OtherScreen},
    Activity:{screen:Activity},
    Advertisement:{screen:AdvertisementScreen},

    pHomeLocal:{screen:HomeLocalScreen},
    pHomeCitySelect:{screen:HomeCityScreen},
    pHomeSelect:{screen:HomeSelectScreen},
    pHomeSelectResult:{screen:HomeSelectResultScreen},
    pHomeAuth:{screen:HomeAuthScreen},
    pHomeAuthSkill:{screen:HomeAuthSkillScreen},
    pHomeAuthWait:{screen:HomeAuthWaitScreen},
    pHomeKind:{screen:HomeKindScreen},
    cChatProject:{screen:TheChatProject},
    cChatTip:{screen:TheTipProject},
    cChatWorks:{screen:TheWorksScreen},
    cChatAdvertisement:{screen:TheAdvertisementScreen},
    cChatTipPage:{screen:ChatTipPage},
    cChatProjectPage:{screen:ChatProjectPage},
    testPage:{screen:Screen11}

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
