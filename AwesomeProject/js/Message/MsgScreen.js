/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {boxstyles} from "../Sheetstyle/cssMain"

export default class MsgScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>联系人·header</Text>
                </View>

                <View style={{flex:1}}>
                    <Text>联系人列表list1+消息列表list2</Text>
                </View>
            </View>
        );
    }
}