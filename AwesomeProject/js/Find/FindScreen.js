/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class FindScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>发需求·header</Text>
                </View>

                <View style={{flex:1}}>
                    <Text>请填写你的需求</Text>
                </View>
            </View>
        );
    }
}