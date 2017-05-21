/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,Dimensions,TouchableNativeFeedback,DeviceEventEmitter
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import {boxstyles} from "../Sheetstyle/cssMain"
import PubSub from 'pubsub-js'
import HomeContentScreen from './HomeContent'
import Global from '../AgainBody/data'
import City from '../AgainBody/citydata'


export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    componentDidMount () {
    }
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
        super(props);
        this.state = {
            selectbtns: [
            ['品牌设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png'),2],
            ['网页设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png'),2],
            ['多媒体',require('../../image/KB_video1.png'),require('../../image/KB_video2.png'),2],
            ['程序设计',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png'),2]],
            sbKind:[
            ['附近',require('../../image/theclose.png')],
            ['最热',require('../../image/thehot.png')],
            ['最新',require('../../image/thenew.png')],
            ['列表',require('../../image/selectlist.png')],0],
            btnListKind:[{display:'none'},{display:'flex'}],
            dataLocal:''
        };
    }
    componentDidMount () {
        this.select = PubSub.subscribe('selectkind', function (topic, product) {
            this.setState((prevState, props) => {
                let aaa=prevState;
                if(product.length==4){
                    aaa.selectbtns[0]=btnlist[product[0]];
                    aaa.selectbtns[1]=btnlist[product[1]];
                    aaa.selectbtns[2]=btnlist[product[2]];
                    aaa.selectbtns[3]=btnlist[product[3]];
                }
                return aaa;
            });
        }.bind(this));
        setInterval(()=>{
            let aaa=this.state.dataLocal;
            if(aaa!=Global.local){
                this.setState({dataLocal:Global.local});
            }
        },500);
    };
    componentWillUnmount () {
        PubSub.unsubscribe(this.select);
    };
    onbtnsPress(keyValue){
        this.setState((prevState, props) => {
            let aaa=prevState;
            let _val=aaa.selectbtns[keyValue][3];
            if(_val==2){
                aaa.selectbtns[keyValue][3]=1;
            }else{
                aaa.selectbtns[keyValue][3]=2;
            }
            return aaa;
        });
    };
    onbtnList(){
        this.setState((prevState, props) => {
            let aaa=prevState;
            let _val=aaa.btnListKind[0];
            aaa.btnListKind[0]=aaa.btnListKind[1];
            aaa.btnListKind[1]=_val;
            return aaa;
        });
    };
    change_sbKind(val){
        this.setState((prevState, props) => {
            let aaa=prevState;
            aaa.sbKind[4]=val;
            return aaa;
        });
    };
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
                <View style={{height:height,position:'relative',justifyContent:'center'}}>
                    <Image style={styles.headerimg} source={require('../../image/shouye_header.png')}/>
                    <View style={styles.headertop}>
                        <TouchableNativeFeedback onPress={()=>{
                this.props.screenProps.dispatch(navigateAction1);}}>
                            <View style={styles.headerLocal}>
                                <Image source={require('../../image/local.png')} style={styles.headericonLocal}/>
                                <Text style={styles.headerLT}>{Lddd}...</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{
                this.props.screenProps.dispatch(navigateAction2);}}>
                            <View style={[styles.headerLocalRight,{right:35}]}>
                                <Image source={require('../../image/select.png')} style={styles.headericon}/>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{
                this.props.screenProps.dispatch(navigateAction3);}}>
                            <View style={styles.headerLocalRight}>
                                <Image source={require('../../image/auth.png')} style={styles.headericon}/>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.headerbtnlist}>
                        <TouchableNativeFeedback  onPress={()=>{this.onbtnList();}}>
                        <View style={styles.headerbtns}>
                            <View style={this.state.btnListKind[1]}>
                                <Image style={styles.btnlistimg} source={this.state.sbKind[this.state.sbKind[4]][1]}/>
                                <Text style={[styles.btnlisttext,{color:'#179EDD',top:4}]}>︾</Text>
                            </View>
                        </View>
                        </TouchableNativeFeedback>
                        <View style={[this.state.btnListKind[0],styles.btnlistkind]}>
                            <TouchableNativeFeedback  onPress={()=>{this.onbtnList();this.change_sbKind(0);}}>
                                <Image style={styles.btnlistimg} source={this.state.sbKind[0][1]}/></TouchableNativeFeedback>
                            <TouchableNativeFeedback  onPress={()=>{this.onbtnList();this.change_sbKind(1);}}>
                                <Image style={styles.btnlistimg} source={this.state.sbKind[1][1]}/></TouchableNativeFeedback>
                            <TouchableNativeFeedback  onPress={()=>{this.onbtnList();this.change_sbKind(2);}}>
                                <Image style={styles.btnlistimg} source={this.state.sbKind[2][1]}/></TouchableNativeFeedback>
                            <TouchableNativeFeedback  onPress={()=>{this.onbtnList();this.change_sbKind(3);}}>
                                <Image style={styles.btnlistimg} source={this.state.sbKind[3][1]}/></TouchableNativeFeedback>
                        </View>

                        <TouchableNativeFeedback onPress={()=>{this.onbtnsPress(0);}}>
                        <View style={styles.headerbtns}>
                            <Image source={this.state.selectbtns[0][this.state.selectbtns[0][3]]} style={styles.btnlistimg}/>
                            <Text style={styles.btnlisttext}>{this.state.selectbtns[0][0]}</Text>
                        </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{this.onbtnsPress(1);}}>
                        <View style={styles.headerbtns}>
                            <Image source={this.state.selectbtns[1][this.state.selectbtns[1][3]]} style={styles.btnlistimg}/>
                            <Text style={styles.btnlisttext}>{this.state.selectbtns[1][0]}</Text>
                        </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{this.onbtnsPress(2);}}>
                        <View style={styles.headerbtns}>
                            <Image source={this.state.selectbtns[2][this.state.selectbtns[2][3]]} style={styles.btnlistimg}/>
                            <Text style={styles.btnlisttext}>{this.state.selectbtns[2][0]}</Text>
                        </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback  onPress={()=>{this.onbtnsPress(3);}}>
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

let btnlist=[['品牌设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png')],
    ['网页设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png')],
    ['多媒体',require('../../image/KB_video1.png'),require('../../image/KB_video2.png')],
    ['程序设计',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png')],
    ['艺术设计',require('../../image/KB_art1.png'),require('../../image/KB_art2.png')],
    ['空间设计',require('../../image/KB_space1.png'),require('../../image/KB_space2.png')],
    ['虚拟现实',require('../../image/KB_vr1.png'),require('../../image/KB_vr2.png')],
    ['珠宝设计',require('../../image/KB_jewellery1.png'),require('../../image/KB_jewellery2.png')],
    ['品牌设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png')]];

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
        top:5.5,zIndex:1000
    },
});