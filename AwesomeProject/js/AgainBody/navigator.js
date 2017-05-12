/**
 * Created by admin on 2017/5/5.
 */

import React from 'react';
import {
    Image,Text,View
} from 'react-native';
import {boxstyles} from "../../js/Sheetstyle/cssMain";
import { TabNavigator } from 'react-navigation';
import HomeScreen from "../../js/Home/Any_Home"
import ChatScreen from "../../js/Chat/Any_Chat"
import MsgScreen from "../../js/Find/FindScreen"
import SelfScreen from "../../js/Self/SelfScreen"
import MoreScreen from "../../js/Home/More_Button"
import { NavigationActions } from 'react-navigation'

const SimpleApp = TabNavigator({
    home: { screen: HomeScreen ,navigationOptions:({navigation}) => ({
        tabBarLabel:'首页',
        tabBarIcon:({tintColor})=>(<Image source={require('../../image/home.png')} style={
            [{tintColor:tintColor},boxstyles.icon]
            } />),
    })},
    chat: { screen: ChatScreen ,navigationOptions:({navigation}) => ({
        tabBarLabel:'画客圈',
        tabBarIcon:({tintColor})=>(<Image source={require('../../image/chat.png')} style={
            [{tintColor:tintColor},boxstyles.icon]
            } />),
    })},
    more:{ screen: MoreScreen ,navigationOptions:({navigation}) => ({
        tabBarLabel:({tintColor})=>(<Text style={
            [{color:tintColor},boxstyles.more]
            } >More</Text>),
        tabBarIcon:({tintColor})=>(<Image source={require('../../image/more.png')} style={
            [boxstyles.more]
            } />),
    })},
    message: { screen: MsgScreen  ,navigationOptions:({navigation}) => ({
        tabBarLabel:'消息',
        tabBarIcon:({tintColor})=>(<Image source={require('../../image/message.png')} style={
            [{tintColor:tintColor},boxstyles.icon]
            } />),
    })},
    self: { screen: SelfScreen  ,navigationOptions:({navigation}) => ({
        tabBarLabel :'我的',
        tabBarIcon:({tintColor})=>(<Image source={require('../../image/self.png')} style={
            [{tintColor:tintColor},boxstyles.icon]
            } />),
    })},
},{
    animationEnabled:false,
    tabBarPosition:'bottom',
    swipeEnabled:false,
    tabBarOptions:{
        activeTintColor:'#409ad6',
        inactiveTintColor:'#b8b8b8',
        showIcon:true,
        indicatorStyle:{
            height:0
        },
        style:{
            backgroundColor:'#eee',
            height:50,
        },
        iconStyle:{
            width:25,height:25,marginBottom:4
        },
        labelStyle:{
            fontSize:10,margin:0,lineHeight:10
        }

    }

});


export {SimpleApp};