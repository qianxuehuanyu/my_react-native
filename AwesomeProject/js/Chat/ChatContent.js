/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,View,ListView,TouchableNativeFeedback,Dimensions,ScrollView,StyleSheet,WebView,Modal,Image,ActivityIndicator,Alert,TextInput,ToastAndroid
} from 'react-native';
import {boxstyles} from "../Sheetstyle/cssMain"
import {Global,datastorage} from '../AgainBody/data'
import {Chat,dataChatstorage} from '../AgainBody/dataChat'
import { NavigationActions } from 'react-navigation'
import ViewPager  from 'react-native-viewpager'
var wwidth=Dimensions.get('window').width;
import {PullList} from 'react-native-pull';
let Chatlong=50;
import ChatOnPressFL from './ChatOnPressFL'
import ChatNoPressFL from './ChatNoPressFL'

export default class ChatContentScreen extends React.Component{
    constructor(props) {
        super(props);
        this.dataSource = [];
        var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            list: ds.cloneWithRows(this.dataSource),
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timer1 && clearTimeout(this.timer1);
        this.timer2 && clearTimeout(this.timer2);
    }
    onPullRelease(resolve) {
        //do something
        this.timer=setTimeout(() => {
            resolve();
        }, 3000);
    }
    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: -500,opacity:0};
        const show = {position: 'relative', left: 0,opacity:1};
        this.timer1=setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 200);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>...</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>...</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>...</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={{flex:1}}>
                <TouchableNativeFeedback onPress={
                e=>{
                this._scrollView.scrollTo({x:0,y:0,animated:true});
                }
                }>
                    <Image source={require('../../image/backtop.png')} style={{width:30,height:30,position:'absolute',bottom:10,right:10}}/>
                </TouchableNativeFeedback>
                <PullList
                    ref={(scrollView) => { this._scrollView = scrollView; }}
                    style={{}}
                    onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
                    renderHeader={this.renderHeader}
                    dataSource={this.state.list}
                    pageSize={5}
                    initialListSize={1}
                    renderRow={this.renderRow}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={30}
                    renderFooter={this.renderFooter}
                />
            </View>
        );
    }
    renderHeader(){
        return (
            <View style={{height: 50, backgroundColor:'#eeeeee', alignItems: 'center', justifyContent: 'center',display:'none'}}>
                <Text style={{fontWeight: 'bold'}}>最新内容</Text>
            </View>
        );
    }
    renderRow(rowData, sectionID, rowID, highlightRow) {
        let _username=this.props.username;
        let _kind=rowData.kind;
        if(_kind=='project'){
            return (
                <View>
                    <TheProjectScreen screenProps={this.props.screenProps} value={[rowData,_username]} />
                </View>
            )
        }else{
            return(
                <View>
                    <Text>1233123</Text>
                </View>
            )
        }
    }
    renderFooter() {
        if(this.state.nomore){
            return (<TouchableNativeFeedback onPress={()=>{
                    this._scrollView.scrollTo({x:0,y:0,animated:true});
                    }}>
                <View style={{height: 30}}>
                    <Text style={{alignSelf:'center',color:'#ccc'}}>没有更多了</Text></View>
            </TouchableNativeFeedback>);
        }
        return (
            <View style={{height: 30}}>
                <ActivityIndicator />
            </View>
        );
    }
    loadMore() {
        if(Chatlong<1){
            this.setState({nomore:true});
        }else{
            this.dataSource.push({id:'1234123',kind:'project',
                send:{name:'洪辉',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',keyMark:'4.9',keyMark_number:'20',sex:'1',localtion:'杭州',kindword:['产品经理','三汇信息']}
                ,useReady:'<a style={color:#ffe87c}>[预算：1.5万元]</a><a> 找12312312312321321321212121212121212' +
                '1212121212121212121212121212' +'1212121212121212121212121' +
                '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
                images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
                localNumber:'1000m',watchNumber:'100',
                time:'2017/06/22 15:55:14',
                likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
                talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
                    {sender:'dafsd',to:'洪辉',text:'sdfasdfasdfasdfasd'},
                    {sender:'dafsd',to:'dfas大',text:'sdfasdfasdfasdfasd'}]
            });
            Chatlong--;
            this.timer2=setTimeout(() => {
                var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    list: ds.cloneWithRows(this.dataSource)
                });
            }, 1000);
        }
    }
}
//this.dataSource.push({id:'1223123',kind:'tip',
//    send:{name:'Mia Zhang',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460'}
//    ,useReady:'12312!!!!!!<a> 找12312312312321321321212121212121212' +
//    '1212121212121212121212121212' +'1212121212121212121212121' +
//    '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
//    images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
//    time:'2017/06/22 15:55:14',
//    likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
//    talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
//        {sender:'dafsd',to:'洪辉',text:'sdfasdfasdfasdfasd'},
//        {sender:'dafsd',to:'dfas大',text:'sdfasdfasdfasdfasd'}]
//});
//this.dataSource.push({id:'1231123',kind:'work',
//    send:{name:'Mia Zhang',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460'}
//    ,work:{title:'dfasdfasdfasdfs',
//        images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
//        time:'2017/06/22 15:55:14',saveNum:123},
//    likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
//});
//this.dataSource.push({id:'1231123',kind:'activity',
//    send:{from:'杭州画客科技有限公司',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460'}
//    ,time:'2017/06/22 15:55:14',activityTime:['6.19','7.28'],
//    contentText:'dfasdfasdfasd',
//    contentImage:'http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg',
//    contentUrl:'http://www.huakewang.com'
//});
//this.dataSource.push({id:'1231123',kind:'advertisement',
//    send:{from:'杭州画客科技有限公司',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460'}
//    ,time:'2017/06/22 15:55:14',
//    contentText:'dfasdfasdfasd',
//    contentImage:'http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg',
//    contentUrl:'http://www.huakewang.com'
//});

