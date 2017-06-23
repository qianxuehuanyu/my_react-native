/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    Text,View,ListView,TouchableNativeFeedback,Dimensions,ScrollView,StyleSheet,WebView,ToastAndroid,Modal,Image
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
            dataSource: dataSource.cloneWithPages(Global.AnyChat_images)
        }
    }
    componentDidMount () {

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
                <Image source={_imagepath} style={{width:wwidth,height:50}}/>
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
                    <View style={{height:30,borderBottomWidth:1,borderBottomColor:'#aaa',justifyContent:'center'}}>
                        <Text>画客圈</Text>
                    </View>
                    <ViewPager
                        style={{height:50}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage.bind(this)}
                        isLoop={true}
                        autoPlay={true}
                    />
                    <View style={{height:80}}>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_project.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[0]}</Text>
                                </Image>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_tip.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[1]}</Text>
                                </Image>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_works.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[2]}</Text>
                                </Image>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{

                    }}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../image/Chat_activity.png')} style={styles.topimage}>
                                    <Text style={styles.toptext}>{Global.AnyChat_top[3]}</Text>
                                </Image>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
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
                <Text style={{fontWeight: 'bold'}}>This is header</Text>
            </View>
        );
    }
    renderRow(rowData, sectionID, rowID, highlightRow) {
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
        return (
            <View style={{minHeight: 300, backgroundColor: '#fff',padding:5,borderTop:5,borderTopColor:'#eee'}}>
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
            </View>
        );
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
                this.dataSource.push({id:'123123',
                    send:{name:'洪辉',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                        sex:'1',localtion:'杭州'},kindword:['产品经理','三汇信息']
                    ,useReady:'<a style={color:red}>[预算：1.5万元]</a><a> 找12312312312321321321212121212121212' +
                    '1212121212121212121212121212' +'1212121212121212121212121' +
                    '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
                    images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
                    time:'',
                    likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
                    talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
                        {sender:'dafsd',to:'',text:'sdfasdfasdfasdfasd'},
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

const styles=StyleSheet.create({
    topimage:{
        width:50,height:50,position:'relative'
    },
    toptext:{
        backgroundColor:'red',
        padding:2,
        borderRadius:5,position:'absolute',top:0,right:0,color:'#fff'
    },
    imagebox:{height:wwidth,},
    oneimage:{},
    twoimage:{},
    tfimage:{},
    fsimage:{},
    setimage:{},

});