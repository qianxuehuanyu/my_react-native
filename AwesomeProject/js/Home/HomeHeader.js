/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,Dimensions,TouchableNativeFeedback,ActivityIndicator,ScrollView,FlatList
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import {boxstyles} from "../Sheetstyle/cssMain"
import {Global,datastorage} from '../AgainBody/data'

export default class HomeHeaderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectbtns:Global.selectbtns,
            data:Global,
            sbKind:[
                ['附近',require('../../image/theclose.png')],
                ['最热',require('../../image/thehot.png')],
                ['最新',require('../../image/thenew.png')],
                ['列表',require('../../image/selectlist.png')],0],
            btnListKind:[{display:'none'},{display:'flex'}],
            dataLocal:Global.local,
            show:'none',
            selectkeyword:''
        };
        this._renderRow=this._renderRow.bind(this);
    }
    componentDidMount () {
        datastorage.load({
            key: 'theGlobal',
            autoSync: true,
            syncInBackground: true,
        }).then(ret=>{
            let t_Global=ret;
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.selectbtns=t_Global.selectbtns;
                aaa.dataLocal=t_Global.local;
                aaa.data=t_Global;
                aaa.selectkeyword=t_Global.selectkeyword;
                return aaa
            })
        });
    }
    onbtnsPress(e,keyValue){
        let _data=this.state.data;
        _data.selectkeyword=keyValue;
        datastorage.save({
            key:'theGlobal',
            data:_data,expires:null
        });
        this.setState((prevState, props) => {
            let aaa=prevState;
            aaa.selectkeyword=keyValue;
            aaa.data=_data;
            return aaa;
        });
    }
    onbtnList(e){
        this.setState((prevState, props) => {
            let aaa=prevState;
            let _val=aaa.btnListKind[0];
            aaa.btnListKind[0]=aaa.btnListKind[1];
            aaa.btnListKind[1]=_val;
            return aaa;
        });
    }
    change_sbKind(e,val){
        this.setState((prevState, props) => {
            let aaa=prevState;
            aaa.sbKind[4]=val;
            return aaa;
        });
    }
    _goToAuth(e){
        this.setState({show:'flex'});
        let _this=this;
        setTimeout(function() {
            _this.setState({show:'none'});
        },1000);
        setTimeout(function() {
            _this.props.screenProps.dispatch(navigateAction2);
        },510);
    }
    _renderRow(item){
        let imgURL0=item.item[2];
        let _selectkeyword=this.state.selectkeyword;
        if(_selectkeyword!=''&&_selectkeyword==item.item[0]){
            imgURL0=item.item[1];
        }
        return(
            <TouchableNativeFeedback
                onPress={e=>this.onbtnsPress(e,item.item[0])}
            >
                <View style={{marginTop:10,width:70}}>
                    <Image source={imgURL0} style={styles.btnlistimg}/>
                    <Text style={styles.btnlisttext}>{item.item[0]}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
    render(){
        let ddd=this.state.dataLocal;let Lddd;
        const navigateAction1 = NavigationActions.navigate({routeName: 'pHomeLocal'});
        if(ddd.length>13){
            Lddd=ddd.slice(0,8);
        }else{
            Lddd=ddd;
        }
        let addMore=require('../../image/addkind.png');
        let _more=this.state.selectbtns;
        for(var i=3;i<_more.length;i++){
            if(_more[i][3]==1){
                addMore=require('../../image/morekind.png');
            }
        }
        return(
            <View pointerEvents='auto' style={{flex:1}}>
                <View style={{height:height,position:'relative',justifyContent:'center'}}>
                    <Image style={styles.headerimg} source={require('../../image/shouye_header.png')}/>
                    <View style={styles.headertop}>
                        <TouchableNativeFeedback onPress={e=>{
                            this.props.screenProps.dispatch(navigateAction1);}}>
                            <View style={styles.headerLocal}>
                                <Image source={require('../../image/local.png')} style={styles.headericonLocal}/>
                                <Text style={styles.headerLT}>{Lddd}...</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={e=>this._goToAuth(e)}
                        >
                            <View style={[styles.headerLocalRight,{right:35}]}>
                                <Image source={require('../../image/select.png')} style={styles.headericon}/>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={(e)=>{
                        this.props.screenProps.dispatch(navigateAction3);
                        }}>
                            <View style={styles.headerLocalRight}>
                                <Image source={require('../../image/auth.png')} style={styles.headericon}/>
                            </View>
                        </TouchableNativeFeedback>
                    </View>


                    <View style={styles.headerbtnlist}>
                        <View style={{justifyContent:'center',margin:5}}>
                            <TouchableNativeFeedback
                                delayPressIn={500}
                                onPress={this.onbtnList}
                            >
                                <Image style={styles.btnlistimg} source={this.state.sbKind[this.state.sbKind[4]][1]}/>

                            </TouchableNativeFeedback>
                            <Text style={[styles.btnlisttext,{color:'#179EDD',top:4}]}>︾</Text>
                        </View>
                        <View style={[this.state.btnListKind[0],styles.btnlistkind]}>
                            <TouchableNativeFeedback
                                onPress={e=>{this.onbtnList(e);this.change_sbKind(e,0)}}
                            >
                                <Image style={styles.btnlistimg} source={this.state.sbKind[0][1]}/></TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={this.onbtnList.bind(this)}
                                onPress={this.change_sbKind.bind(this)}
                                onPress={e=>{this.onbtnList(e);this.change_sbKind(e,1)}}
                            >
                                <Image style={styles.btnlistimg} source={this.state.sbKind[1][1]}/></TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={this.onbtnList.bind(this)}
                                onPress={this.change_sbKind.bind(this)}
                                onPress={e=>{this.onbtnList(e);this.change_sbKind(e,2)}}
                            >
                                <Image style={styles.btnlistimg} source={this.state.sbKind[2][1]}/></TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={this.onbtnList.bind(this)}
                                onPress={this.change_sbKind.bind(this)}
                                onPress={e=>{this.onbtnList(e);this.change_sbKind(e,3)}}
                            >
                                <Image style={styles.btnlistimg} source={this.state.sbKind[3][1]}/></TouchableNativeFeedback>
                        </View>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            overScrollMode='never'
                            style={{flex:1,}}>
                            <View style={{flexDirection:'row'}}>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.selectbtns}
                                    extraData={this.state}
                                    renderItem={item=>this._renderRow(item)}
                                />
                                <TouchableNativeFeedback onPress={()=>{
                            this.props.screenProps.dispatch(navigateAction4);}}>
                                    <View style={{justifyContent:'center',margin:5}}>
                                        <View>
                                            <Image style={[styles.btnlistimg]} source={addMore}/>
                                            <Text style={[styles.btnlisttext]}>添加</Text>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}
const navigateAction2 = NavigationActions.navigate({routeName: 'pHomeSelect'});
const navigateAction3 = NavigationActions.navigate({routeName: 'pHomeAuth'});
const navigateAction4 = NavigationActions.navigate({routeName: 'pHomeKind'});

let width=Dimensions.get('window').width;
let height=width/639*256;
const styles=StyleSheet.create({
    headerimg:{
        width:width,flex:1
    },
    headertop:{
        position:'absolute',
        height:30,
        top:0,left:0,right:0
    },
    headerLocal:{alignSelf:'center',
        width:170,height:30,
        position:'relative'
    },
    headerLocalRight:{
        alignSelf:'flex-end',width:30,height:30,top:0,position:'absolute'
    },
    headerLI:{
        position:'absolute',lineHeight:30,fontSize:20
    },
    headerLT:{
        position:'absolute',lineHeight:27,marginLeft:18,
        fontSize:18,color:'#ddd',width:140,height:30
    },
    headerbtnlist:{
        position:'absolute',
        height:90,
        top:30,left:0,right:0,
        flexDirection: 'row',justifyContent: 'space-between',
    },
    headerbtns:{
        flex:1,justifyContent: 'center',
    },
    btnlistimg:{
        width:50,height:50,alignSelf:'center'
    },
    btnlisttext:{
        color:'#eee',alignSelf:'center'
    },
    headericonLocal:{
        width:18,height:18,top:6
    },
    headericon:{
        width:26,height:26,top:2
    },
    btnlistkind:{
        position:'absolute',backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:50,paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,
        top:5.5,zIndex:100
    },
});