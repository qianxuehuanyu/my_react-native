/**
 * Created by admin on 2017/5/26.
 */
import React from 'react';
import {
    Text,View,StyleSheet,Image,TouchableNativeFeedback,ScrollView,ListView,TextInput,ToastAndroid,Dimensions
} from 'react-native';
import CheckBox from 'react-native-check-box'
import {Global,datastorage} from '../AgainBody/data'
import { NavigationActions } from 'react-navigation'
let listV=require('../AgainBody/skill_data.json');

export default class HomeAuthSkillScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `擅长/专精`,
            headerRight:(<TouchableNativeFeedback
                onPress={e=>{

             navigation.dispatch(navigateAction1);
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
            addWord:'',
        }
    }
    render(){
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <SkillList value={listV.skill} />
            </ScrollView>
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
            <View style={{marginBottom:4}}>
                <Text style={{color:'#3e9dee',fontSize:18,fontWeight:'bold',marginBottom:4}}>{bbb}</Text>
                <View style={{borderBottomWidth:1,borderBottomColor:'#eee'}}>
                    <SkillContentList value={aaa}/>
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
let aaaa=[];
class SkillContentList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSkill:Global,
            btnsData:this.props.value,
            dataSource: ds.cloneWithRows([]),
            chockBoxData:''
        };
    }
    componentDidMount () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var _this=this;
        datastorage.load({
            key: 'theGlobal',
            autoSync: true,
            syncInBackground: true,
        }).then(ret=>{
            let t_Global=ret;
            let _btnsData=this.state.btnsData;
            let _skill=t_Global.auth.skill;
            for(var i=0;i<_skill.length;i++){
                for(var j=0;j<_btnsData.length;j++){
                 if(_skill[i]==_btnsData[j].text){
                     _btnsData[j].checked=true;
                 }
                }
            }
            _this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.dataSkill=t_Global;
                aaa.btnsData=_btnsData;
                aaa.dataSource=ds.cloneWithRows(_btnsData);
                return aaa
            })
        });

    }
    _myFunction(e,name,index,id){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let choosed=this.state.dataSkill.auth.skill;
        if(choosed.includes(name)){
            let _data=this.state.dataSkill;
            let _choosed=_data.auth.skill;
            _choosed=choosed.filter(x=>x!=name);
            _data.auth.skill=_choosed;
            datastorage.save({
                key:'theGlobal',
                data:_data,expires:null
            });
            let _btnsData=this.state.btnsData;
            _btnsData[id].checked=false;
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.btnsData=_btnsData;
                aaa.dataSource=ds.cloneWithRows(_btnsData);
                return aaa
            });
        }else{
            let _data=this.state.dataSkill;
            let _choosed=_data.auth.skill;
            _choosed.push(name);
            _data.auth.skill=_choosed;
            datastorage.save({
                key:'theGlobal',
                data:_data,expires:null
            });
            let _btnsData=this.state.btnsData;
            _btnsData[id].checked=true;
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.btnsData=_btnsData;
                aaa.dataSource=ds.cloneWithRows(_btnsData);
                return aaa
            });
        }

    }
    _renderRow(rowData,index,rowID){
        let _width=Dimensions.get('window').width;
        return(
            <View style={{width:(_width-10)/3}}>
                <CheckBox
                    isChecked={rowData.checked}
                    onClick={e=>this._myFunction(e,rowData.text,index,rowID)}
                    rightText={rowData.text}
                    rightTextStyle={{lineHeight:20}}
                    checkedImage={<Image source={require('../../image/ic_check_box_blue.png')} />}
                    unCheckedImage={<Image source={require('../../image/ic_check_box_outline_blue.png')} />}
                />
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
