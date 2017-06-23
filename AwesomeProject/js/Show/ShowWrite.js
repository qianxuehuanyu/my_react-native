/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    Text,View,TextInput,ListView,TouchableNativeFeedback
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {upload,dataUpload} from '../AgainBody/dataShow'
import {Global,datastorage} from '../../js/AgainBody/data'

export default class ShowWriteScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: `作品`,
            headerRight:(<TouchableNativeFeedback
                onPress={()=>{
                this.setState({submit:'flex'});
                setTimeout(function() {
                   navigation.dispatch(navigateAction1);
                },1000);
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>上传</Text>
            </TouchableNativeFeedback>)
        }
    };
    componentDidMount () {
        this.setState({submit:"none"});
    }
    render(){
        const {state} = this.props.navigation;
        let nameValue=state.param.workId;
        if(nameValue!=null){

        }

        return(
            <View style={{flex:1,position:'relative'}}>
                <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.8)',display:this.state.submit}}>
                    <Text>wait!!!!!</Text>
                </View>
                <Text>作品描述</Text>
                <TextInput placeholder="作品名称"
                           style={{flex:1,fontSize:16,padding:0}}
                           underlineColorAndroid="transparent"
                           defaultValue={nameValue}
                           autoCorrect={false}
                           selectTextOnFocus={true}
                           onChangeText={(text) =>{
                        dataUpload.save({
                        key:'theGlobal',
                        data:Global
                        })}}
                />
                <TextInput placeholder="作品简介"
                           style={{flex:1,fontSize:16,padding:0}}
                           underlineColorAndroid="transparent"
                           defaultValue={nameValue}
                           autoCorrect={false}
                           selectTextOnFocus={true}
                           onChangeText={(text) =>{
                        Global.auth.type=text;
                        dataUpload.save({
                        key:'theGlobal',
                        data:Global
                        })}}
                />
                <Text>图片</Text>
            </View>
        )
    }
}



class ImageList extends React.Component{
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    componentDidMount () {
        var images= upload.images;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource:ds.cloneWithRows(images)});
    }
    _renderRow(rowData){
        return (
            <Image source={require(rowData.path)} style={{height:50,width:35,margin:2}}/>
        )
    }
    render(){
        return(
            <View style={{flex:1,justifyContent:'row'}}>
                <ListView
                    dataSource={this.state.dataSource}
                    style={{flex:1}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{flexDirection:'row',}}
                    renderRow={this._renderRow.bind(this)}
                />
                <TouchableNativeFeedback>
                    <Image source={require('../../image/more.png')} style={{height:50,width:35,margin:2}} />
                </TouchableNativeFeedback>
            </View>
        )
    }
}


























const navigateAction1 = NavigationActions.reset({routeName:'pHomeAuth'});
