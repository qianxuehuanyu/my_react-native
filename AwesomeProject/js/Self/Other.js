/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {boxstyles} from "../Sheetstyle/cssMain"

export default class OtherScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>他人主页展示·header</Text>
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