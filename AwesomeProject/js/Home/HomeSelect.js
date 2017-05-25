/**
 * Created by admin on 2017/5/12.
 */

import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,ScrollView,ListView,TextInput
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {Global,datastorage} from '../AgainBody/data'
import {SelectionOld,dataSelectstorage} from '../AgainBody/dataSelect'

export default class HomeSelect2 extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
        this.state = {
            selectKey:'',
            isSubmit:false,
            listdata:[],
        }
    }
    componentDidMount () {
        this.setState({listdata:SelectionOld.selectKey})
    }
    _renderRow(rowData){
        return (
            <View style={{padding:2,borderRadius:5,backgroundColor:'#ddd',margin:5}}>
                <Text style={{color:'#aaa'}}>{rowData}</Text>
            </View>
        )
    }
    render(){
        const changeVal=Global.selectKeyword;
        let first=changeVal;
        let fouseon=(first==''?false:true);
        if(fouseon){
            this.setState({isSubmit:true});
        }
        let isok=this.state.isSubmit?'#111':'#eee';
        let iddis=SelectionOld.selectKey.length>0?'flex':'none';
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
                        style={{backgroundColor:'#fff'}}
            >
            <View >
                <View style={styles.selectHeader}>
                    <TouchableNativeFeedback onPress={()=>{
                    if(Global.selectKeyword==''){
                    this.props.navigation.dispatch(navigateActionback)
                    }else{
                    this.props.navigation.dispatch(navigateAction1)
                    }

                    }}>
                        <View style={{height:60,width:60}} >
                            <Image style={{height:40,width:40,marginTop:10}} source={require('../../image/returnIcon.png')}/>
                        </View>
                    </TouchableNativeFeedback>
                    <TextInput placeholder="请输入"
                               style={{flex:1,fontSize:16,paddingLeft:20,paddingTop:12,borderRadius:20,height:40,backgroundColor:'#eee',marginTop:10,marginLeft:-10}}
                               underlineColorAndroid="transparent"
                               autoCorrect={false}
                               autoFocus={fouseon}
                               defaultvalue={first}
                               onSubmitEditing={()=>{
                                if(this.state.isSubmit){
                                    Global.selectKeyword=this.state.selectKey;
                                    datastorage.save({
                                    key: 'theGlobal',
                                    data:Global
                                    });
                                    this.props.navigation.dispatch(navigateAction2);
                                }else{
                                alert("搜索内容不可为空");
                                }
                            }}
                               onChangeText={(text) =>{
                               if(text.length==0){
                               this.setState({isSubmit:false});
                               }else{
                               this.setState({isSubmit:true});
                               }
                               this.setState({selectKey:text});
                            }}
                    />
                    <TouchableNativeFeedback onPress={()=>{
                    if(this.state.isSubmit){
                        Global.selectKeyword=this.state.selectKey;
                        datastorage.save({
                        key: 'theGlobal',
                        data:Global
                        });
                        this.props.navigation.dispatch(navigateAction2);
                    }else{
                    alert("搜索内容不可为空");
                    }
                    }}>
                        <View style={{height:60,width:60}} >
                            <Text style={{color:isok,fontSize:18,lineHeight:40,paddingLeft:10}}>搜索</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{padding:10,display:iddis}}>
                <View style={{flexDirection:'row',position:'relative',height:20}}>
                <Text style={{fontSize:16}}>历史记录</Text>
                    <TouchableNativeFeedback onPress={()=>{
                    SelectionOld.selectKey=[];
                    dataSelectstorage.save({
                        key: 'theSelectionOld',
                        data:SelectionOld
                        });
                    }}>
                        <Image source={require('../../image/delete.png')} style={{position:'absolute',height:20,width:20,top:0,right:0}}/>
                    </TouchableNativeFeedback>
                </View>
                    <TextBtnlistOld screenProps={this.props.navigation} value={this.state.listdata}/>
                </View>
                <Text style={{padding:10}}>快速搜索</Text>
                <View style={{borderTopColor:'#eee',borderTopWidth:1}}>
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.logo}/>
                        </View>

                    </View>
                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.logo}/>
                        </View>

                    </View>

                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.logo}/>
                        </View>

                    </View>

                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.logo}/>
                        </View>

                    </View>

                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.logo}/>
                        </View>

                    </View>

                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.logo}/>
                        </View>

                    </View>

                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.art}/>
                        </View>

                    </View>

                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.logo}/>
                        </View>

                    </View>

                </View>
                <View >
                    <View style={styles.quickbtn}>
                        <Image style={styles.quickbtnimg} source={require('../../image/KB_art1.png')}/>
                        <View style={{paddingLeft:15,flex:1}}>
                            <Text style={{fontSize:20}}>艺术绘画</Text>
                            <TextBtnlist screenProps={this.props.navigation} value={Global.art}/>
                        </View>

                    </View>

                </View>
            </View>
            </ScrollView>

        )
    }
}
class TextBtnlist extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.value),
        };
    }
    selectValKeyWord(val){
        Global.selectKeyword=val;
        datastorage.save({
            key: 'theGlobal',
            data:Global
        });
        this.props.screenProps.dispatch(navigateAction2);
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap'}}
                renderRow={(rowData) => {
                return(
                <TouchableNativeFeedback onPress={
                ()=>{
                this.selectValKeyWord(rowData);
                }
                }>
                <View style={{paddingLeft:5,marginTop:10}}><Text>{rowData}</Text></View>
                </TouchableNativeFeedback>
                )
                }}
            />
        );
    }
}

class TextBtnlistOld extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.value),
        };
    }
    selectValKeyWord(val){
        Global.selectKeyword=val;
        datastorage.save({
            key: 'theGlobal',
            data:Global
        });
        this.props.screenProps.dispatch(navigateAction2);
    }
    render() {
        return (
            <ListView
                style={{flex:1}}
                dataSource={this.state.dataSource}
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap'}}
                renderRow={(rowData) => {
                return(
                <TouchableNativeFeedback onPress={
                ()=>{
                this.selectValKeyWord(rowData);
                }
                }>
                <View style={{paddingLeft:5,marginTop:10}}><Text>{rowData}</Text></View>
                </TouchableNativeFeedback>
                )
                }}
            />
        );
    }
}
const navigateActionback = NavigationActions.back();
const navigateAction1 = NavigationActions.navigate({routeName:'Box'});
const navigateAction2 = NavigationActions.navigate({routeName:'pHomeSelectResult'});


const styles=StyleSheet.create({
    selectHeader:{
        backgroundColor:'#fff',
        height:60,
        shadowColor:'#111',
        shadowOffset:{h:2,w:0},
        shadowRadius:3,
        shadowOpacity:0.8,
        flexDirection:'row',
        position:'relative',
        marginBottom:10
    },
    quickbtn:{
        backgroundColor:'#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        flexDirection:'row',
        padding:10
    },
    quickbtnimg:{
        height:60,width:60

    }
});