import React, { Component } from 'react';
import {
    StyleSheet,
    Text,Dimensions,
    View,Image,ScrollView,
    ActivityIndicator,TouchableNativeFeedback,
    ListView,ToastAndroid,
} from 'react-native';
import {PullList} from 'react-native-pull';
let long=30;

import { NavigationActions } from 'react-navigation'
import HomeHeaderScreen from './HomeHeader'


export default class HomeContent extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
        this.dataSource = [];
        var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            list: ds.cloneWithRows(this.dataSource),
            nomore:false,
        };
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    onPullRelease(resolve) {
        //do something
        this.timer=setTimeout(() => {
            resolve();
        }, 3000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timer1 && clearTimeout(this.timer1);
        this.timer2 && clearTimeout(this.timer2);

    }
    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute',left: -500,opacity:0};
        const show = {position: 'relative',left: 0,opacity:1};
        this.timer1=setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
                ToastAndroid.showWithGravity("加载成功！",ToastAndroid.SHORT,
                    ToastAndroid.CENTER)
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 200);

        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height:60,}}>
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
                <TouchableNativeFeedback onPress={e=>{
                this._scrollView.scrollTo({x: 0, y: 0, animated: true});
                }}>
                    <Image source={require('../../image/backtop.png')} style={{width:30,height:30,position:'absolute',bottom:10,right:10}}/>
                </TouchableNativeFeedback>
                <View>
                    <HomeHeaderScreen screenProps={this.props.screenProps} />
                </View>
                <PullList
                    ref={(scrollView) => { this._scrollView = scrollView; }}
                    style={{flex:1}}
                    showsVerticalScrollIndicator={false}
                    onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
                    dataSource={this.state.list}
                    pageSize={5}
                    onScrollEndDrag={e=>{console.log(e.nativeEvent.contentOffset)}}
                    initialListSize={5}
                    renderRow={this.renderRow}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={30}
                    renderFooter={this.renderFooter}
                />
            </View>
        );
    }
    renderRow(rowData, sectionID, rowID, highlightRow) {
        var dddlist=String(rowData.keyword).split(",");
        var _sex=String(rowData.sex);
        _sex=_sex==0?require('../../image/man.png'):require('../../image/women.png');
        var _pathimg=String(rowData._pathimg).split(',');
        var touxiang=rowData.path;
        if(touxiang!=undefined&&touxiang.indexOf('http')==-1){
            touxiang='https://www.huakewang.com/'+touxiang
        }
        let _pathimgURI=[];
        for(var p=0;p<_pathimg.length;p++){
            _pathimgURI.push({url:''+_pathimg[p]})
        }
        let seeImageNA0 = NavigationActions.navigate({routeName: 'ImageBox',params:{imagesPath:_pathimgURI,imagesIndex:0}});
        let seeImageNA1 = NavigationActions.navigate({routeName: 'ImageBox',params:{imagesPath:_pathimgURI,imagesIndex:1}});
        let seeImageNA2 = NavigationActions.navigate({routeName: 'ImageBox',params:{imagesPath:_pathimgURI,imagesIndex:2}});
        let seeImageNA3 = NavigationActions.navigate({routeName: 'ImageBox',params:{imagesPath:_pathimgURI,imagesIndex:3}});
        return (
            <View style={{height: 300, backgroundColor: '#fff'}}>
                <View style={{height:50,marginLeft:10,marginRight:10,borderBottomWidth:1,borderBottomColor:'#eee',flexDirection:'row'}}>
                    <TouchableNativeFeedback onPress={()=>{
                    const navigateAction5 = NavigationActions.navigate({routeName: 'Designer',params:{name:rowData.name,from:'designer'}});
                    this.props.screenProps.dispatch(navigateAction5);
                    }}>
                        <Image source={{uri:touxiang}} style={{width:40,height:40,marginTop:5}}/>
                    </TouchableNativeFeedback>
                    <View style={{height:40,flex:1,marginTop:5}}>
                        <View style={{height:20,paddingLeft:10,flexDirection:'row'}}>
                            <View style={{flex:1,height:20,alignSelf:'flex-start',flexDirection:'row',justifyContent:'flex-start'}}>

                                <Text>{rowData.username}</Text>
                                <Image source={_sex} style={{width:14,height:14,marginTop:3,marginLeft:5}}/>
                            </View>

                            <View style={{flex:1, flexDirection: 'row',justifyContent:'flex-end'}}>
                                <Image source={require('../../image/darklocal.png')} style={{width:14,height:14,marginTop:3}}/>
                                <Text>{rowData.kindSelect}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',height:20,paddingLeft:10}}>
                            <Text style={{color:'#aaa'}}>{dddlist[0]==0?'':dddlist[0]==''?'':(dddlist[0]+'|')
                            }</Text>
                            <Text style={{color:'#aaa'}}>{dddlist[1]==0?'':dddlist[1]==''?'':(dddlist[1]+'年经验|')
                            }</Text>
                            <Text style={{color:'#aaa'}}>{dddlist[2]==0?'':dddlist[2]==''?'':(dddlist[2]+'作品|')
                            }</Text>
                            <Text style={{color:'#aaa'}}>{dddlist[3]==0?'':dddlist[3]==''?'':(dddlist[3]+'人喜欢')
                            }</Text>

                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginRight:10}}>
                    <View style={{height:35,width:40,marginTop:2}}>
                        <Image source={require('../../image/kind.png')} style={{height:18,width:11,alignSelf:'center'}} />
                    </View>
                    <View style={{flex:1}}>
                        <Text>2手动阀，社发局，俩劳动，竞赛，弗利萨asd,fafaf,afaf,afaf,afa,faf,af,afa3</Text>
                    </View>

                </View>
                <View style={{height:100,flexDirection:'row',marginLeft:10,justifyContent: 'space-between',marginBottom:10}}>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(seeImageNA0)
                    }}>
                        <Image source={{uri:_pathimg[0]}} style={styles.work_pathimg}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(seeImageNA1)
                    }}>
                        <Image source={{uri:_pathimg[1]}} style={styles.work_pathimg}/>
                    </TouchableNativeFeedback>
                </View>
                <View style={{height:100,flexDirection:'row',marginLeft:10,justifyContent: 'space-between'}}>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(seeImageNA2)
                    }}>
                        <Image source={{uri:_pathimg[2]}} style={styles.work_pathimg}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.screenProps.dispatch(seeImageNA3)
                    }}>
                        <Image source={{uri:_pathimg[3]}} style={styles.work_pathimg}/>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
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
        if(long<1){
            this.setState({nomore:true});
        }else{
            this.dataSource.push({
                id: 0,
                title: `begin to create data ...`,
                username:`sdfasfd`,
                sex:0,
                kindSelect:`距离：300M`,
                keyword:[`软件设计`,1,1,1],
                path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
            });
            for(var i = 0; i < 5; i++) {
                this.dataSource.push({
                    id: i + 1,
                    title: `this is ${i}`,
                    sex:i%2,
                    kindSelect:`距离：`+i*100+`M`,
                    username:`sdfasfd`,
                    keyword:[,4,'10','21321'],path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                    _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
                });
                long--;
            }

            this.dataSource.push({
                id: 6,name:'qianxuehuanyu',
                title: `finish create data ...`,
                username:`sdfasfd`,
                sex:0,
                kindSelect:`距离：300M`,
                keyword:[`软件设计`,13,3,12312],path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
            });
            this.timer2=setTimeout(() => {
                var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    list: ds.cloneWithRows(this.dataSource)
                });
            }, 1000);
        }
    }
}
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,position:'relative',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    work_pathimg:{
        flex:1,
        borderWidth:1,marginRight:10,
        borderColor:'#eee',
    }
});
