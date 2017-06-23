/**
 * Created by admin on 2017/5/9.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class MoreScreen extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        header:null,
        tabBarLabel:null
    });
    render(){
        return(
            <View>
                <Text>123</Text>
            </View>
        )

    }
}

export default MoreScreen




