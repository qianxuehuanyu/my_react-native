/**
 * Created by admin on 2017/5/12.
 */
/**
 * Created by admin on 2017/5/12.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,TouchableNativeFeedback,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import {boxstyles} from '../Sheetstyle/cssMain'
export default class HomeLocal extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render(){
        return(
            <Localstack />
        )
    }
};
class Local extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
        this.state = {
            city: ['杭州',],
            oldlocal: [{local: "杭州市dfasdfasf", keyword: 'home'},
                {local: "杭州市dfasdfasf", keyword: 'company'},
                {local: "杭州市dfasdfasf", keyword: 'null'}]
        }
    }
    render(){
        return(
            <View style={{position:'relative'}}>
                <TouchableNativeFeedback onPress={()=>{
                this.props.navigation.dispatch(navigateAction1)
                }}>
                    <View style={{position:'absolute',zIndex:1000,top:0,left:0,height:60,width:40}}>
                    <View style={boxstyles.borderoutLeft}>
                        <View style={boxstyles.borderininLeft}>

                        </View>
                    </View>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <View style={styles.LocalindexHeader}>
                        <Text style={{fontSize:20,alignSelf:'center',lineHeight:30,color:'#111',marginRight:4}}>{this.state.city[0]}</Text>
                        <View style={boxstyles.borderoutBtm}>
                            <View style={boxstyles.borderininBtm}>

                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>


            </View>
        )
    }
}

class Localselect extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props) {
        super(props);
        this.state = {
            city: ['杭州',],
            oldlocal: [{local: "杭州市dfasdfasf", keyword: 'home'},
                {local: "杭州市dfasdfasf", keyword: 'company'},
                {local: "杭州市dfasdfasf", keyword: 'null'}]
        }
    }
    render(){
        return(
            <View>
                <Text>
                    123213local
                </Text>
            </View>
        )
    }
}
const navigateAction1 = NavigationActions.navigate({routeName: 'HomeBox'});

const Localstack=StackNavigator({
    Localindex:{screen:Local},
    Localselect:{screen:Localselect},
});

const styles=StyleSheet.create({
    LocalindexHeader:{
        backgroundColor:'#eee',height:60,flexDirection:'row',justifyContent:'center'
    }
});