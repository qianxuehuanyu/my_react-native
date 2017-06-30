/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,View,ListView,TouchableNativeFeedback,Dimensions,ScrollView,StyleSheet,WebView,ToastAndroid,Modal,Image,ActivityIndicator,Alert,
TextInput
} from 'react-native';
import {boxstyles} from "../Sheetstyle/cssMain"
import {Global,datastorage} from '../AgainBody/data'
import {Chat,dataChatstorage} from '../AgainBody/dataChat'
import { NavigationActions } from 'react-navigation'
import ViewPager  from 'react-native-viewpager'
import ImageViewer from 'react-native-image-zoom-viewer';
var wwidth=Dimensions.get('window').width;
import {PullList} from 'react-native-pull';
let long=100;

export default class Chatbottom extends React.Component {
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
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
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
        this.props.navigation.dispatch(navigateAction1);
        }
        }>
                <Image source={_imagepath} style={{width:wwidth,height:80}}/>
            </TouchableNativeFeedback>
        )
    }
    render() {
        return (
            <ScrollView
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='never'
            >
                <View>
                    <View style={{height:30,borderBottomWidth:1,borderBottomColor:'#aaa',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold',color:'#111'}}>画客圈</Text>
                    </View>
                    <ViewPager
                        style={{height:100}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage.bind(this)}
                        isLoop={true}
                        autoPlay={true}
                    />
                    <View style={{height:80,flexDirection:'row'}}>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_project.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[0]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>项目</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_tip.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[1]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>帖子</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_works.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[2]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>作品</Text>

                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_activity.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[3]}</Text>
                                </Image>
                                <Text style={{color:'#111' }}>活动</Text>

                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <ChatContentScreen screenProps={this.props.navigation} data={this.state.data} />
            </ScrollView>
        );
    }
}
class ChatContentScreen extends React.Component{
    constructor(props) {
        super(props);
        this.dataSource = [];
        this.state = {
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }
    onPullRelease(resolve) {
        //do something
        setTimeout(() => {
            resolve();
        }, 3000);
    }
    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: -500,opacity:0};
        const show = {position: 'relative', left: 0,opacity:1};
        setTimeout(() => {
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
        }, 1);
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
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={
                ()=>{
                this._scrollView.scrollTop({animated:true});
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
                    initialListSize={5}
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
            <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center',display:'none'}}>
                <Text style={{fontWeight: 'bold'}}>最新内容</Text>
            </View>
        );
    }
    renderRow(rowData, sectionID, rowID, highlightRow) {

        switch (rowData.kind){
            case 'project':{
                return(
                    <TheProjectScreen screenProps={this.props.navigation} value={rowData} />
                )
            }break;
            case 'tip':{
                return(
                    <TheTipScreen screenProps={this.props.navigation} value={rowData} />
                )
            }break;
            case 'work':{
                return(
                    <TheWorkScreen screenProps={this.props.navigation} value={rowData} />
                )
            }break;
            case 'activity':{
                return(
                    <TheActivityScreen screenProps={this.props.navigation} value={rowData} />
                )
            }break;
            case 'advertisement':{
                return(
                    <TheAdvertisementScreen screenProps={this.props.navigation} value={rowData} />
                )
            }break;
            default:{
                return(
                    <View><Text>数据错误！</Text></View>
                )
            }
        }
    }

