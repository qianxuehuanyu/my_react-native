import React from 'react';
import {
    Text,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {boxstyles} from "../Sheetstyle/cssMain"

export default class TheProjectScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>header</Text>
                </View>

                <View style={{flex:1}}>
                    <Text>项目</Text>
                </View>
            </View>
        );
    }
}