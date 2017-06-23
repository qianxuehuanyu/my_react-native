/**
 * Created by admin on 2017/5/12.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,TextInput,ScrollView,Picker,ListView,ActivityIndicator,Alert
} from 'react-native';
import {Global,datastorage} from '../../js/AgainBody/data'
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button'
import { NavigationActions } from 'react-navigation'

export default class HomeAuth extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `设计师认证`,
            headerRight:(<TouchableNativeFeedback
                onPress={()=>{
                setTimeout(function() {
                  navigation.dispatch(navigateActionSubmit)
                },1000);
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>提交</Text>
            </TouchableNativeFeedback>)
        }
    };
    constructor(props) {
        super(props);

        this.state = {
            refresh:1,
            waitShow:'none',
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
                return aaa
            })
        });

    }
    _touxiang(e){
        this.setState({refresh:1});
    }
    render(){
        let imgpath;
        if(this.state.data.auth.path==''){
            imgpath=require('../../image/self.png');
        }else if(this.state.data.auth.path.indexOf('http')>-1){
            imgpath={uri:this.state.data.auth.path};
        }else{
            imgpath=require(this.state.data.auth.path);
        }
        let kindValue=this.state.data.auth.kind==''?null:this.state.data.auth.kind;
        let nameValue=this.state.data.auth.showname==''?null:this.state.data.auth.showname;
        let sexValue=this.state.data.auth.sex==''?null:this.state.data.auth.sex;
        console.log(imgpath,this.state.data.auth.path);
        if(this.state.data.auth.is_auth==1){
            Alert.alert(
                '提示：',
                '已成功认证设计师',
                [
                    {text: '修改资料', onPress: () => {},style: 'cancel'},
                    {text: '前往查看', onPress: () => {this.props.dispatch(navigateAction5)}},
                    {text: '返回首页', onPress: () => {this.props.dispatch(navigateActionReturn)}},
                ]
            )
        }
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >

                <View style={{flex:1}}>
                    <Text style={{paddingLeft:10}}>选择头像:</Text>
                    <TouchableNativeFeedback
                        onPress={this._touxiang.bind(this)}
                    >
                        <View style={{width:50,height:50,margin:10,borderRadius:25,backgroundColor:'#fff',alignSelf:'center',overflow:'hidden'}}>
                            <Image source={imgpath} style={{width:50,height:50,borderRadius:20}}/>
                        </View></TouchableNativeFeedback>
                    <Text style={{paddingLeft:10}}>入驻类型：</Text>
                    <View style={{height:30,paddingLeft:20,paddingRight:10}}>
                        <RadioGroup
                            selectedIndex={kindValue}
                            style={{flexDirection:'row',justifyContent:'space-between'}}
                            onSelect ={(index,value)=>{
                            let _data=this.state.data;
                        _data.auth.type=value;
                        datastorage.save({
                        key:'theGlobal',
                        data:_data,
                        expires:null
                    })}}>
                            <RadioButton value={1}>
                                <Text>个人</Text>
                            </RadioButton>

                            <RadioButton value={2} >
                                <Text>工作室/团队/机构</Text>
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    <Text style={{paddingTop:10,paddingLeft:10}}>基本信息：</Text>
                    <View style={{borderWidth:1,borderColor:'#aaa',backgroundColor:'#ffffff',padding:10,margin:10,borderRadius:5}}>
                        <View style={{height:30,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>昵称：</Text>
                            <TextInput placeholder="请输入"
                                       style={{flex:1,fontSize:16,padding:0,justifyContent:'center'}}
                                       underlineColorAndroid="transparent"
                                       defaultValue={nameValue}
                                       autoCorrect={false}
                                       selectTextOnFocus={true}
                                       onChangeText={(text) =>{
                                       let _data=this.state.data;
                                        _data.auth.type=text;
                                        datastorage.save({
                                        key:'theGlobal',
                                        data:_data,expires:null
                        })}}
                            />
                        </View>
                        <View style={{height:35,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>性别：</Text>
                            <RadioGroup
                                selectedIndex={sexValue}
                                style={{flexDirection:'row',justifyContent:'center'}}
                                onSelect ={(index,value)=>{
                            let _data=this.state.data;
                            _data.auth.sex=value;
                            datastorage.save({
                            key:'theGlobal',
                            data:_data,expires:null
                            })}}>
                                <RadioButton value={1} style={{marginLeft:30}}>
                                    <Text style={{fontSize:16,color:'#111'}}>男</Text>
                                </RadioButton>

                                <RadioButton value={2} style={{marginLeft:20}} >
                                    <Text style={{fontSize:16,color:'#111'}}>女</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                        <View style={{height:35,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>工作经验：</Text>
                            <Picker
                                selectedValue={this.state.data.auth.experience}
                                style={{flex:1}}
                                prompt='请选择：'
                                onValueChange={(itemValue,itemPosition) => {
                        let _data=this.state.data;
                        _data.auth.experience=itemValue;
                        datastorage.save({
                        key:'theGlobal',
                        data:_data,expires:null
                        });
                        this.setState({refresh:1})
                    }}>
                                <Picker.Item label="1年以下" value="1"  />
                                <Picker.Item label="1-3年" value="3"  />
                                <Picker.Item label="3-5年" value="5"  />
                                <Picker.Item label="5-10年" value="7"  />
                                <Picker.Item label="10年以上" value="10"  />
                            </Picker>
                        </View>
                        <View style={{height:30,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>最高学历：</Text>
                            <Picker
                                selectedValue={this.state.data.auth.education}
                                style={{flex:1}}
                                prompt='请选择：'
                                onValueChange={(itemValue,itemPosition) => {
                                let _data=this.state.data;
                                _data.auth.education=itemValue;
                                datastorage.save({
                                key:'theGlobal',
                                data:_data,expires:null
                                });
                        this.setState({refresh:1})
                    }}>
                                <Picker.Item label="本科" value="本科"  />
                                <Picker.Item label="硕士" value="硕士"  />
                                <Picker.Item label="博士" value="博士"  />
                                <Picker.Item label="专科" value="专科"  />
                                <Picker.Item label="高中" value="高中"  />
                            </Picker>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{paddingLeft:10}}>擅长/专精：</Text>
                    <View style={{borderWidth:1,borderColor:'#aaa',backgroundColor:'#ffffff',padding:10,margin:10,borderRadius:5,flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Shanchanglingyu value={this.state.data.auth.skill}/>
                        </View>
                        <TouchableNativeFeedback onPress={()=>{
                    this.props.navigation.dispatch(navigateAction1);
                    }}>
                            <View style={{width:50,height:50,alignSelf:'center',borderColor:'#0366d6',borderWidth:1,borderRadius:5}}>
                                <Text style={{fontSize:16,lineHeight:33,alignSelf:'center',color:'#0366d6'}}>修改</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{paddingLeft:10,flexWrap: 'wrap'}}>上传作品：</Text>
                    </View>
                    <View>
                        <Text style={{paddingLeft:10,flexWrap: 'wrap',color:'red'}}>（需要6个或以上的通过审核的作品才能通过设计师认证,此处作品上传仅限图片,本客户端的修改功能暂未开通,如需修改请登录PC网页版客户端进行操作）</Text>
                    </View>
                    <Shangchuanzuopin value={this.state.data.auth.works}/>
                    <View>
                        <TouchableNativeFeedback onPress={()=>{
                    this.props.navigation.dispatch(navigateAction2);
                    }}>
                            <Image source={require('../../image/more.png')}/>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
class Shanchanglingyu extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let listvalue=['暂无'];
        if(this.props.value.length>0){
            listvalue=this.props.value;
        }
        this.state = {
            dataSource: ds.cloneWithRows(listvalue),
        };
    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap'}}
                renderRow={(rowData) => {
                return(
                <View style={{paddingLeft:5,marginTop:10}}><Text>{rowData}</Text></View>
                )
                }}
            />
        )
    }
}
class Shangchuanzuopin extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let listvalue=['暂无'];
        if(this.props.value.length>0){
            listvalue=this.props.value;
        }
        this.state = {
            dataSource: ds.cloneWithRows(listvalue),
        };
    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap'}}
                renderRow={(rowData) => {
                return(
                <View style={{paddingLeft:5,marginTop:10}}><Text>{rowData}</Text></View>
                )
                }}
            />
        )
    }
}
const navigateActionReturn=NavigationActions.back();
const navigateAction1 = NavigationActions.navigate({routeName: 'pHomeAuthSkill'});
const navigateActionSubmit = NavigationActions.navigate({routeName: 'pHomeAuthWait'});
const navigateAction2 = NavigationActions.navigate({routeName: 'Show'});
const navigateAction5 = NavigationActions.navigate({routeName: 'Designer',params:{username:Global.username,from:'auth'}}
);


