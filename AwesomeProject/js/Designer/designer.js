/**
 * Created by admin on 2017/5/23.
 */
import React from 'react';
import {
    View,Text,ActivityIndicator,Image,StyleSheet,TouchableNativeFeedback,ScrollView,ListView,Dimensions
} from 'react-native';
import {dataDesignerstorage,t_Designer} from '../AgainBody/dataDesigner'
import {Global,datastorage} from '../AgainBody/data'
import { NavigationActions } from 'react-navigation'

export default class designerScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const {state}=navigation;
        const {from} = state.params;
        if(from=='auth'){
            return {
                title: `我的主页`,
                headerRight:(<TouchableNativeFeedback
                    onPress={()=>{
                this.setState({waitShow:'flex'});
            }
            }>
                    <Image source={require('../../image/moreBottom.png')} style={{height:20,width:20}} />
                </TouchableNativeFeedback>)
            }
        }else{
            return {
                title: t_Designer.CSDesigner.name
            }
        }

    };
    componentDidMount () {
        if(this.props.navigation.state.from=='designer'){
            this.setState((prevState, props) => {
                var aaa=prevState;
                aaa.waitShow='none';
                return aaa
            });
        }else{
            this.setState((prevState, props) => {
                var aaa=prevState;
                aaa.waitShow='flex';
                return aaa
            });
        }
    }
    render(){
        return(
            <ScrollView keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='never'
            >
                <View>
                    <View style={[styles.BottomList,{display:this.state.waitShow}]}>

                        <View style={{height:30,backgroundColor:'#fff',borderWidth:1,borderColor:'#111',borderRadius:5,marginBottom:5}}>
                            <TouchableNativeFeedback onPress={
               ()=>{
               this.setState({waitShow:'none'})
               }
               }>
                                <Text>取消</Text>
                            </TouchableNativeFeedback>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',borderWidth:1,borderColor:'#111',borderRadius:5,marginBottom:10}}>
                            <TouchableNativeFeedback>
                                <View style={{flexDirection:'row',justifyContent:'center',flex:1 }}>
                                    <Image source={require('../../image/noimage.png')} style={{width:50,height:50}} />
                                    <Text>微信分享</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback>
                                <View style={{flexDirection:'row',justifyContent:'center',flex:1 }}>
                                    <Image source={require('../../image/noimage.png')} style={{width:50,height:50}} />
                                    <Text>QQ分享</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback>
                                <View style={{flexDirection:'row',justifyContent:'center',flex:1 }}>
                                    <Image source={require('../../image/noimage.png')} style={{width:50,height:50}} />
                                    <Text>朋友圈分享</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback>
                                <View style={{flexDirection:'row',justifyContent:'center',flex:1 }}>
                                    <Image source={require('../../image/noimage.png')} style={{width:50,height:50}} />
                                    <Text>QQ空间分享</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <DesignerContentScreen/>
                    <DesignerWorksScreen/>
                    <Text>留言({t_Designer.CSDesigner.lastTalking.length})</Text>
                    <DesignerTalking/>
                </View>
                <DesignerFooter  />
            </ScrollView>
        )
    }
}

class DesignerContentScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:'center'}}>
                <Image source={{uri:t_Designer.CSDesigner.path}} style={{width:50,height:50}} />
                <Text>{t_Designer.CSDesigner.name}</Text>
                <Text>{t_Designer.CSDesigner.oneword}</Text>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width:20,height:20}} source={require('../../image/darklocal.png')} />
                    <Text>{t_Designer.CSDesigner.localtion}</Text>
                </View>
                <Text>{t_Designer.CSDesigner.selftext}</Text>
                <View style={{height:60,paddingLeft:30,paddingRight:30}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>{t_Designer.CSDesigner.works.length}</Text>
                        <Text>作品</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>{t_Designer.CSDesigner.liking}</Text>
                        <Text>喜欢</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>{t_Designer.CSDesigner.getFindNumber}</Text>
                        <Text>获取需求</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>{t_Designer.CSDesigner.getFindReturn}%</Text>
                        <Text>反馈率</Text>
                    </View>
                </View>
            </View>
        )
    }

}

