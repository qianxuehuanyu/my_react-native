import React from 'react';
import {
    StyleSheet,
    Text,Image,
    View,
    ActivityIndicator,
    FlatList,ToastAndroid,TouchableNativeFeedback
} from 'react-native';
import PubSub from 'pubsub-js'
let theLongValue=20;
import { NavigationActions } from 'react-navigation'
export default class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
    }
    componentDidMount(){}
    componentWillUnmount(){}
    render(){
        return(
            <View><Text>1</Text></View>
        )}
}











//export default class extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state={
//            data:[{
//                id: 1,
//                title: `this is1`,
//                sex:2,
//                kindSelect:`距离：`+1*100+`M`,
//                username:`sdfasfd`,
//                keyword:[1,4,'10','21321'],path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
//                _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
//            }],
//            refreshingValue:false,
//        }
//    }
//    componentDidMount() {}
//    componentWillUnmount() {
//        this.timer && clearTimeout(this.timer);
//        this.timer1 && clearTimeout(this.timer1);
//        this.timer3 && clearTimeout(this.timer3);
//    }
//    comeAllKindList(item){
//        var rowData=item;
//        var dddlist=rowData.keyword;
//        var _sex=rowData.sex;
//        _sex=_sex==0?require('../../image/man.png'):require('../../image/women.png');
//        var _pathimg=rowData._pathimg;
//        var touxiang=rowData.path;
//        if(touxiang!=undefined&&touxiang.indexOf('http')==-1){
//            touxiang='https://www.huakewang.com/'+touxiang
//        }
//        return (
//            <View style={{height: 300, backgroundColor: '#fff'}}>
//                <View style={{height:50,marginLeft:10,marginRight:10,borderBottomWidth:1,borderBottomColor:'#eee',flexDirection:'row'}}>
//                    <TouchableNativeFeedback onPress={e=>{
//                    const navigateAction5 = NavigationActions.navigate({routeName: 'Designer',params:{name:rowData.name,from:'designer'}});
//                    this.props.navigation.dispatch(navigateAction5);
//                    }}>
//                        <Image source={{uri:touxiang}} style={{width:40,height:40,marginTop:5}}/>
//                    </TouchableNativeFeedback>
//                    <View style={{height:40,flex:1,marginTop:5}}>
//                        <View style={{height:20,paddingLeft:10,flexDirection:'row'}}>
//                            <View style={{flex:1,height:20,alignSelf:'flex-start',flexDirection:'row',justifyContent:'flex-start'}}>
//
//                                <Text>{rowData.username}</Text>
//                                <Image source={_sex} style={{width:14,height:14,marginTop:3,marginLeft:5}}/>
//                            </View>
//
//                            <View style={{flex:1, flexDirection: 'row',justifyContent:'flex-end'}}>
//                                <Image source={require('../../image/darklocal.png')} style={{width:14,height:14,marginTop:3}}/>
//                                <Text>{rowData.kindSelect}</Text>
//                            </View>
//                        </View>
//                        <View style={{flexDirection:'row',height:20,paddingLeft:10}}>
//                            <Text style={{color:'#aaa'}}>{dddlist[0]==0?'':dddlist[0]==''?'':(dddlist[0]+'|')
//                            }</Text>
//                            <Text style={{color:'#aaa'}}>{dddlist[1]==0?'':dddlist[1]==''?'':(dddlist[1]+'年经验|')
//                            }</Text>
//                            <Text style={{color:'#aaa'}}>{dddlist[2]==0?'':dddlist[2]==''?'':(dddlist[2]+'作品|')
//                            }</Text>
//                            <Text style={{color:'#aaa'}}>{dddlist[3]==0?'':dddlist[3]==''?'':(dddlist[3]+'人喜欢')
//                            }</Text>
//
//                        </View>
//                    </View>
//                </View>
//                <View style={{flexDirection:'row',marginLeft:10,marginRight:10}}>
//                    <View style={{height:35,width:40,marginTop:2}}>
//                        <Image source={require('../../image/kind.png')} style={{height:18,width:11,alignSelf:'center'}} />
//                    </View>
//                    <View style={{flex:1}}>
//                        <Text>2手动阀，社发局，俩劳动，竞赛，弗利萨asd,fafaf,afaf,afaf,afa,faf,af,afa3</Text>
//                    </View>
//                </View>
//                <View style={{height:100,flexDirection:'row',marginLeft:10,justifyContent: 'space-between',marginBottom:10}}>
//                    <TouchableNativeFeedback>
//                        <Image source={{uri:_pathimg[0]}} style={styles.work_pathimg}/>
//                    </TouchableNativeFeedback>
//                    <TouchableNativeFeedback>
//                        <Image source={{uri:_pathimg[1]}} style={styles.work_pathimg}/>
//                    </TouchableNativeFeedback>
//                </View>
//                <View style={{height:100,flexDirection:'row',marginLeft:10,justifyContent: 'space-between'}}>
//                    <TouchableNativeFeedback>
//                        <Image source={{uri:_pathimg[2]}} style={styles.work_pathimg}/>
//                    </TouchableNativeFeedback>
//                    <TouchableNativeFeedback>
//                        <Image source={{uri:_pathimg[3]}} style={styles.work_pathimg}/>
//                    </TouchableNativeFeedback>
//                </View>
//            </View>
//        );
//    }
//    refreshChange(e){
//        this.setState({refreshingValue:true});
//        this.timer1=setTimeout(()=>{
//            ToastAndroid.showWithGravity('Data is updated', ToastAndroid.SHORT, ToastAndroid.CENTER);
//            this.setState({refreshingValue:false});
//        },4000)
//    }
//    loadMore(e){
//        let _data=this.state.data;
//        PubSub.publish('refreshShow','flex');
//        if(theLongValue>1){
//            for(var i = 0; i < 2; i++) {
//                _data.push({
//                    id: i + 1,
//                    title: `this is ${i}`,
//                    sex:i%2,
//                    kindSelect:`距离：`+i*100+`M`,
//                    username:`sdfasfd`,
//                    keyword:[1,4,'10','21321'],path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
//                    _pathimg:['http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115','http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115']
//                });
//                theLongValue--;
//            }
//            this.timer3=setTimeout(()=>{
//                this.setState({data:_data});
//                PubSub.publish('refreshShow','none');
//            },3000);
//        }
//    }
//    render(){
//        return(
//            <View style={{flex:1}}>
//                <FlatList
//                    data={this.state.data}
//                    extraData={this.state}
//                    ListEmptyComponent={ErrorFlatScreen}
//                    ListHeaderComponent={HeaderFlatScreen}
//                    ListFooterComponent={FooterFlatScreen}
//                    initialNumToRender={5}
//                    renderItem={({item})=>{this.comeAllKindList(item)}}
//                    onRefresh={e=>{this.refreshChange(e)}}
//                    refreshing={this.state.refreshingValue}
//                    onEndReached={e=>{this.loadMore(e)}}
//                    onEndReachedThreshold={30}
//                />
//            </View>
//        )
//    }
//}
//class ErrorFlatScreen extends React.Component{
//    render(){
//        return(
//            <View style={{justifyContent:'center'}}><ActivityIndicator/></View>
//        )
//    }
//}
//class HeaderFlatScreen extends React.Component{
//    render(){
//        return(
//            <View style={{justifyContent:'center',backgroundColor:'#362932'}}><Text>1111111111111111111111111111</Text></View>
//        )
//    }
//}
//class FooterFlatScreen extends React.Component{
//    constructor(props) {
//        super(props);
//        this.state={
//            keyword:'none',
//        }
//    }
//    componentDidMount () {
//        this.setRefreshShow = PubSub.subscribe('refreshShow', function (topic, product) {
//                this.setState((prevState, props) => {
//                    let aaa=prevState;
//                    aaa.keyword=product;
//                    return aaa
//                })
//            }.bind(this)
//        )}
//    componentWillUnmount () {
//        PubSub.unsubscribe(this.setRefreshShow);
//    };
//    render(){
//        if(theLongValue<1){
//            return(
//                <View style={{justifyContent:'center'}}><Text>没有更多了</Text></View>
//            )
//        }else{
//            return(
//                <View style={{justifyContent:'center',display:this.state.keyword}}><ActivityIndicator/></View>
//            )
//        }
//
//    }
//}


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
