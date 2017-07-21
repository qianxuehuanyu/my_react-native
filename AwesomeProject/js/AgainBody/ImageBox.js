import React from 'react';
import {
    View,StyleSheet,Dimensions,
    Modal,Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {boxstyles} from "../Sheetstyle/cssMain"
import ImageZoom from 'react-native-image-pan-zoom';

export default class ImageZoomScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:''
    });
    render(){
        return (
            <View>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       onCancle={()=>{this.props.navigation.back()}}
                       imageWidth={undefined}
                       imageHeight={undefined}>
                <Image style={{width:Dimensions.get('window').width, height:undefined}}
                       source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}}/>
            </ImageZoom>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       onCancle={()=>{this.props.navigation.back()}}
                       imageWidth={undefined}
                       imageHeight={undefined}>
                <Image style={{width:Dimensions.get('window').width, height:undefined}}
                       source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}}/>
            </ImageZoom>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       onCancle={()=>{this.props.navigation.back()}}
                       imageWidth={200}
                       imageHeight={200}>
                <Image style={{width:Dimensions.get('window').width, height:undefined}}
                       source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}}/>
            </ImageZoom>
            </View>
        )
    }
}
