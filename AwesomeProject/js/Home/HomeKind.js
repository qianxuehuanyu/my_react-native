/**
 * Created by admin on 2017/5/12.
 */

import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,ScrollView,ListView
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
        var data=Global.selectbtns;
        this.state = {
            selectbtns:data,
            dataSource:ds.cloneWithRows(data)
        };
    }
    onbtnsPress(keyValue){
        this.setState((prevState, props) => {
            let aaa=prevState;
            let _val=aaa.selectbtns[keyValue][3];
            if(_val==2){
                aaa.selectbtns[keyValue][3]=1;
            }else{
                aaa.selectbtns[keyValue][3]=2;
            }
            datastorage.save({
                key:'theGlobal',
                data:Global
            });
            return aaa;
        });
    };
    _renderRow(rowData,index,rowID){
        var _index=parseInt(String(rowID));
        return(
            <TouchableNativeFeedback onPress={()=>{this.onbtnsPress(_index);}}>
                <View style={styles.headerbtns}>
                    <Image source={this.state.selectbtns[_index][this.state.selectbtns[_index][3]]} style={styles.btnlistimg}/>
                    <Text style={styles.btnlisttext}>{this.state.selectbtns[_index][0]}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
    render(){
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <View>
                    <Text>类型选择</Text>
                    <View style={{paddingLeft:10,paddingRight:10,marginTop:5}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap',justifyContent:'flex-start'}}
                            renderRow={this._renderRow.bind(this)}
                        />
                    </View>
                </View>
                <View>
                    <Text>123</Text>
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