/**
 * Created by admin on 2017/5/4.
 */
import React, {
    Component,
    PropTypes,
} from 'react';
import {
    Text,View,WebView,ScrollView
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class AdvertisementScreen extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    componentDidMount () {

    }
    render(){
        const {state}=this.props.navigation;
        const {uri}=state.params;
        return(
            <ScrollView
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='never'
            >
            <WebView
            source={{uri:uri}}
            onError={()=>{
            alert("网络信号差，")
            }}
            />
            </ScrollView>
        )
    }
}