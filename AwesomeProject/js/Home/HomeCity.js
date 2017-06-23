/**
 * Created by admin on 2017/5/12.
 */
import React from 'react';
import {
    Text,Button,View,Image,TouchableNativeFeedback,ScrollView,TextInput,ListView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {boxstyles} from '../Sheetstyle/cssMain'
import {City,dataCitystorage} from '../AgainBody/dataCity'
import PubSub from 'pubsub-js'
let listV=require('../AgainBody/area_tb_da.json');
let keywordValue=[
    {keyword:'A',color:'#777',borderColor:'#aaa'},
    {keyword:'B',color:'#777',borderColor:'#aaa'},
    {keyword:'C',color:'#777',borderColor:'#aaa'},
    {keyword:'D',color:'#777',borderColor:'#aaa'},
    {keyword:'E',color:'#777',borderColor:'#aaa'},
    {keyword:'F',color:'#777',borderColor:'#aaa'},
    {keyword:'G',color:'#777',borderColor:'#aaa'},
    {keyword:'H',color:'#777',borderColor:'#aaa'},
    {keyword:'J',color:'#777',borderColor:'#aaa'},
    {keyword:'K',color:'#777',borderColor:'#aaa'},
    {keyword:'L',color:'#777',borderColor:'#aaa'},
    {keyword:'M',color:'#777',borderColor:'#aaa'},
    {keyword:'N',color:'#777',borderColor:'#aaa'},
    {keyword:'P',color:'#777',borderColor:'#aaa'},
    {keyword:'Q',color:'#777',borderColor:'#aaa'},
    {keyword:'R',color:'#777',borderColor:'#aaa'},
    {keyword:'S',color:'#777',borderColor:'#aaa'},
    {keyword:'T',color:'#777',borderColor:'#aaa'},
    {keyword:'W',color:'#777',borderColor:'#aaa'},
    {keyword:'X',color:'#777',borderColor:'#aaa'},
    {keyword:'Y',color:'#777',borderColor:'#aaa'},
    {keyword:'Z',color:'#777',borderColor:'#aaa'},
];
const theKeyWordList=listV.citys;

export default class LocalselectScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title:'城市选择'
    });
    constructor(props) {
        super(props);
        this.state = {
            keyword:'',
            selectKey:''
        }
    }
    componentDidMount () {
        this.selectKeyval = PubSub.subscribe('cityKeyword', function (topic, product) {
                this.setState((prevState, props) => {
                    let aaa=prevState;
                    aaa.keyword=product;
                    return aaa
                })
            }.bind(this)
        )}
    componentWillUnmount () {
        PubSub.unsubscribe(this.selectKeyval);
    };
    keywordSelect(val){
        PubSub.publish('FKeyword', val);
    }
    render(){
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <View style={{height:50,backgroundColor:'#fff'}}>
                    <View style={{height:40,marginTop:6,marginLeft:15,marginRight:15,borderRadius:20,backgroundColor:'#eee',flexDirection:'row',paddingTop:5}}>
                        <Image source={require('../../image/localfind.png')} style={{height:30,width:30,marginLeft:5}}/>
                        <TextInput placeholder="请输入"
                                   style={{flex:1,fontSize:16,paddingLeft:10,paddingTop:5}}
                                   underlineColorAndroid="transparent"
                                   defaultValue={this.state.result}
                                   autoCorrect={false}
                                   selectTextOnFocus={true}
                                   onChangeText={(text) =>{
                           this.setState({selectKey:text});
                           this.keywordSelect(text);
                           }}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:10,borderColor:'#aaa',borderWidth:1,marginLeft:10,marginRight:10,borderRadius:5,
            padding:10,paddingBottom:0,flexWrap:'wrap'}}>
                    <Keywordbtn val={0}/>
                    <Keywordbtn val={1}/>
                    <Keywordbtn val={2}/>
                    <Keywordbtn val={3}/>
                    <Keywordbtn val={4}/>
                    <Keywordbtn val={5}/>
                    <Keywordbtn val={6}/>
                    <Keywordbtn val={7}/>
                    <Keywordbtn val={8}/>
                    <Keywordbtn val={9}/>
                    <Keywordbtn val={10}/>
                    <Keywordbtn val={11}/>
                    <Keywordbtn val={12}/>
                    <Keywordbtn val={13}/>
                    <Keywordbtn val={14}/>
                    <Keywordbtn val={15}/>
                    <Keywordbtn val={16}/>
                    <Keywordbtn val={17}/>
                    <Keywordbtn val={18}/>
                    <Keywordbtn val={19}/>
                    <Keywordbtn val={20}/>
                    <Keywordbtn val={21}/>
                </View>
                <Text>历史地址：{this.state.keyword}</Text>
                <KeywordList screenProps={this.props.navigation}/>
            </ScrollView>
        )
    }
}
let datadata=[];
class KeywordList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        for(let ll=0;ll<theKeyWordList.length;ll++){
            if(theKeyWordList[ll].display==1){
                datadata.push(theKeyWordList[ll]);
            }
        }
        this.state = {
            dataSource: ds.cloneWithRows(datadata)
        };
    }
    componentDidMount () {
        this.SKeyval = PubSub.subscribe('KKeyword', function (topic, product) {
                datadata=[];
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                for(let ll=0;ll<theKeyWordList.length;ll++){
                    if(theKeyWordList[ll].keyword==product){
                        datadata.push(theKeyWordList[ll]);
                    }
                }
                this.setState({dataSource:ds.cloneWithRows(datadata)})
            }.bind(this)
        );
        this.FKeyval = PubSub.subscribe('FKeyword', function (topic, product) {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                datadata=[];
                for(var i=0;i<theKeyWordList.length;i++) {
                    let _key=theKeyWordList[i].city;
                    if(_key.indexOf(product)>-1){
                        datadata.push(theKeyWordList[i])
                    }
                }
                this.setState({dataSource:ds.cloneWithRows(datadata)})
            }.bind(this)
        )
    }

    componentWillUnmount () {
        PubSub.unsubscribe(this.SKeyval);
        PubSub.unsubscribe(this.FKeyval);
    }
    _renderRow(rowData){
        var _this=this;
        return (
            <TouchableNativeFeedback onPress={
            (event)=>{
            if(City.usedcity.indexOf(rowData.city)<0){
            City.usedcity.unshift(rowData.city)
            }
            City.theCity=rowData.city;
            console.log(rowData.city,City);
            dataCitystorage.save({
            key: 'theCity',
            data:City
            });
            _this.props.screenProps.dispatch(navigateAction1);

            }
            }>
                <View style={{height:35,backgroundColor:'#fff',paddingLeft:10}}>
                    <Text style={{fontSize:16,lineHeight:28}}>{rowData.city}</Text>
                </View>
            </TouchableNativeFeedback>
        )

    }
    _renderHeader(){
        let hhh=City.usedcity;
        let _this=this;
        return(
            <View style={{flex:1 ,flexDirection:'row',padding:5}}>
                <TouchableNativeFeedback onPress={
            (event)=>{
                City.theCity=hhh[0];
                dataCitystorage.save({
                key: 'theCity',
                data:City
                });
                _this.props.screenProps.dispatch(navigateAction1);

            }
            }>
                    <View style={{backgroundColor:'#fff',padding:2,marginRight:4,minWidth:30,borderWidth:1,borderColor:'#eee',borderRadius:2,display:hhh[0]==undefined?'none':'flex'}}>
                        <Text style={{fontSize:16,lineHeight:20,alignSelf:'center'}}>{hhh[0]}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={
            ()=>{
                City.theCity=hhh[1];
                dataCitystorage.save({
                key: 'theCity',
                data:City
                });

                _this.props.screenProps.dispatch(navigateAction1);
            }
            }>
                    <View style={{flex:1,backgroundColor:'#fff',padding:2,minWidth:30,maxWidth:50,borderWidth:1,borderColor:'#eee',borderRadius:2,display:hhh[1]==undefined?'none':'flex'}}>
                        <Text style={{fontSize:16,lineHeight:20,alignSelf:'center'}}>{hhh[1]}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={
            ()=>{
                City.theCity=hhh[2];
                dataCitystorage.save({
                key: 'theCity',
                data:City
                });
                _this.props.screenProps.dispatch(navigateAction1);
            }
            }>
                    <View style={{flex:1,backgroundColor:'#fff',padding:2,minWidth:30,maxWidth:50,borderWidth:1,borderColor:'#eee',borderRadius:2,display:hhh[2]==undefined?'none':'flex'}}>
                        <Text style={{fontSize:16,lineHeight:20,alignSelf:'center'}}>{hhh[2]}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={
            ()=>{
                City.theCity=hhh[3];
                dataCitystorage.save({
                key: 'theCity',
                data:City
                });
                _this.props.screenProps.dispatch(navigateAction1);
            }
            }>
                    <View style={{flex:1,backgroundColor:'#fff',padding:2,minWidth:30,maxWidth:50,borderWidth:1,borderColor:'#eee',borderRadius:2,display:hhh[3]==undefined?'none':'flex'}}>
                        <Text style={{fontSize:16,lineHeight:20,alignSelf:'center'}}>{hhh[3]}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
                screenProps={this.props.screenProps}
            />
        );
    }
}




