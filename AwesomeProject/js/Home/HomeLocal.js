/**
 * Created by admin on 2017/5/12.
 */
/**
 * Created by admin on 2017/5/12.
 */
import React from 'react';
import {
    Text,View,StyleSheet,Image,TouchableNativeFeedback,TouchableOpacity,TextInput,ScrollView,ListView,Button,ToastAndroid
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import {boxstyles} from '../Sheetstyle/cssMain'
import PubSub from 'pubsub-js'
import {Global,datastorage} from '../AgainBody/data'


export default class HomeLocal extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
        this.state = {
            data:Global,
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
                aaa.data=t_Global;
                return aaa
            })
        });
    }
    render(){
        return(
            <View>
                <View style={{height:60,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#aaa',
                flexDirection:'row',justifyContent:'center'
                }}>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.navigation.dispatch(navigateAction1);
                    }}>
                        <Image source={require('../../image/returnIcon.png')} style={{height:50,width:50,marginTop:5}} />
                    </TouchableNativeFeedback>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'#111'}}>当前城市：{this.state.data.city}</Text></View>
                    <TouchableNativeFeedback onPress={e=>{
                    this.props.navigation.dispatch(navigateAction2);
                    }}>
                        <View><Text style={{color:'#3E9CED',padding:5,lineHeight:35}}>更改城市</Text></View>
                    </TouchableNativeFeedback>
                </View>
            <Localindex screenProps={this.props.navigation} city={this.state.data.city} local={this.state.data.local}/>
                </View>
        )
    }
};

