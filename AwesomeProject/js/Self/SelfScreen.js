/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    View,StyleSheet,Text,Dimensions,
    Modal,Image,TouchableNativeFeedback
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'

export default class SelfScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    _gotoImageBox(_index){
        const images = [{
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
        }, {
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
        }, {
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
        }];
        const navigateAction1 = NavigationActions.navigate({routeName: 'ImageBox',params:{imagesPath:images,imagesIndex:_index}});
        this.props.screenProps.dispatch(navigateAction1);
        //this.props.screenProps.dispatch(navigateAction2);
    }
    render() {
        return (
            <View style={{flex:1,padding:10}}>
                <View>
                    <Text>个人中心·header</Text>
                </View>
                <View>
                    <Text>list</Text>
                    <Text>list</Text>
                </View>
                <TouchableNativeFeedback onPress={e=>{
                this._gotoImageBox(1);
                }}>
                    <Image style={{width:Dimensions.get('window').width-20,flex:1}}
                           source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}}/>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
const navigateAction2 = NavigationActions.navigate({routeName: 'testPage'});