class Keywordbtn extends React.Component {
    keywordClick(val){
        for(var i=0;i<keywordValue.length;i++){
            if(keywordValue[i].keyword==val){
                keywordValue[i].display='1';
                keywordValue[i].color='#048bef';
                keywordValue[i].borderColor='#048bef';
            }else{
                keywordValue[i].display='0';
                keywordValue[i].color='#777';
                keywordValue[i].borderColor='#aaa';
            }
        }
        for(var i=0;i<theKeyWordList.length;i++) {
            if(theKeyWordList[i].keyword==val){
                theKeyWordList[i].display='1';
            }else{
                theKeyWordList[i].display='0';
            }
        }
        PubSub.publish('cityKeyword', val);
        PubSub.publish('KKeyword', val);
    }
    render(){
        let kV=keywordValue;
        return (
            <TouchableNativeFeedback onPress={()=>{
                this.keywordClick(kV[this.props.val].keyword)
                }}>
                <View style={{height:30,width:30,backgroundColor:'#fff',borderColor:kV[this.props.val].borderColor,borderWidth:1,borderRadius:2,marginLeft:5,marginBottom:10}}>
                    <Text style={{lineHeight:22,paddingLeft:9,color:kV[this.props.val].color}}>{kV[this.props.val].keyword}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const navigateAction1 = NavigationActions.reset({
    index: 1,
    actions: [
        NavigationActions.navigate({ routeName: 'Box'}),
        NavigationActions.navigate({ routeName: 'pHomeLocal',params:{city:City.theCity,local:''}})
    ]
});