class DesignerWorksScreen extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var lengthArray=t_Designer.CSDesigner.works.length;
        var worksArray=[];
        var footershow='flex';
        if(lengthArray>4){
            worksArray=[t_Designer.CSDesigner.works[0],
                t_Designer.CSDesigner.works[1],
                t_Designer.CSDesigner.works[2],
                t_Designer.CSDesigner.works[3]]
        }else{
            worksArray=t_Designer.CSDesigner.works;
            footershow='none';
        }
        this.state = {
            data:worksArray,
            theds:ds,
            dataSource: ds.cloneWithRows([]),
            thefootershow:footershow
        };
    }
    componentDidMount () {
        this.setState({dataSource:this.state.theds.cloneWithRows(this.state.data)})
    }
    _renderRow(rowData){
        return(
            <View>
                <TouchableNativeFeedback>
                    <Image source={{uri:rowData.path}}/>
                </TouchableNativeFeedback>
            </View>
        )
    }
    _arrayadd(){
        var dddlength=this.state.data.length;
        var newdddlength=t_Designer.CSDesigner.works.length-dddlength;
        if(newdddlength>4){
            this.setState((prevState, props) => {
                var aaa=prevState;
                for(var i=0;i<4;i++){
                    aaa.data.push(t_Designer.CSDesigner.works[dddlength+i]);
                }
                aaa.dataSource=aaa.theds.cloneWithRows(aaa.data);
                return aaa
            });
        }else{
            this.setState((prevState, props) => {
                var aaa=prevState;
                for(var i=newdddlength;i<t_Designer.CSDesigner.works.length;i++){
                    aaa.data.push(t_Designer.CSDesigner.works[i]);
                }
                aaa.dataSource=aaa.theds.cloneWithRows(aaa.data);
                aaa.thefootershow='none';
                return aaa
            })
        }

    }
    _renderFooter(){
        if(this.state.thefootershow=='none'){
            return(
                <View style={{display:'flex'}}>
                    <Text>没有更多了</Text>
                </View>
            )
        }else{
            return(
                <TouchableNativeFeedback onPress={
            this._arrayadd()
            }>
                    <View>
                        <Text>更多</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        }

    }
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap'}}
                renderRow={this._renderRow.bind(this)}
                renderFooter={this._renderFooter.bind(this)}
            />
        )}
}


class DesignerTalking extends React.Component{

    render(){
        return(
            <View style={{flex:1,justifyContent:'center'}}>
                <Image source={{uri:t_Designer.CSDesigner.path}} style={{width:50,height:50}} />
                <Text>{t_Designer.CSDesigner.name}</Text>
                <Text>{t_Designer.CSDesigner.oneword}</Text>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width:20,height:20}} source={require('../../image/darklocal.png')} />
                    <Text>{t_Designer.CSDesigner.localtion}</Text>
                </View>
                <Text>{t_Designer.CSDesigner.selftext}</Text>
            </View>
        )
    }

}

let width=Dimensions.get('window').width;
class DesignerFooter extends React.Component{
    constructor(props) {
        super(props);
        this.setState({showfooter:'flex',LeftBtnList:'flex',RightBtnList:'none'})
    }
    componentDidMount () {
        if(t_Designer.CSDesigner.name==Global.username){
            this.setState({showfooter:'none'})
        }else{
            this.setState({showfooter:'flex'})
        }
    }
    render(){
        return(
            <View style={{display:this.state.showfooter,position:'absolute',height:50,bottom:0,left:0,right:0,backgroundColor:'red'}}>

                <View style={{height:50,width:width,flexDirection:'row',display:this.state.LeftBtnList}}>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab'}}
                    ><Text>电话</Text></View>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab',borderColor:'#aaa',borderLeftWidth:1,borderRightWidth:1}}
                    ><Text>私信</Text></View>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab'}}
                    ><Text>发需求</Text></View>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab'}}
                    ><Text>约见</Text></View>
                    <TouchableNativeFeedback onPress={()=>{
                    this.setState({LeftBtnList:'none',RightBtnList:'flex'})
                    }}>
                        <View style={{width:70,height:50,justifyContent:'center'}}
                        ><Image source={require('../../image/returnIcon.png')} style={{height:50,width:50}} /></View>
                    </TouchableNativeFeedback>
                </View>

                <View style={{height:50,width:width,flexDirection:'row',display:this.state.RightBtnList}}>
                    <TouchableNativeFeedback onPress={()=>{
                    this.setState({LeftBtnList:'flex',RightBtnList:'none'})
                    }}>
                        <View style={{width:70,height:50,justifyContent:'center'}}
                        ><Image source={require('../../image/returnIcon.png')} style={{height:50,width:50}} /></View>
                    </TouchableNativeFeedback>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab'}}
                    ><Text>喜欢</Text></View>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab',borderColor:'#aaa',borderLeftWidth:1,borderRightWidth:1}}
                    ><Text>收藏</Text></View>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab'}}
                    ><Text>留言</Text></View>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'#2068ab'}}
                    ><Text>添加到通讯录</Text></View>
                </View>

            </View>
        )}}

const styles=StyleSheet.create({
    BottomList:{
        position:'absolute',
        top:0,left:0,right:0,bottom:0,
        backgroundColor:'rgba(0,0,0,0.8)',
        padding:10,
        justifyContent:'flex-end'
    }
});