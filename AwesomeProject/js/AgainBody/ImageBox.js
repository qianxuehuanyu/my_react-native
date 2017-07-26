import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {FirstData,dataCitystorage} from '../AgainBody/dataFirst'

import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImageViewerScreen extends React.Component {
    constructor(props) {
        super(props);
        const {state}=this.props.navigation;
        console.log(state);
        const {params} = state;
        console.log(params,"12333333333333",params.imagesIndex,params.imagesPath);
        this.state = {
            data:params.imagesPath,
            index:params.imagesIndex,
            lenght:params.imagesPath.length
        };
    }
    componentDidMount(){
        dataCitystorage.load({
            key: 'theFirstData',
            autoSync: true,
            syncInBackground: true,
        }).then(ret=>{
            let _showTip=ret.imageBoxShow
        });
    }
    render(){
    return (
        <Modal visible={true} transparent={true}>
            <ImageViewer
                onSave={()=>{}}
                onDoubleClick={e=>{this.props.navigation.dispatch(backAction)}}
                saveToLocalByLongPress={false}
                onSaveToCamera={()=>{}}
                index={this.state.index}
                isShowMenu={false}
                imageUrls={this.state.data}/>
        </Modal>
    )
}
}
const backAction = NavigationActions.back();
