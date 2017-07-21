/**
 * Created by admin on 2017/5/12.
 */

import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,ScrollView,FlatList,ToastAndroid
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {Global,datastorage} from '../AgainBody/data'
let selectBtns=[ ['品牌设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png')],
    ['网页设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png')],
    ['多媒体',require('../../image/KB_video1.png'),require('../../image/KB_video2.png')],
    ['程序设计',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png')],
    ['互联网设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png')],
    ['产品设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png')],
    ['空间设计',require('../../image/KB_video1.png'),require('../../image/KB_video2.png')],
    ['虚拟现实',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png')]];

export default class HomeKind extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `内容定制`,
            headerRight:(<TouchableNativeFeedback
                onPress={()=>{
                setTimeout(function() {
                  navigation.dispatch(navigateActionSubmit)
                },1000);
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>完成</Text>
            </TouchableNativeFeedback>)
        }
    };
    constructor(props) {
        super(props);
        var _data=Global.selectbtns;
        this.state = {
            data:Global,
            selectbtns:_data,
        };
    }
    componentDidMount() {
        datastorage.load({
            key: 'theGlobal',
            autoSync: true,
            syncInBackground: true,
        }).then(ret=>{
            let t_Global=ret;
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.data=t_Global;
                aaa.selectbtns=t_Global.selectbtns;
                return aaa
            })
        });
    }
    onbtnsPress(e,keyValue){
        let _selectbtns=this.state.selectbtns;
        let _data=this.state.data;
        _selectbtns=_selectbtns.filter(x=>x[0]!=keyValue);
        _data.selectbtns=_selectbtns;
        datastorage.save({
            key:'theGlobal',
            data:_data,expires:null
        });
        this.setState((prevState, props) => {
            let aaa=prevState;
            aaa.selectbtns=_selectbtns;
            aaa.data=_data;
            return aaa;
        });
    };
    _renderRowDelete(item){
        return(
            <TouchableNativeFeedback onPress={e=>{this.onbtnsPress(e,item[0]);}}>
                <View style={styles.headerbtns}>
                    <Image source={item.item[2]} style={styles.btnlistimg}/>
                    <Text style={styles.btnlisttext}>{item.item[0]}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
    _renderRowAdd(keyValue){
        let _a=this.state.data;
        let _selectbtns=this.state.selectbtns;
        if(_selectbtns.includes(keyValue)){
            ToastAndroid.showWithGravity('本项已添加',ToastAndroid.SHORT, ToastAndroid.CENTER)
        }else{
            _selectbtns.push(keyValue);
            ToastAndroid.showWithGravity('添加成功！',ToastAndroid.SHORT, ToastAndroid.CENTER);
            _a.selectbtns=_selectbtns;
            datastorage.save({
                key:'theGlobal',
                data:_a,expires:null
            });
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.selectbtns=_selectbtns;
                aaa.data=_a;
            });
        }
    }
    render(){
        let _text='本项主要涉及。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。';

        if(_text.length>30){
            let _text1=_text.split('',30);
            _text=[_text1.join(''),'flex'];
        }else{
            let _text2=_text.split('');
            _text=[_text2.join(''),'none'];
        }
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
                        overScrollMode='never'
            >
                <View>
                    <Text>类别：</Text>
                    <View style={{paddingLeft:10,paddingRight:10,marginTop:5}}>
                        <FlatList
                            horizontal={false}
                            numColumns={4}
                            data={this.state.selectbtns}
                            extraData={this.state}
                            renderItem={item=>this._renderRowDelete(item)}
                        />
                    </View>
                </View>
                <Text>介绍：</Text>
                <View style={{padding:10}}>
                    <FlatList
                        data={selectBtns}
                        renderItem={(item)=>{
                        return(
                        <View style={{height:80,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <Image source={item.item[1]} style={{height:50,width:50}} />
                        <View style={{flex:1}}>
                         <Text style={{color:'#3e9dee',fontSize:18,fontWeight:'bold',marginBottom:4}}>{item.item[0]}</Text>
                         <View style={{flexDirection:'row'}}>
                         <Text style={{lineHeight:12,numberOfLines:2}}>{_text[0]}</Text>
                         <TouchableNativeFeedback>
                            <Text style={{color:'#3e9dee',display:_text[1]}}> >>详细 </Text>
                         </TouchableNativeFeedback>
                         </View>
                         </View>
                        <View>
                            <TouchableNativeFeedback onPress={e=>{this._renderRowAdd(item.item)}}>
                                <Image source={require('../../image/more.png')} style={{height:50,width:50}} />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                        )
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}
const navigateActionSubmit = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Box'})
    ]});

const styles=StyleSheet.create({
    headerbtns:{
        justifyContent: 'center',width:80,height:80
    },
    btnlistimg:{
        width:50,height:50,alignSelf:'center'
    },
    btnlisttext:{
        color:'#777',alignSelf:'center'
    },
    btnlistkind:{
        position:'absolute',backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:50,paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,
        top:5.5,zIndex:1000
    },
});