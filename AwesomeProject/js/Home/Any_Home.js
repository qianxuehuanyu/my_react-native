/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,Dimensions,TouchableNativeFeedback,DeviceEventEmitter,ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import {boxstyles} from "../Sheetstyle/cssMain"
import HomeContentScreen from './HomeContent'
import {Global,datastorage} from '../AgainBody/data'
import {City,dataCitystorage} from '../AgainBody/dataCity'

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        const {navigate} = this.props.navigation;
        return (
            <HomeBoxScreen screenProps={this.props.screenProps} />
        );
    }
};

class HomeBoxScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        console.log("props");
        super(props);
        this.state = {
            selectbtns: [
                Global.selectbtns[0],Global.selectbtns[1],Global.selectbtns[2],Global.selectbtns[3]
            ],
            data:Global,
            sbKind:[
                ['附近',require('../../image/theclose.png')],
                ['最热',require('../../image/thehot.png')],
                ['最新',require('../../image/thenew.png')],
                ['列表',require('../../image/selectlist.png')],0],
            btnListKind:[{display:'none'},{display:'flex'}],
            dataLocal:Global.local,
            show:'none'
        };
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
                aaa.selectbtns=[
                    t_Global.selectbtns[0],t_Global.selectbtns[1],t_Global.selectbtns[2],t_Global.selectbtns[3]
                ];
                aaa.dataLocal=t_Global.local;
                aaa.data=t_Global;
                return aaa
            })
        });

    }

    onbtnsPress(e,keyValue){
        let _data=this.state.data;
        let _val=_data.selectbtns[keyValue][3];
        if(_val==2){
            _data.selectbtns[keyValue][3]=1;
        }else{
            _data.selectbtns[keyValue][3]=2;
        }
        datastorage.save({
            key:'theGlobal',
            data:_data,expires:null
        });
        this.setState((prevState, props) => {
            let aaa=prevState;
            aaa.selectbtns=[
                _data.selectbtns[0],_data.selectbtns[1],_data.selectbtns[2],_data.selectbtns[3]
            ];
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
    render(){
        let ddd=this.state.dataLocal;let Lddd;
        const navigateAction1 = NavigationActions.navigate({routeName: 'pHomeLocal',params:{city:City.theCity,local:ddd}});
        if(ddd.length>13){
            Lddd=ddd.slice(0,8);
        }else{
            Lddd=ddd;
        }
        return(
            <View style={{flex:1}}>
                <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.8)',justifyContent:'center', alignItems: 'center',display:this.state.show,zIndex:11111}}>
                    <ActivityIndicator size='large'/>
                </View>
                <View style={{height:height,position:'relative',justifyContent:'center'}}>
                    <Image style={styles.headerimg} source={require('../../image/shouye_header.png')}/>
                    <View style={styles.headertop}>
                        <TouchableNativeFeedback onPress={(event)=>{
                this.props.screenProps.dispatch(navigateAction1);}}>
                            <View style={styles.headerLocal}>
                                <Image source={require('../../image/local.png')} style={styles.headericonLocal}/>
                                <Text style={styles.headerLT}>{Lddd}...</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this._goToAuth.bind(this)}
                        >
                            <View style={[styles.headerLocalRight,{right:35}]}>
                                <Image source={require('../../image/select.png')} style={styles.headericon}/>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{
                        this.props.screenProps.dispatch(navigateAction3);
                        }}>
                            <View style={styles.headerLocalRight}>
                                <Image source={require('../../image/auth.png')} style={styles.headericon}/>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.headerbtnlist}>
                        <View style={styles.headerbtns}>
                        <TouchableNativeFeedback
                            delayPressIn={500}
                            onPress={this.onbtnList.bind(this)}
                        >
                            <Image style={styles.btnlistimg} source={this.state.sbKind[this.state.sbKind[4]][1]}/>

                        </TouchableNativeFeedback>
                            <Text style={[styles.btnlisttext,{color:'#179EDD',top:4}]}>︾</Text>
                        </View>
                        <View style={[this.state.btnListKind[0],styles.btnlistkind]}>
                            <TouchableNativeFeedback
                                onPress={this.onbtnList.bind(this)}
                                onPress={this.change_sbKind.bind(this)}
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

                        <TouchableNativeFeedback
                            onPress={this.onbtnsPress.bind(this)}
                            onPress={e=>this.onbtnsPress(e,0)}
                        >
                            <View style={styles.headerbtns}>

                                <Image source={this.state.selectbtns[0][this.state.selectbtns[0][3]]} style={styles.btnlistimg}/>
                                <Text style={styles.btnlisttext}>{this.state.selectbtns[0][0]}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.onbtnsPress.bind(this)}
                                                 onPress={e=>this.onbtnsPress(e,1)}>
                            <View style={styles.headerbtns}>
                                <Image source={this.state.selectbtns[1][this.state.selectbtns[1][3]]} style={styles.btnlistimg}/>
                                <Text style={styles.btnlisttext}>{this.state.selectbtns[1][0]}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.onbtnsPress.bind(this)}
                                                 onPress={e=>this.onbtnsPress(e,2)}>
                            <View style={styles.headerbtns}>
                                <Image source={this.state.selectbtns[2][this.state.selectbtns[2][3]]} style={styles.btnlistimg}/>
                                <Text style={styles.btnlisttext}>{this.state.selectbtns[2][0]}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback  onPress={this.onbtnsPress.bind(this)}
                                                  onPress={e=>this.onbtnsPress(e,3)}>
                            <View style={styles.headerbtns}>
                                <Image source={this.state.selectbtns[3][this.state.selectbtns[3][3]]} style={styles.btnlistimg}/>
                                <Text style={styles.btnlisttext}>{this.state.selectbtns[3][0]}</Text>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback onPress={()=>{
                this.props.screenProps.dispatch(navigateAction4);}}>
                            <View style={styles.headerbtns}>
                                <View>
                                    <Image style={[styles.btnlistimg]} source={require('../../image/addkind.png')}/>
                                    <Text style={[styles.btnlisttext]}>添加</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </View>
                <View style={{flex:1}}>
                    <HomeContentScreen screenProps={this.props.screenProps}/>
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
        width:50,height:50,alignSelf:'center',borderRadius:25
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
        top:5.5,zIndex:1000
    },
});