    renderFooter() {
        if(this.state.nomore){
            return (<TouchableNativeFeedback onPress={()=>{
                    this._scrollView.scrollTo({y:0});
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
        if(long<1){
            this.state.nomore=true;
        }else{
            for(var i = 0; i < 3; i++) {
                this.dataSource.push({id:'123123',kind:'project',
                    send:{name:'洪辉',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                        sex:'1',localtion:'杭州'},kindword:['产品经理','三汇信息']
                    ,useReady:'<a style={color:red}>[预算：1.5万元]</a><a> 找12312312312321321321212121212121212' +
                    '1212121212121212121212121212' +'1212121212121212121212121' +
                    '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
                    images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
                    time:'2017/06/22 15:55:14',
                    likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
                    talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
                        {sender:'dafsd',to:'洪辉',text:'sdfasdfasdfasdfasd'},
                        {sender:'dafsd',to:'dfas大',text:'sdfasdfasdfasdfasd'}]
                });
                long--;
            }
            setTimeout(() => {
                this.setState({
                    list: this.state.list.cloneWithRows(this.dataSource)
                });
            }, 1000);
        }
    }
}

class TheProjectScreen extends  React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.value,
            talkListData:this.props.value.talkingList,
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
        var text=rowData.send.kindword;
        var chartext='';
        for(var i=0;i<text.length;i++){
            chartext+=<Text style={{paddingRight:5}}>{text[i]}</Text>;
        }
        var images=[];
        for(var m=0;m<rowData.images.length;m++){
            images.push({uri:rowData.images[m]})
        }
        var _time=(new Date()).valueOf();
        var _likeNum='';
        for(var l=0;l<rowData.likeNum.length;){
            if(rowData.likeNum[l]==name){

            }

            _likeNum+=<TouchableNativeFeedback onPress={e=>this.props.navigation.dispatch()}>
                <Text style={{color:'#3E9CED'}} >{rowData.likeNum[l]}</Text>
            </TouchableNativeFeedback>

        }

        return (
            <View style={{backgroundColor: '#fff',padding:5,borderTop:5,borderTopColor:'#eee'}}>
                <View style={{height:50 ,flexDirection:'row',paddingTop:5,paddingBottom:5}}>
                    <Image source={pathimg} style={{height:40,width:40,borderRadius:20,
                    paddingRight:5,}} />
                    <View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text>{rowData.send.name}</Text>
                            <Image source={sex[1]} style={{width:20,height:20,display:sex[0]}}  />

                        </View>
                        <View>
                            <Text>{chartext}</Text>
                        </View>
                    </View>
                    <View style={{minWidth:30,flexDirection:'row'}}>
                        <Image source={require('../../image/darklocal.png')} />
                        <Text>{rowData.send.localtion}</Text>
                    </View>
                </View>
                <View style={{height:80}}>
                    <WebView
                        source={{html:rowData.useReady}}
                    />
                </View>
                <View style={styles.imagebox}>
                    <Modal visible={true} transparent={true}>
                        <ImageViewer imageUrls={images}/>
                    </Modal>
                </View>
                <View style={styles.like_Talk}>
                    <Text style={{alignSelf:'flex-start'}}>{_time}</Text>
                    <TouchableNativeFeedback>
                        <Image source={}  style={{}} />
                    </TouchableNativeFeedback>
                    <Text>点赞({rowData.likeNum.length})</Text>
                    <TouchableNativeFeedback>
                        <Image source={}  style={{}} />
                    </TouchableNativeFeedback>
                    <Text>回复({rowData.talkingList.length})</Text>
                </View>
                <View style={styles.talkBoxStyle}>
                    <Image source={{}}  style={{}} />
                    <Text>{_likeNum}</Text>
                    <View>
                        <TalkBoxScreen value={this.state.talkListData}/>
                    </View>
                </View>

            </View>
        );
    }
}
class TheTipScreen extends  React.Component {
    render(){
        return(
            <View>
                <Text>123</Text>
            </View>
        )
    }
}
class TheWorkScreen extends  React.Component {
    render(){
        return(
            <View>
                <Text>123</Text>
            </View>
        )
    }
}
class TheActivityScreen extends  React.Component {
    render(){
        return(
            <View>
                <Text>123</Text>
            </View>
        )
    }
}
class TheAdvertisementScreen extends  React.Component {
    render(){
        return(
            <View>
                <Text>123</Text>
            </View>
        )
    }
}
class TalkBoxScreen extends  React.Component {
    constructor(props) {
        super(props);
        var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            talkListShow:'flex',
            talkListData:this.props.value,
            dataSource:ds.cloneWithRows([]),
            talkListBottom:'close',
            talkInputBoxdefualt:'',
            islogin:'false',
            username:'',
            callBackWord:''
        };
    }
    componentDidMount () {
        let _length=this.state.talkListData.length;
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
                if(_length>5){
                    let ddd=[_data[0],_data[1],_data[2],_data[3],_data[4]];
                    aaa.dataSource=ds.cloneWithRows(ddd);
                }else{
                    aaa.dataSource=ds.cloneWithRows(_data);
                    aaa.talkListShow='none';
                }
                aaa.username=t_Global.username;
                return aaa
            })
        });

    }
    callBackSomeone(e){

    }
    alertLogin(e){
        Alert.alert(
            '您还未登录！',
            [
                {text: '前往登录', onPress: () => console.log('Ask me later pressed')},
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
        )
    }
    _renderRow(rowData){
            let _name=this.state.username;
            let _sender=rowData.sender;
            let _to=rowData.to;
            if(_sender==_name){
                _sender=<Text>我</Text>
            }else{
                _sender=<TouchableNativeFeedback
                    onPress={e=>{

                    }}
                ><Text style={{color:'#3E9CED'}} >{rowData.sender}</Text></TouchableNativeFeedback>
            }
            if(_to==_name){
                _to=<Text>我</Text>
            }else{
                _to=<TouchableNativeFeedback
                    onPress={e=>{

                    }}
                ><Text style={{color:'#3E9CED'}}>{rowData.to}</Text></TouchableNativeFeedback>
            }

            return(
                <View>
                    {_sender}
                    <Text>回复</Text>
                    {_to}
                    <TouchableNativeFeedback onPress={e=>{
                    if(this.state.islogin){
                        this.callBackSomeone(rowData.sender)
                    }else{
                        this.alertLogin(e)
                    }
                    }}>
                        <Text>：{rowData.text}</Text>
                    </TouchableNativeFeedback>
                </View>
            )

    }
    _renderFooter(){
        if(this.state.islogin){
            let ddd="回复："+this.state.talkInputBoxdefualt;
            return(
                <View style={{backgroundColor:'#eee'}}>
                    <TextInput
                        placeholder={ddd}
                        style={{flex:1,fontSize:20,paddingLeft:10,paddingRight:10,marginTop:10}}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        selectTextOnFocus={true}
                        onChangeText={(text) =>this.setState({callBackWord:text})}
                    />
                </View>
            )
        }else{
            return(
                <View>
                    <TouchableNativeFeedback onPress={e=>{
                        console.log("login")
                    }}>
                        <Text>登录后才能留言回复</Text>
                    </TouchableNativeFeedback>
                </View>
            )
        }
    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderFooter={this._renderFooter.bind(this)}
            />
        )
    }
}



const navigateAction1 = NavigationActions.navigate({routeName:'cChatProject'});
const navigateAction2 = NavigationActions.navigate({routeName:'cChatTip'});
const navigateAction3 = NavigationActions.navigate({routeName:'Works'});
const navigateAction4 = NavigationActions.navigate({routeName:'Activity'});
const navigateAction5 = NavigationActions.navigate({routeName:'Advertisement'});





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

    }

});