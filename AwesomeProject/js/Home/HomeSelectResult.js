
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,Dimensions,TouchableNativeFeedback,ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import HomeContentScreen from './HomeContent'
import Global from '../AgainBody/data'


export default class HomeSelect extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render(){
        return(
            <View>
                <TouchableNativeFeedback onPress={()=>{
                this.props.navigation.dispatch(navigateAction1);
                }}>
                    <Text>{Global.selectKeyword}</Text>
                </TouchableNativeFeedback>

                <HomeContentScreen />
            </View>
        )
    }
}
const navigateAction1 = NavigationActions.navigate({routeName:'pHomeSelect',params:{changeVal:Global.selectKeyword}});