class Localindex extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
        this.state = {
            data:Global,
            oldlocal: [{local: "杭州市dfasdfasf", keyword: 'home'},
                {local: "杭州市dfasdfasf", keyword: 'company'},
                {local: "杭州市dfasdfasf", keyword: 'null'}],
            kindcss:['flex','flex','none','none'],
            oldShow:'flex',
            d_text:Global.local,
            result:this.props.local,
            btndisable:true,
            getDG:false
        }
    }
    componentDidMount () {
        datastorage.load({
            key: 'theGlobal',
            autoSync: true,
            syncInBackground: true
        }).then(ret=>{
            let t_Global=ret;
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.data=t_Global;
                aaa.oldlocal=t_Global.aaoldlocal;
                aaa.d_text=t_Global.local;
                aaa.oldShow=aaa.length>0?'flex':'none';
                return aaa
            })
        });
        this.timer=setInterval(()=>{
            if(this.state.getDG){
                this.setState((prevState, props) => {
                    let aaa=prevState;
                    aaa.kindcss[2]='none';
                    aaa.kindcss[3]='flex';
                    aaa.btndisable=false;
                    aaa.getDG=false;
                    return aaa;
                })
            }
        },3000);

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    gpsget(e){
        this.setState((prevState, props) => {
            let aaa=prevState;
            let _val1=aaa.kindcss[2];
            let _val2=aaa.kindcss[3];
            if(_val1=='none'&&_val2=='none'){
                aaa.kindcss[0]='none';
                aaa.kindcss[1]='none';
                aaa.kindcss[2]='flex';
            }else if(_val1=='none'&&_val2=='flex'){
                aaa.kindcss[2]='flex';
                aaa.kindcss[3]='none';
            }
            aaa.getDG=true;
            return aaa;
        });
    }
    getdataGPS(e){
        this.timer=setTimeout(()=>{
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.kindcss[2]='none';
                aaa.kindcss[3]='flex';
                aaa.btndisable=false;
                aaa.getDG=false;
                return aaa;
            })
        },3000);
    }
    onTIblur(e,text){
        if(text.length==0){
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.kindcss[0]='flex';
                aaa.kindcss[1]='flex';
                aaa.kindcss[2]='none';
                aaa.kindcss[3]='none';
                return aaa;
            })
        }
    }
    render(){
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <View>
                    <TouchableNativeFeedback
                        onPress={e=>{
                            this.gpsget(e);
                }}>
                        <View style={{height:55,paddingTop:10 ,flexDirection:'row',justifyContent:'center',backgroundColor:'#fff'}}>
                            <Image style={{height:35,width:35,display: this.state.kindcss[0]}} source={require('../../image/gps.png')}/>
                            <Text style={{color:'#409ad6',fontSize:18,lineHeight:30,paddingLeft:10,display:this.state.kindcss[1]}}>定位当前位置</Text>
                            <Text style={{display:this.state.kindcss[2],color:'#ddd',fontSize:18,lineHeight:30,}}>...请稍等</Text>
                            <Text style={{display:this.state.kindcss[3],lineHeight:30,fontSize:18,color:'#409ad6'}}>
                                {this.state.result}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <Button
                        disabled={this.state.btndisable}
                        title="确认"
                        onPress={(event)=>{
                        let _data=this.state.data;
                        _data.local=this.state.result;
                        ToastAndroid.showWithGravity('修改成功！', ToastAndroid.SHORT, ToastAndroid.TOP);
                        _data.aaoldlocal.push({local: this.state.result, keyword: null})
                        datastorage.save({
                            key: 'theGlobal',
                            data:_data
                        });
                        this.props.screenProps.dispatch(navigateAction1);
                        }
                        } />
                    <Text style={{fontSize:18,color:'#333',padding:10}}>手动输入：</Text>
                    <View style={{height:55,flexDirection:'row',backgroundColor:'#fff'}}>
                        <Image source={require('../../image/inputlocal.png')} style={{height:45,width:45,marginTop:10,marginLeft:5}}/>
                        <TextInput placeholder="请输入"
                                   style={{flex:1,fontSize:20,paddingLeft:10,paddingRight:10,marginTop:10}}
                                   underlineColorAndroid="transparent"
                                   defaultValue={this.state.d_text}
                                   autoCorrect={false}
                                   selectTextOnFocus={true}
                                   onChangeText={(text) =>this.setState({result:text})}
                                   onBlur={e=>{
                               this.onTIblur(e,this.state.result);
                               }}
                        />

                    </View>
                    <Button
                        title="确认"
                        onPress={(event)=>{
                        let _data=this.state.data;
                        if(this.state.result==''){
                        ToastAndroid.showWithGravity('地址不能为空！', ToastAndroid.SHORT, ToastAndroid.TOP);
                        }else{
                        _data.local=this.state.result;
                        ToastAndroid.showWithGravity('修改成功！', ToastAndroid.SHORT, ToastAndroid.TOP);
                        if(_data.aaoldlocal.includes(this.state.result)){

                        }else{
                            _data.aaoldlocal.push({local: this.state.result, keyword: null})
                        }
                        datastorage.save({
                            key: 'theGlobal',
                            data:_data
                        });
                        this.props.screenProps.dispatch(navigateAction1);
                        }
                        }} />
                    <View style={{display:this.state.oldShow,marginTop:10}}>
                    <Text style={{fontSize:18,color:'#333',padding:10}}>历史位置：</Text>
                    <Oldloaclhistroy screenProps={this.props.screenProps} localdata={this.state.oldlocal}/>
                        </View>
                </View>
            </ScrollView>
        )
    }
}
class Oldloaclhistroy extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            dataSource: ds.cloneWithRows(this.props.localdata),
        };
    }
    _renderRow(rowData){
        let _val=String(rowData.keyword);
        let img=_val=="home"?require('../../image/localhome.png'):_val=="company"?require('../../image/company.png'):require('../../image/localused.png');
        _val=_val=="home"?'住址':_val=="company"?'公司':'';
        return (
            <TouchableNativeFeedback onPress={
            (event)=>{

                Global.local=rowData.local;
                datastorage.save({
                key: 'theGlobal',
                data:Global
                });
                this.props.screenProps.dispatch(navigateAction1);
            }}>
                <View style={{height:35,flexDirection:'row',backgroundColor:'#fff',paddingLeft:10,paddingRight:10}}>
                    <Image style={{height:35,width:35}} source={img} />
                    <Text style={{fontSize:18,lineHeight:30,fontWeight:'bold',paddingLeft:5,paddingRight:10}}>{_val}</Text>
                    <Text style={{fontSize:16,lineHeight:28}}>{rowData.local}</Text>

                </View>
            </TouchableNativeFeedback>
        )

    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }
}
const navigateAction1 = NavigationActions.reset({
    index:0,
    actions:[
        NavigationActions.navigate({ routeName: 'Box'})
    ]
});
const navigateAction2 = NavigationActions.navigate({routeName: 'pHomeCitySelect'});

const styles=StyleSheet.create({
    LocalindexHeader:{
        backgroundColor:'#ccc',height:60,flexDirection:'row',justifyContent:'center',
        alignSelf:'center',width:100
    }
});