class TheProjectScreen extends  React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.value[0],
            talkListData:this.props.value.talkingList,
            Ulogin:[false,undefined],
        };
    }
    componentDidMount(){
        let _Ulogin=this.props.value[1];
        if(_Ulogin!==undefined){
            this.setState({Ulogin:[true,_Ulogin]});
        }
    }
    clickGreat(e){
        let _clickGreatValue=this.state.data.likeNum;
        let _Ulogin=this.state.Ulogin;
        if(_Ulogin[0]){
            if(_clickGreatValue.includes(_Ulogin[1])){
                _clickGreatValue=_clickGreatValue.filter(x=>x!=_Ulogin[1]);
            }else{
                _clickGreatValue.push(_Ulogin[1]);
            }
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.data.likeNum=_clickGreatValue;
                return aaa
            })
        }else{

        }
    }
    render(){
        var rowData=this.state.data;
        var _cGV=this.state.data.likeNum;
        var _username=this.state.Ulogin[1];
        let _cGV_result=_cGV.indexOf(_username);
        let _lickImage=require('../../image/like_noclick.png');
        if(_cGV_result>-1&&_username!=undefined){
            _lickImage=require('../../image/like_click.png');
        }
        var pathimg=rowData.send.path;
        if(pathimg.indexOf('http')>-1){
            pathimg={uri:pathimg};
        }else{
            pathimg=require(pathimg);
        }
        var sex=rowData.send.sex;
        switch (sex){
            case 1:{
                sex=['flex',require('../../image/man.png')]
            }break;
            case 0:{
                sex=['flex',require('../../image/women.png')]
            }break;
            default:{
                sex=['none',require('../../image/man.png')]
            }break;
        }
        var _text=String(rowData.send.kindword).split(',');

        var images=[];
        for(var m=0;m<rowData.images.length;m++){
            images.push({uri:rowData.images[m]})
        }
        var _time4=(new Date()).toLocaleString();
        var _T_time=rowData.time;
        var _lN_RD=String(rowData.likeNum).split(',');
        let talkingList=rowData.talkingList;
        let _talkingList=Array.from(talkingList);
        let _likeNumSHOW=_lN_RD.length>0?'flex':'none';
        let navigateAction1 = NavigationActions.navigate({routeName:'cChatProjectPage',params:{id:rowData.id}});
        let ddd1=_lN_RD.length>0?'('+_lN_RD.length+')':' ';
        let ddd2=_talkingList.length>0?'('+_talkingList.length+')':' ';
        return (
            <View style={{backgroundColor: '#fff',padding:5,borderTop:5,borderTopColor:'#eee'}}>
                <View style={{height:50 ,flexDirection:'row',paddingTop:5,paddingBottom:5}}>
                    <Image source={pathimg} style={{height:40,width:40,borderRadius:20,
                    paddingRight:5}} />
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row',flex:1}}>
                            <Text>{rowData.send.name}</Text>
                            <Image source={sex[1]} style={{width:20,height:20,display:sex[0]}}  />
                        </View>
                        <View style={{flex:1,overflow:'hidden'}}>
                            <ChatNoPressFL value={[_text,{color:'#999',fontSize:14,}]}/>
                        </View>
                    </View>
                    <View style={{minWidth:30,flexDirection:'row'}}>
                        <Image source={require('../../image/darklocal.png')} style={{height:20,width:20}} />
                        <Text>{rowData.send.localtion}</Text>
                    </View>
                </View>
                <View style={{height:80}}>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(navigateAction1);
                    }}>
                        <WebView
                            source={{html:rowData.useReady}}
                        /></TouchableNativeFeedback>
                </View>
                <View style={styles.imagebox}>

                </View>
                <Image source={{flex:1,width: undefined, height: undefined}}  style={require('../../image/callBackWordBox.png')} />
                <View style={styles.like_Talk}>
                    <Text style={{alignSelf:'flex-start'}}>{_time4}{_T_time}</Text>
                    <TouchableNativeFeedback onPress={e=>{
                    this.clickGreat(e);
                    }}>
                        <View style={{flexDirection:'row'}}>
                        <Image source={_lickImage}  style={{width:20,height:20}} />
                        <Text style={{color:'#3E9CED'}}>点赞{ddd1}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={e=>{

                    }}>
                        <View style={{flexDirection:'row'}}>
                        <Image source={require('../../image/pinglun.png')}  style={{width:20,height:20}} />
                        <Text style={{color:'#3E9CED'}}>评论{ddd2}</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.talkBoxStyle}>
                    <View style={{display:_likeNumSHOW}}>
                        <ChatOnPressFL value={_lN_RD}/>
                    </View>
                </View>
                <TalkBoxScreen value={[_talkingList,rowData.id,rowData.send.name]} />
            </View>
        );
    }
}
class TheTipScreen extends  React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.value,
            talkListData:this.props.value.talkingList,
            Ulogin:[false,undefined],
        };
    }
    componentDidMount(){
        let _Ulogin=this.props.value;
        if(_Ulogin!==undefined){
            this.setState({Ulogin:[true,_Ulogin]});
        }
    }
    clickGreat(e){
        let _clickGreatValue=this.state.data.likeNum;
        let _Ulogin=this.state.Ulogin;
        if(_Ulogin[0]){
            if(_clickGreatValue.includes(_Ulogin[1]>-1)){
                _clickGreatValue=_clickGreatValue.filter(x=>x!=_Ulogin[1]);
            }else{
                _clickGreatValue.push(_Ulogin[1]);
            }
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.data.likeNum=_clickGreatValue;
                return aaa
            })
        }else{
        }
    }
    render(){
        var _cGV=this.state.data.likeNum;
        var _username=this.state.Ulogin[1];
        let _cGV_result=_cGV.indexOf(_username);
        let _lickImage=require('../../image/like_noclick.png');
        if(_cGV_result&&_username!=undefined){
            _lickImage=require('../../image/like_click.png');
        }
        var rowData=this.state.data;
        var pathimg=rowData.send.path;
        if(pathimg.indexOf('http')>-1){
            pathimg={uri:pathimg};
        }else{
            pathimg=require(pathimg);
        }
        var images=[];console.log(rowData.images,rowData.images.length);
        for(var m=0;m<rowData.images.length;m++){
            images.push({uri:rowData.images[m]})
        }
        var _time=(new Date()).valueOf();
        var _likeNum='';

        for(var l=0;l<rowData.likeNum.length;){
            _likeNum+=<Text style={{color:'#3E9CED'}} >{rowData.likeNum[l]}</Text>
        }
        let navigateAction2 = NavigationActions.navigate({routeName:'cChatTipPage',params:{id:rowData.id}});
        return (
            <View style={{backgroundColor: '#fff',padding:5,borderTop:5,borderTopColor:'#eee'}}>
                <View style={{height:50 ,flexDirection:'row',paddingTop:5,paddingBottom:5}}>
                    <Image source={pathimg} style={{height:40,width:40,borderRadius:20,
                    paddingRight:5,}} />
                    <View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text>{rowData.send.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{height:80}}>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(navigateAction2);
                    }}>
                        <WebView
                            source={{html:rowData.useReady}}
                        /></TouchableNativeFeedback>
                </View>
                <View style={styles.imagebox}>

                </View>
                <Image style={{flex:1,width: undefined, height: undefined}}  source={require('../../image/callBackWordBox.png')} />
                <View style={styles.like_Talk}>
                    <Text style={{alignSelf:'flex-start'}}>{_time}</Text>
                    <TouchableNativeFeedback onPress={e=>{
                    this.clickGreat(e);
                    }}>
                        <Image source={_lickImage}  style={{width:20,height:20}} />
                    </TouchableNativeFeedback>
                    <Text style={{color:'#3E9CED'}}>点赞({rowData.likeNum.length})</Text>
                    <Image source={require('../../image/pinglun.png')}  style={{width:20,height:20}} />
                    <Text style={{color:'#3E9CED'}}>回复({rowData.talkingList.length})</Text>
                </View>
                <View style={styles.talkBoxStyle}>
                    <Text style={{numberOfLines:1}}>{_likeNum}</Text>
                </View>

            </View>
        );
    }
}
class TheWorkScreen extends  React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.value,
            talkListData:this.props.value.talkingList,
            Ulogin:[false,this.props.value[1]],
        };
    }
    componentDidMount(){
        let _Ulogin=this.state.Ulogin[1];
        if(_Ulogin!==undefined){
            this.setState({Ulogin:[true,_Ulogin]});
        }
    }
    clickGreat(e){
        let _clickGreatValue=this.state.data.likeNum;
        let _Ulogin=this.state.Ulogin;
        if(_Ulogin[0]){
            if(_clickGreatValue.includes(_Ulogin[1])>-1){
                _clickGreatValue=_clickGreatValue.filter(x=>x!=_Ulogin[1]);
            }else{
                _clickGreatValue.push(_Ulogin[1]);
            }
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.data.likeNum=_clickGreatValue;
                return aaa
            })
        }else{

        }
    }
    render(){
        var _cGV=this.state.data.likeNum;
        var _username=this.state.Ulogin[1];
        let _cGV_result=_cGV.indexOf(_username);
        let _lickImage=require('../../image/like_noclick.png');
        if(_cGV_result&&_username!=undefined){
            _lickImage=require('../../image/like_click.png');
        }
        var rowData=this.state.data;
        var pathimg=rowData.send.path;
        if(pathimg.indexOf('http')>-1){
            pathimg={uri:pathimg};
        }else{
            pathimg=require(pathimg);
        }
        var images=[];
        for(var m=0;m<rowData.images.length;m++){
            images.push({uri:rowData.images[m]})
        }
        console.log(images)
        var _time=(new Date()).valueOf();
        var _likeNum='';
        for(var l=0;l<rowData.likeNum.length;){
            _likeNum+=<Text style={{color:'#3E9CED'}} >{rowData.likeNum[l]}</Text>
        }
        let navigateAction3 = NavigationActions.navigate({routeName:'Works',params:{id:rowData.id}});
        return (
            <View style={{backgroundColor: '#fff',padding:5,borderTop:5,borderTopColor:'#eee'}}>
                <View style={{height:50 ,flexDirection:'row',paddingTop:5,paddingBottom:5}}>
                    <Image source={pathimg} style={{height:40,width:40,borderRadius:20,
                    paddingRight:5}} />
                    <View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text>{rowData.send.name}发布了：</Text>
                        </View>
                        <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(navigateAction3);
                    }}>
                            <View>
                                <Text>{rowData.work.title}</Text>
                            </View></TouchableNativeFeedback>
                    </View>
                </View>
                <View style={styles.imagebox}>

                </View>
                <Image source={{flex:1,width: undefined, height: undefined}}  style={require('../../image/callBackWordBox.png')} />
                <View style={styles.like_Talk}>
                    <Text style={{alignSelf:'flex-start'}}>{_time}</Text>
                    <TouchableNativeFeedback onPress={e=>{
                    this.clickGreat(e);
                    }}>
                        <Image source={_lickImage}  style={{width:20,height:20}} />
                    </TouchableNativeFeedback>
                    <Text style={{color:'#3E9CED'}}>点赞({rowData.likeNum.length})</Text>
                    <Image source={require('../../image/pinglun.png')}  style={{width:20,height:20}} />
                    <Text style={{color:'#3E9CED'}}>收藏({rowData.work.saveNum})</Text>
                </View>
                <View style={styles.talkBoxStyle}>
                    <Text style={{numberOfLines:1}}>{_likeNum}</Text>
                </View>
            </View>
        );
    }
}
class TheActivityScreen extends  React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.value,
        };
    }
    render(){
        var rowData=this.state.data;
        var pathimg=rowData.send.path;
        if(pathimg.indexOf('http')>-1){
            pathimg={uri:pathimg};
        }else{
            pathimg=require(pathimg);
        }
        var images=[];
        for(var m=0;m<rowData.images.length;m++){
            images.push({uri:rowData.images[m]})
        }
        var _time=(new Date()).valueOf();
        var _timeText=_time<rowData.activityTime[0]?'即将开启':_time>rowData.activityTime[1]?'已结束':'正在进行';
        let navigateAction4 = NavigationActions.navigate({routeName:'Activity',params:{id:rowData.id}});
        return (
            <View style={{backgroundColor: '#fff',padding:5,borderTop:5,borderTopColor:'#eee'}}>
                <View style={{height:50 ,flexDirection:'row',paddingTop:5,paddingBottom:5}}>
                    <Image source={pathimg} style={{height:40,width:40,borderRadius:20,
                    paddingRight:5}} />
                    <View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text>{rowData.send.from}  发布了：</Text>
                        </View>
                        <View>
                            <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(navigateAction4);
                    }}>
                                <Text style={{numberOfLines:1,flex:1,alignSelf:'flex-start'}}>{rowData.work.title}</Text>
                            </TouchableNativeFeedback>
                            <Text style={{alignSelf:'flex-end',width:30}}>{_timeText}</Text>
                        </View>
                        <View>
                            <Image source={require('../../image/time_waite.png')} style={{}}/>
                            <Text>活动时间：{rowData.activityTime}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.imagebox}>

                </View>
            </View>
        );
    }
}
class TheAdvertisementScreen extends  React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.value,
        };
    }
    render(){
        var rowData=this.state.data;
        var pathimg=rowData.send.path;
        if(pathimg.indexOf('http')>-1){
            pathimg={uri:pathimg};
        }else{
            pathimg=require(pathimg);
        }
        var images=[];
        for(var m=0;m<rowData.images.length;m++){
            images.push({uri:rowData.images[m]})
        }
        let navigateAction5 = NavigationActions.navigate({routeName:'Advertisement',params:{id:rowData.id}});
        return (
            <View style={{backgroundColor: '#fff',padding:5,borderTop:5,borderTopColor:'#eee'}}>
                <View style={{height:50 ,flexDirection:'row',paddingTop:5,paddingBottom:5}}>
                    <Image source={pathimg} style={{height:40,width:40,borderRadius:20,
                    paddingRight:5}} />
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text>{rowData.send.from}</Text>
                    </View>
                </View>

                <View>
                    <Text>{rowData.work.title}</Text>
                    <TouchableNativeFeedback onPress={e=>{
                        this.props.screenProps.dispatch(navigateAction5);
                        }}>
                        <Text style={{color:'#3E9CED'}}>详情>></Text></TouchableNativeFeedback>
                </View>

                <View style={styles.imagebox}>

                </View>
            </View>
        );
    }
}
class TalkBoxScreen extends  React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            talkListShow:'flex',
            talkListData:this.props.value[0],
            talkListBottom:'close',
            talkInputBoxdefualt:'',
            islogin:false,
            username:'',
            callBackWord:'',
            submitKey:false,
            id:this.props.value[1],
            sendername:this.props.value[2],
            userLoign:undefined,
            dataSource:ds.cloneWithRows([]),
        };
    }
    focusNextField = (e,theField) => {
        this.refs[theField].focus();
    };
    componentDidMount () {
        let _data=this.state.talkListData;
        var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        datastorage.load({
            key: 'theGlobal',
            autoSync: true,
            syncInBackground: true,
        }).then(ret=>{
            let t_Global=ret;
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.islogin=t_Global.islogin;
                aaa.dataSource=ds.cloneWithRows(_data);
                aaa.talkListShow='none';
                aaa.username=t_Global.username;
                return aaa
            })
        });

    }
    callBackSomeone(e,nameValue){
        console.log(nameValue);
    }
    changeDefualt(e,nameV){
        this.setState({talkInputBoxdefualt:nameV});
        this.focusNextField(e,'1');
    }
    callBackWordFunction(e){
        var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let _data=this.state.talkListData;
        let _text=this.state.callBackWord;
        let _sender=this.state.userLoign;
        let _id=this.state.id;
        let _to=this.state.talkInputBoxdefualt;
        console.log(_text,_sender,_id,_to);
        _data.push({sender:_sender,to:_to,text:_text});
        this.setState((prevState, props) => {
            let aaa=prevState;
            aaa.talkListData=_data;
            aaa.dataSource=ds.cloneWithRows(_data);
        });
        this.timer=setTimeout(()=>{
            ToastAndroid.showWithGravity("评论成功",ToastAndroid.SHORT,
                ToastAndroid.CENTER)
        },1000)
    }
    _onChangeText(text){
        if(text==''){
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.callBackWord=text;
                return aaa
            })
        }else{
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.callBackWord=text;
                aaa.submitKey=true;
                return aaa
            })
        }
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    alertLogin(e){

    }
    _renderRow(rowData){
        let _sender=rowData.sender;
        let _to=rowData.to;
        let _theName=this.state.sendername;
        let centerCB='';
        if(_to==_theName){
            centerCB=':';
        }else{
            centerCB='回复';
        }
        return(
            <View>
                <Text style={{color:'#3E9CED'}}
                      onPress={e=>{this.callBackSomeone(e,_sender)}}
                >{_sender}</Text>
                <Text style={{marginLeft:3,marginRight:3}}>{centerCB}</Text>
                <Text style={{color:'#3E9CED'}}
                      onPress={e=>{this.callBackSomeone(e,_to)}}
                >{_to}</Text>
                <TouchableNativeFeedback onPress={e=>{
                    this.changeDefualt(e,rowData.sender);
                    }}>
                    <Text style={{color:'#111'}}>：{rowData.text}</Text>
                </TouchableNativeFeedback>
            </View>
        )
    }
    _renderFooter(){
        if(this.state.islogin){
            let defualt_PH=this.state.talkInputBoxdefualt;
            defualt_PH=defualt_PH==''?'评论：':('回复:'+defualt_PH);
            return(
                <View style={{backgroundColor:'#eee',flexDirection:'row'}}>
                    <TextInput
                        ref="1"
                        multiline={true}
                        placeholder={defualt_PH}
                        style={{flex:1,fontSize:16,paddingLeft:10,paddingRight:10,marginTop:10}}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        selectTextOnFocus={true}
                        returnKeyLabel="回复"
                        numberOfLines={3}
                        onSubmitEditing={e=>{
                            this.callBackWordFunction(e);
                        }}
                        onChangeText={(text) =>{
                            this._onChangeText(text)
                        }}
                    />
                    <TouchableNativeFeedback
                        disabled={this.state.submitKey}
                        onPress={e=>this.callBackWordFunction(e)}
                    >
                        <Text style={{fontSize:16,borderRadius:2,borderWidth:1,borderColor:'#aaa',backgroundColor:'#3E9CED',color:'#fff'}}>回复</Text>
                    </TouchableNativeFeedback>
                </View>
            )
        }else{
            return(
                <View style={{justifyContent:'center'}}>
                    <TouchableNativeFeedback onPress={e=>{
                        console.log("go to login page")
                    }}>
                        <Text style={{color:'#3E9CED'}}>登录后才能留言回复</Text>
                    </TouchableNativeFeedback>
                </View>
            )
        }
    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this._renderRow(rowData)}
                renderFooter={e=>this._renderFooter}
            />
        )
    }
}
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