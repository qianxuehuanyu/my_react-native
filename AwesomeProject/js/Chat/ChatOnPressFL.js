import React from 'react';
import {
    Text,View,StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class ChatOnPressFl extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:this.props.value,
        }
    }
    render(){
        let _data=this.props.value;
        _data=_data.join(" ");
        return(
            <View>
                <Text style={{color:'#3E9CED',fontSize:14,numberOfLines:2}}>
                    <Text style={{marginRight:4}}>♡</Text>
                    <Text>{_data}</Text>
                </Text>
            </View>
        )
    }
}
