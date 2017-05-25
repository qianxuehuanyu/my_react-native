/**
 * Created by admin on 2017/5/12.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,TextInput,ScrollView,Picker
} from 'react-native';
import {Global,datastorage} from '../../js/AgainBody/data'
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button'

export default class HomeAuth extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `认证设计师`,
            headerRight:(<TouchableNativeFeedback
                onPress={()=>{
             //navigation.dispatch(navigateActionSubmit)
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>{Global.auth.submitResult}</Text>
            </TouchableNativeFeedback>)
        }
    };
    constructor(props) {
        super(props);
        let theExperienceValue=Global.auth.experience==''?'请选择':Global.auth.experience<=1?1:Global.auth.experience<=3?3:Global.auth.experience<=5?5:Global.auth.experience<10?7:10;
        this.state = {
            theExperienceValue:theExperienceValue,
        }
    }
    render(){
        let imgpath=Global.auth.path==''?require('../../image/self.png'):{uri:Global.auth.path};
        let kindValue=Global.auth.kind==''?null:Global.auth.kind;
        let nameValue=Global.auth.showname==''?null:Global.auth.showname;
        let sexValue=Global.auth.sex==''?null:Global.auth.sex;
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
            <View style={{flex:1}}>
                <View style={{width:50,height:50,margin:10,borderRadius:25,backgroundColor:'#fff',alignSelf:'center',overflow:'hidden'}}>
                    <Image source={imgpath} style={{width:50,height:50,borderRadius:20}}/>
                </View>
                <View style={{height:30,paddingLeft:20,paddingRight:10}}>
                    <RadioGroup
                        selectedIndex={kindValue}
                        style={{flexDirection:'row',justifyContent:'space-between'}}
                        onSelect ={(index,value)=>{
                    Global.auth.type=value;
                    datastorage.save({
                    key:'theGlobal',
                    data:Global
                    })}}>
                        <RadioButton value={1}>
                            <Text>个人</Text>
                        </RadioButton>

                        <RadioButton value={2} >
                            <Text>工作室/团队/机构</Text>
                        </RadioButton>
                    </RadioGroup>
                </View>
                <View style={{borderWidth:1,borderColor:'#aaa',padding:10,margin:10,borderRadius:5}}>
                <View style={{height:30,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>昵称：</Text>
                    <TextInput placeholder="请输入"
                                               style={{flex:1,fontSize:16,padding:0}}
                                               underlineColorAndroid="transparent"
                                               defaultValue={nameValue}
                                               autoCorrect={false}
                                               selectTextOnFocus={true}
                                               onChangeText={(text) =>{
                                                Global.auth.type=text;
                                                datastorage.save({
                                                key:'theGlobal',
                                                data:Global
                                                })}}
                />
                </View>
                <View style={{height:30,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>性别：</Text>
                    <RadioGroup
                        selectedIndex={sexValue}
                        style={{flexDirection:'row',justifyContent:'space-between'}}
                        onSelect ={(index,value)=>{
                    Global.auth.sex=value;
                    datastorage.save({
                    key:'theGlobal',
                    data:Global
                    })}}>
                        <RadioButton value={1}>
                            <Text>男</Text>
                        </RadioButton>

                        <RadioButton value={2} >
                            <Text>女</Text>
                        </RadioButton>
                    </RadioGroup>
                </View>
                <View style={{height:30,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>工作经验：</Text>
                    <Picker
                        selectedValue={this.state.theExperienceValue}
                        style={{flex:1}}
                        prompt='请选择：'
                        onValueChange={(index,value) => {
                        this.setState({theExperienceValue:value});
                        Global.auth.experience=value;
                        datastorage.save({
                        key:'theGlobal',
                        data:Global
                    })}}>
                        <Picker.Item label="1年以下" value={1} />
                        <Picker.Item label="1-3年" value={3} />
                        <Picker.Item label="3-5年" value={5} />
                        <Picker.Item label="5-10年" value={7} />
                        <Picker.Item label="10年以上" value={10} />
                    </Picker>
                </View>
                </View>
            </View>
            </ScrollView>
        )
    }
}