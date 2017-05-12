/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,View
} from 'react-native';
import {boxstyles} from "../Sheetstyle/cssMain"

export default class Chatbottom extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text>画客圈·header</Text>
                </View>
                <View style={{flex:1}}>
                    <Text>画客圈</Text>
                </View>
            </View>
        );
    }
}