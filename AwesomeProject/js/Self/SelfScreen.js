/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {boxstyles} from "../Sheetstyle/cssMain"

export default class SelfScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>个人中心·header</Text>
                </View>

                <View style={{flex:1}}>
                    <Text>list</Text>
                    <Text>list</Text>
                    <Text>list</Text>
                    <Text>list</Text>
                    <Text>list</Text>
                    <Text>list</Text>
                </View>
            </View>
        );
    }
}