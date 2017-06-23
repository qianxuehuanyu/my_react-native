/**
 * Created by admin on 2017/5/26.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,ScrollView,ListView,TextInput,ToastAndroid
} from 'react-native';
import Checkbox from 'react-native-custom-checkbox';
import {Global,datastorage} from '../AgainBody/data'
import { NavigationActions } from 'react-navigation'
let listV=require('../AgainBody/skill_data.json');

export default class HomeAuthSkillScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `擅长/专精`,
            headerRight:(<TouchableNativeFeedback
                onPress={()=>{
             navigation.dispatch(navigateAction1)
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>确定</Text>
            </TouchableNativeFeedback>)
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            refresh:1,
            waitShow:'none',
            dataAuth:Global,
            addWord:''
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
                aaa.dataAuth=t_Global;
                return aaa
            })
        });
    }
    _onTextSubmit(){
        let aaa=this.state.addWord;
        let _data=this.state.dataAuth;
        if(aaa!=undefined&&aaa!=''){
            _data.auth.skill.push(aaa);
            datastorage.save({
                key:'theGlobal',
                data:_data,expires:null
            });
            this.state.theInput.clear();
            ToastAndroid.show('添加成功！',ToastAndroid.SHORT,ToastAndroid.CENTER);
            this.setState({addWord:''})
        }else{
            ToastAndroid.show('添加的擅长技能不能为空！',ToastAndroid.SHORT,ToastAndroid.CENTER)
        }
    }
    render(){
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <View>
                    <Checkbox checked={true}/>
                    <Text>类型选择</Text>
                </View>
                <View>
                    <Text>手动输入：</Text>
                    <TextInput
                        ref={textInput => (this.theInput = textInput)}
                        placeholder="请输入"
                        style={{flex:1,fontSize:16,padding:0,justifyContent:'center'}}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        selectTextOnFocus={true}
                        onChangeText={(text) =>{
                        this.setState({addWord:text});
                        }}
                        onSubmitEditing={
                            this._onTextSubmit.bind(this)
                        }
                    />
                    <TouchableNativeFeedback onPress={this._onTextSubmit.bind(this)}>
                        <Text style={styles.blueBtn}>添加</Text>
                    </TouchableNativeFeedback>
                </View>
                <hasSkillList value={this.state.dataAuth.auth.skill} />
                <SkillList value={listV.skill} />
            </ScrollView>
        )
    }
}

class hasSkillList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.value),
        };
    }
    _renderRow(rowData){
        return(
            <View style={{borderRadius:2,borderWidth:1,borderColor:'#eee',alignItems:'center',}}>
                <Text style={{color:'#111'}}>{rowData}</Text>
                <Text style={{color:'#eee'}}>|</Text>
                <Text style={{color:'#111'}}>x</Text>

            </View>
        )
    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap'}}
                renderHeader={()=>{
                let listvalue='暂无';
                if(this.props.value.length>0){
                    listvalue='已添加:';
                }
                return(
                <View>
                <Text>{listvalue}</Text>
                </View>
                )}}
                renderRow={this._renderRow.bind(this)}
            />
        )
    }
}
class SkillList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.value),
        };
    }

    _renderRow(rowData){
        let aaa=rowData.data;
        let bbb=rowData.keyword;
        return(
            <View>
                <Text style={{color:'#3e9dee',fontSize:16,fontWeight:'bold'}}>{aaa}</Text>
                <View style={{borderBottomWidth:1,borderBottomColor:'#eee'}}>
                    <SkillContentList value={bbb}/>
                </View>
            </View>
        )
    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                style={{padding:5}}
                renderRow={this._renderRow.bind(this)}
            />
        )
    }
}
class SkillContentList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.value),
            dataSkill:Global
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
                aaa.dataSkill=t_Global;
                return aaa
            })
        });
    }
    _myFunction(name,checked){
        if(checked){
            let _data=this.state.dataSkill;
            let choosed=_data.auth.skill;
            choosed=choosed.filter(x=>x!=name);
            _data.auth.skill=choosed;
            datastorage.save({
                key:'theGlobal',
                data:_data,expires:null
            })
        }else{
            let _data=this.state.dataSkill;
            let choosed=_data.auth.skill;
            choosed.push(name);
            _data.auth.skill=choosed;
            datastorage.save({
                key:'theGlobal',
                data:_data,expires:null
            })
        }
    }
    _renderRow(rowData){
        let choosed=this.state.dataSkill.auth.skill;
        let checked=false;
        if(choosed.indexOf(rowData)>-1){
            checked=true;
        }
        return(
            <View>
                <View>
                    <Checkbox checked={checked}  style={styles.checkboxstyle} name={rowData}
                              onChange={(name, checked) => this._myFunction(name, checked).bind(this)}/>/>
                    <Text>{rowData}</Text>
                </View>
            </View>
        )
    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap'}}
                renderRow={this._renderRow.bind(this)}
            />
        )
    }
}
const styles=StyleSheet.create({
    checkboxstyle:{},
    blueBtn:{
        backgroundColor:'#3e9dee',
        color:'#fff',
        borderWidth:1,borderColor:'#eee',
        borderRadius:2,
        fontSize:16,lineHeight:20,paddingLeft:5,paddingRight:5
    }
});
const navigateAction1 = NavigationActions.reset({
    index: 1,
    actions: [
        NavigationActions.navigate({ routeName: 'Box'}),
        NavigationActions.navigate({ routeName: 'pHomeAuth'})
    ]});
