/**
 * Created by admin on 2017/5/8.
 */
import React from 'react';
import {
    Text,View,StyleSheet,Image,TouchableNativeFeedback,Button,TouchableHighlight
} from 'react-native';
import {SimpleApp} from '../AgainBody/navigator';
import PubSub from 'pubsub-js'
import { NavigationActions } from 'react-navigation'

export default class Main extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        return (
            <View style={{flex:1,position:'relative'}}>
                <View style={{flex:1,position:'relative'}}>
                    <SimpleApp style={{flex:1}} screenProps={this.props.navigation} />
                </View>

                <View style={{position:'absolute',bottom:0,width:70,height:50,alignSelf:'center',paddingLeft:10,paddingRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
                    <More/>
                </View>
                <MoreBox navigation={this.props.navigation}/>
            </View>
        )}
}
class MoreBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = { selection: 0 };
    }
    componentDidMount () {
        this.pubsub_token = PubSub.subscribe('products', function (topic, product) {
            this.setState((prevState, props) => {
                return {selection: prevState.selection+product};
            });
        }.bind(this));
    };
    componentWillUnmount () {
        PubSub.unsubscribe(this.pubsub_token);
    };
    render() {
        let _dis=this.state.selection;
        return (
            <View style={[{bottom:50,position:'absolute',right:0,top:0,left:0,backgroundColor:'rgba(0,0,0,0.4)',flex:1,justifyContent:'flex-end'},{display:_dis%2==1?'flex':'none'}]}>
                <View style={{flex:1}}>
                    <TouchableNativeFeedback onPress={()=>{
                        PubSub.publish('products', 1);}}>
                        <View style={{flex:1}}>

                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{height:280}}>
                    <View style={{height:270,borderRadius:5,overflow:'hidden',backgroundColor:'#fff'}}>
                    <TouchableNativeFeedback onPress={()=>{
                this.props.navigation.dispatch(navigateAction1);
                PubSub.publish('products', 1);
                }}>
                        <View style={[styles.morebtn,{borderBottomWidth:1,borderBottomColor:'#eee'}]}>
                            <Image source={require('../../image/find.png')}
                                   style={styles.morebtnimg}/>
                            <View>
                            <Text style={styles.moretitle}>一句话发需求</Text>
                            <Text style={styles.moretext}>智能匹配最合适的设计师</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={()=>{
                this.props.navigation.dispatch(navigateAction2);
                PubSub.publish('products', 1);
                }}>
                        <View style={[styles.morebtn,{borderBottomWidth:1,borderBottomColor:'#eee'}]}>
                            <Image source={require('../../image/show.png')}
                                   style={styles.morebtnimg}/>
                            <View>
                                <Text style={styles.moretitle}>秀作品</Text>
                                <Text style={styles.moretext}>是金子 就是要让他发光</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={()=>{
                this.props.navigation.dispatch(navigateAction3);
                PubSub.publish('products', 1);
                }}>
                        <View style={styles.morebtn}>
                            <Image source={require('../../image/cloud.png')}
                                   style={styles.morebtnimg}/>
                            <View>
                                <Text style={styles.moretitle}>云报价</Text>
                                <Text style={styles.moretext}>一键合同，分享支付，快速订单</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    </View>
                    <View style={styles.morebtnbtm}>

                    </View>
                </View>
            </View>
        )}
}
const navigateAction1 = NavigationActions.navigate({routeName: 'Find'});
const navigateAction2 = NavigationActions.navigate({routeName: 'Show'});
const navigateAction3 = NavigationActions.navigate({routeName: 'Cloud'});


class More extends React.Component{
    constructor(props) {
        super(props);
        this.state = { showText: 1 };
    }
    render() {
        let dsdfs=()=>{
            PubSub.publish('products', 1);
        };
        return (
            <TouchableNativeFeedback onPress={()=>{
            dsdfs();
            }} style={{width:50,height:50,backgroundColor:'blue'}}>
                <View>
                    <Image source={require('../../image/more.png')} style={{width:40,height:40,alignSelf:'center',marginTop:5}}/>
                    <MoreBox/>
                </View>
            </TouchableNativeFeedback>
        )}
}
const styles=StyleSheet.create({
   morebtn:{height:90,flexDirection: 'row',marginLeft:20,marginRight:25},
    morebtnimg:{height:60,width:60,marginTop:15},
    morebtnbtm:{alignSelf:'center',
        borderBottomWidth:8,borderBottomColor:'rgba(0,0,0,0)',
        borderTopWidth:8,borderTopColor:'#fff',
        borderLeftWidth:8,borderLeftColor:'rgba(0,0,0,0)',
        borderRightWidth:8,borderRightColor:'rgba(0,0,0,0)'},
    moretitle:{
        fontSize:20,paddingLeft:15,marginTop:16,
        fontWeight:'400',
        color:'#111'
    },
    moretext:{
        paddingLeft:15,marginTop:8,fontSize:16
    }

});

