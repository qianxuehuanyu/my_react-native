/**
 * Created by admin on 2017/5/12.
 */

import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,ScrollView,ListView,ToastAndroid
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {Global,datastorage} from '../AgainBody/data'


export default class HomeKind extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `内容定制`,
            headerRight:(<TouchableNativeFeedback
                onPress={()=>{
                setTimeout(function() {
                  navigation.dispatch(navigateActionSubmit)
                },1000);
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>完成</Text>
            </TouchableNativeFeedback>)
        }
    };
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var _data=Global.selectbtns;
        this.state = {
            data:Global,
            selectbtns:_data,
            dataSource:ds.cloneWithRows(_data)
        };
    }
    componentDidMount() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        datastorage.load({
            key: 'theGlobal',
            autoSync: true,
            syncInBackground: true,
        }).then(ret=>{
            let t_Global=ret;
            this.setState((prevState, props) => {
                let aaa=prevState;
                aaa.data=t_Global;
                aaa.selectbtns=t_Global.selectbtns;
                aaa.dataSource=ds.cloneWithRows(t_Global.selectbtns);
                return aaa
            })
        });
    }
    onbtnsPress(e,keyValue){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState((prevState, props) => {
            let aaa=prevState;
            let _val=aaa.selectbtns[keyValue][3];
            if(_val==2){
                aaa.selectbtns[keyValue][3]=1;
            }else{
                aaa.selectbtns[keyValue][3]=2;
            }
            aaa.data.selectbtns=aaa.selectbtns;
            aaa.dataSource=ds.cloneWithRows(aaa.selectbtns);
            datastorage.save({
                key:'theGlobal',
                data:aaa.data
            });
            return aaa;
        });
    };
    _renderRow(rowData,index,rowID){
        var _index=parseInt(String(rowID));
        return(
            <TouchableNativeFeedback onPress={e=>{this.onbtnsPress(e,_index);}}>
                <View style={styles.headerbtns}>
                    <Image source={rowData[rowData[3]]} style={styles.btnlistimg}/>
                    <Text style={styles.btnlisttext}>{rowData[0]}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
    render(){
        let _text='本项主要涉及。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。';

        if(_text.length>30){
            let _text1=_text.split('',30);
            _text=[_text1.join(''),'flex'];
        }else{
            let _text2=_text.split('');
            _text=[_text2.join(''),'none'];
        }
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <View>
                    <Text>类别：</Text>
                    <View style={{paddingLeft:10,paddingRight:10,marginTop:5}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap',justifyContent:'flex-start'}}
                            renderRow={this._renderRow.bind(this)}
                        />
                    </View>
                </View>
                <View style={{padding:10}}>
                    <Text>介绍：</Text>
                    <View>
                        <Text style={{color:'#3e9dee',fontSize:18,fontWeight:'bold',marginBottom:4}}>艺术绘画</Text>
                        <Text>{_text[0]}</Text>
                        <TouchableNativeFeedback>
                            <Text style={{color:'#3e9dee',display:_text[1]}}> >>详细 </Text>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const navigateActionSubmit = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Box'})
    ]});

const styles=StyleSheet.create({
    headerbtns:{
        justifyContent: 'center',width:80,height:80
    },
    btnlistimg:{
        width:50,height:50,alignSelf:'center'
    },
    btnlisttext:{
        color:'#777',alignSelf:'center'
    },
    btnlistkind:{
        position:'absolute',backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:50,paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,
        top:5.5,zIndex:1000
    },
});