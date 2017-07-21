import React from 'react';
import {
    Text,View,FlatView,StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class ChatOnPressFl extends React.Component {
    constructor(props){
        super(props);
        this.state({
            data:this.props.value[0],
            style:this.props.value[1]
        })
    }
    render(){
        return(
            <FlatList
                horizontal={true}
                data={this.state.data}
                extraData={this.state}
                ListHeaderComponent={()=>{
                return(
                <Text style={this.state.style}>♡</Text>
                )
                }}
                renderItem={({item}) => {
                return(
                <Text style={this.state.style}>{item}</Text>
                )
                }}
            />
        )
    }

}