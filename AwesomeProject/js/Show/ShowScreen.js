/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ShowScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>首页·header</Text>
                </View>

                <View style={{flex:1}}>
                    <Text>Hello, Chat App!首页</Text>
                </View>
            </View>
        );
    }
}