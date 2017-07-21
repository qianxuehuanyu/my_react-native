/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,Dimensions,TouchableNativeFeedback,ActivityIndicator,ScrollView,FlatList
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import {boxstyles} from "../Sheetstyle/cssMain"
import HomeContentScreen from './HomeContent'
import {Global,datastorage} from '../AgainBody/data'
import HomeHeaderScreen from './HomeHeader'
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View pointerEvents='auto' style={{flex:1}}>
                <HomeContentScreen screenProps={this.props.screenProps}/>
            </View>
        );
    }
};
