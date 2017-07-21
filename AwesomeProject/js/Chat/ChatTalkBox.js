import React from 'react';
import {
    Text,View,ListView,TouchableNativeFeedback,ScrollView,Image,ActivityIndicator,Alert,
    TextInput,ToastAndroid
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {Global,datastorage} from '../AgainBody/data'


export default class TalkBoxScreen extends  React.Component {
    constructor(props) {
        super(props);
        var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            talkListShow:'flex',
            talkListData:this.props.value,
            dataSource:ds.cloneWithRows([]),
            talkListBottom:'close',
            talkInputBoxdefualt:'',
            islogin:false,
            username:'',
            callBackWord:'',
            submitKey:false,
            id:this.props.id,
            userLoign:this.props.userLoign,
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
                    this.callBackSomeone(e,rowData.sender)
                }}
            ><Text style={{color:'#3E9CED'}} >{rowData.sender}</Text></TouchableNativeFeedback>
        }
        if(_to==_name){
            _to=<Text>我</Text>
        }else{
            _to=<TouchableNativeFeedback
                onPress={e=>{
                    this.callBackSomeone(e,rowData.to)
                }}
            ><Text style={{color:'#3E9CED'}}>{rowData.to}</Text></TouchableNativeFeedback>
        }

        if(this.state.islogin){
            return(
                <View>
                    {_sender}
                    <Text>回复</Text>
                    {_to}
                    <TouchableNativeFeedback onPress={e=>{
                        this.changeDefualt(e,rowData.sender);
                        }}>
                        <Text>：{rowData.text}</Text>
                    </TouchableNativeFeedback>
                </View>
            )
        }else{
            return(
                <View>
                    {_sender}
                    <Text>回复</Text>
                    {_to}

                    <Text>：{rowData.text}</Text>
                </View>
            )
        }
    }
    _renderHeader(){
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
                renderRow={this._renderRow.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
            />
        )
    }
}
