import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,
    ActivityIndicator,TouchableNativeFeedback,
    ListView,
} from 'react-native';
import {PullList} from 'react-native-pull';
let long=30;
export default class HomeContent extends Component {

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

    renderHeader() {
        return (
            <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center',display:'none'}}>
                <Text style={{fontWeight: 'bold'}}>This is header</Text>
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        var dddlist=String(rowData.keyword).split(",");
        var _sex=String(rowData.sex);
        _sex=_sex==0?require('../../image/man.png'):require('../../image/women.png');
        var _pathimg=String(rowData._pathimg).split(',');
        return (
            <View style={{height: 300, backgroundColor: '#fff'}}>
                <View style={{height:50,marginLeft:10,marginRight:10,borderBottomWidth:1,borderBottomColor:'#eee',flexDirection:'row'}}>
                    <TouchableNativeFeedback >
                    <Image source={{uri:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460'}} style={{width:40,height:40,marginTop:5}}/>
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
                <TouchableNativeFeedback>
                    <Image source={{uri:_pathimg[0]}} style={styles.work_pathimg}/>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <Image source={{uri:_pathimg[1]}} style={styles.work_pathimg}/>
                </TouchableNativeFeedback>
                </View>
                <View style={{height:100,flexDirection:'row',marginLeft:10,justifyContent: 'space-between'}}>
                    <TouchableNativeFeedback>
                        <Image source={{uri:_pathimg[2]}} style={styles.work_pathimg}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <Image source={{uri:_pathimg[3]}} style={styles.work_pathimg}/>
                    </TouchableNativeFeedback>
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
            this.dataSource.push({
                id: 0,
                title: `begin to create data ...`,
                username:`sdfasfd`,
                sex:0,
                kindSelect:`距离：300M`,
                keyword:[`软件设计`,1,1,1],
                _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
        });
            for(var i = 0; i < 5; i++) {
                this.dataSource.push({
                    id: i + 1,
                    title: `this is ${i}`,
                    sex:i%2,
                    kindSelect:`距离：`+i*100+`M`,
                    username:`sdfasfd`,
                    keyword:[,4,'10','21321'],
                    _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
                });
                long--;
            }

            this.dataSource.push({
                id: 6,
                title: `finish create data ...`,
                username:`sdfasfd`,
                sex:0,
                kindSelect:`距离：300M`,
                keyword:[`软件设计`,13,3,12312],
                _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
            });
            setTimeout(() => {
                this.setState({
                    list: this.state.list.cloneWithRows(this.dataSource)
                });
            }, 1000);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    work_pathimg:{
        flex:1,
        borderWidth:1,marginRight:10,
        borderColor:'#eee',
    }
});
