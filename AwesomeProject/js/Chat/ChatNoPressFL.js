
import React from 'react';
import {
    Text,View,FlatList,StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class ChatNoPressFl extends React.Component {
    constructor(props){
        super(props);
        this.state={
            theData:this.props.value[0],
            theStyle:this.props.value[1]
        };
    }
    render(){
        return(
            <FlatList
                horizontal={true}
                data={this.state.theData}
                extraData={this.state}
                renderItem={({item}) => {
                return(
                <Text style={this.state.theStyle}>{item}</Text>
                )
                }}
            />
        )
    }

}