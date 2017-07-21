import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,
    ActivityIndicator,TouchableNativeFeedback,
    ListView,
} from 'react-native';
import {PullList} from 'react-native-pull';
let long=30;
import { NavigationActions } from 'react-navigation'

export default class ChatTipPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render(){
        return(
            <View>
                <Text>12321</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    work_pathimg:{
        flex:1,
        borderWidth:1,marginRight:10,
        borderColor:'#eee',
    }
});
