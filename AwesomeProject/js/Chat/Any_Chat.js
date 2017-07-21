/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,View,ListView,TouchableNativeFeedback,ScrollView,StyleSheet,Image,ToastAndroid,Dimensions
} from 'react-native';
import {boxstyles} from "../Sheetstyle/cssMain"
import {Global,datastorage} from '../AgainBody/data'
import {Chat,dataChatstorage} from '../AgainBody/dataChat'
import { NavigationActions } from 'react-navigation'
import ViewPager  from 'react-native-viewpager'
var wwidth=Dimensions.get('window').width;
import {PullList} from 'react-native-pull';
let long=100;
import ChatContentScreen from './ChatContent'

export default class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(Global.AnyChat_images),
            data:Global
        }
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
                aaa.data=t_Global;
                aaa.dataSource=dataSource.cloneWithPages(t_Global.AnyChat_images);
                return aaa
            })
        });
    }
    _renderPage(data){
        let _imagepath=data.imagepath;
        if(_imagepath.indexOf('http')>-1){
            _imagepath={uri:_imagepath};
        }else{
            _imagepath=require(_imagepath);
        }
        return(
            <TouchableNativeFeedback onPress={
        ()=>{
        const navigateAction1 = NavigationActions.navigate({routeName: 'Activity',params:{uri:data.href}});
        this.props.screenProps.dispatch(navigateAction1);
        }
        }>
                <Image source={_imagepath} style={{width:wwidth,height:80}}/>
            </TouchableNativeFeedback>
        )
    }
    render() {
        let _islogin=this.state.data.islogin;
        let _username=undefined;

        if(_islogin){
            _username=this.state.data.username;
        }
        return (
                <View style={{flex:1}}>
                    <View style={{height:30,borderBottomWidth:1,borderBottomColor:'#aaa',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold',color:'#111'}}>画客圈</Text>
                    </View>
                    <View>
                    <ViewPager
                        style={{height:100}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage.bind(this)}
                        isLoop={true}
                        autoPlay={true}
                    />
                    </View>
                    <View style={{height:80,flexDirection:'row'}}>
                        <TouchableNativeFeedback onPress={()=>{
      this.props.screenProps.dispatch(navigateAction1);
                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_project.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[0]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>项目</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{
        this.props.screenProps.dispatch(navigateAction2);
                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_tip.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[1]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>帖子</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{
 this.props.screenProps.dispatch(navigateAction3);
                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_works.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[2]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>作品</Text>

                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{
 this.props.screenProps.dispatch(navigateAction4);
                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_activity.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[3]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>活动</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <ChatContentScreen screenProps={this.props.screenProps} userlogin={_username} />
            </View>
        );
    }
}
let navigateAction1 = NavigationActions.navigate({routeName:'cChatProject'});
let navigateAction2 = NavigationActions.navigate({routeName:'cChatTip'});
let navigateAction3 = NavigationActions.navigate({routeName:'cChatWorks'});
let navigateAction4 = NavigationActions.navigate({routeName:'cChatAdvertisement'});

const styles=StyleSheet.create({
    topimage:{
        width:50,height:50,position:'relative'
    },
    toptext:{
        backgroundColor:'red',
        fontSize:12,paddingLeft:4,paddingRight:4,
        borderRadius:10,position:'absolute',top:-1,right:-12,color:'#fff'
    },
    imagebox:{width:wwidth,paddingLeft:10,paddingRight:10,maxHeight:100},
    oneimage:{},
    twoimage:{},
    tfimage:{},
    fsimage:{},
    setimage:{},
    like_Talk:{
        flexDirection:'row'
    },
    talkBoxStyle:{
        flexDirection:'row',justifyContent:'center'
    }

});