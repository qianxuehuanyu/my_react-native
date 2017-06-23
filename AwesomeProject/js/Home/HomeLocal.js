/**
 * Created by admin on 2017/5/12.
 */
/**
 * Created by admin on 2017/5/12.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,TouchableOpacity,TextInput,ScrollView,ListView
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
    render(){
        const {state, setParams} = this.props.navigation;
        const {city,local} = state.params;
        const {navigate} = this.props.navigation;
        return(
            <View>
                <View style={{height:60,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#111',
                flexDirection:'row',justifyContent:'center'
                }}>
                    <Image source={require('../../image/returnIcon.png')} style={{height:50,width:50}} />
                    <View style={{flex:1}}>
                        <Text>{this.state.city}</Text></View>
                    <View><Text>更改城市</Text></View>

                </View>
            <Localindex screenProps={this.props.navigation} city={city} local={local}/>
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
            incity: props.city,
            oldlocal: [{local: "杭州市dfasdfasf", keyword: 'home'},
                {local: "杭州市dfasdfasf", keyword: 'company'},
                {local: "杭州市dfasdfasf", keyword: 'null'}],
            kindcss:['flex','flex','none','none'],
            result:props.local
        }
    }
    gpsget(){
        let keyword=undefined;
        this.setState((prevState, props) => {
            let aaa=prevState;
            let _val1=aaa.kindcss[2];
            let _val2=aaa.kindcss[3];
            if(_val1=='none'&&_val2=='none'){
                aaa.kindcss[0]='none';
                aaa.kindcss[1]='none';
                aaa.kindcss[2]='flex';
                keyword='wait';
            }else if(_val1=='none'&&_val2=='flex'){
                keyword='again';
                aaa.kindcss[2]='flex';
                aaa.kindcss[3]='none';
            }
            return aaa;
        });
    }
    getdataGPS(){
        setTimeout(()=>{
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.kindcss[2]='none';
                aaa.kindcss[3]='flex';
                return aaa;
            })
        },3000)
    }
    onTIblur(text){
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
        let aaa=this.state.oldlocal;
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <View>
                    <TouchableNativeFeedback onPress={()=>{
                this.gpsget();this.getdataGPS();
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
                    <Text style={{fontSize:18,color:'#333',padding:10}}>手动输入：</Text>
                    <View style={{height:55,flexDirection:'row',backgroundColor:'#fff'}}>
                        <Image source={require('../../image/inputlocal.png')} style={{height:45,width:45,marginTop:10,marginLeft:5}}/>
                        <TextInput placeholder="请输入"
                                   style={{flex:1,fontSize:20,paddingLeft:10,paddingRight:10,marginTop:10}}
                                   underlineColorAndroid="transparent"
                                   defaultValue={this.state.result}
                                   autoCorrect={false}
                                   selectTextOnFocus={true}
                                   onChangeText={(text) =>this.setState({result:text})}
                                   onBlur={()=>{
                               this.onTIblur(this.state.result);
                               }}
                        />
                    </View>
                    <Text style={{fontSize:18,color:'#333',padding:10}}>历史位置：</Text>
                    <Oldloaclhistroy localdata={aaa} screenProps={this.props.screenProps}/>
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
            dataSource: ds.cloneWithRows(Global.aaoldlocal),
        };
    }
    _renderRow(rowData){
        let _val=String(rowData.keyword);
        let img=_val=="home"?require('../../image/localhome.png'):_val=="company"?require('../../image/company.png'):require('../../image/localused.png');
        _val=_val=="home"?'住址':_val=="company"?'公司':'';
        return (
            <TouchableNativeFeedback onPress={
            ()=>{
            this.props.screenProps.dispatch(navigateAction1);
            Global.local=rowData.local;
            datastorage.save({
                        key: 'theGlobal',
                        data:Global
                        });
            }
            }>
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
const navigateAction1 = NavigationActions.back({key:null});
const navigateAction2 = NavigationActions.navigate({routeName: 'pHomeCitySelect'});

const styles=StyleSheet.create({
    LocalindexHeader:{
        backgroundColor:'#ccc',height:60,flexDirection:'row',justifyContent:'center',
        alignSelf:'center',width:100
    }
});