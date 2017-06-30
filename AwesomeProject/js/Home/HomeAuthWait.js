/**
 * Created by admin on 2017/5/23.
 */
import React from 'react';
import {
    View,Text,ActivityIndicator,TouchableNativeFeedback
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class HomeAuthWaitScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: `设计师认证`,
            headerRight:(<TouchableNativeFeedback
                onPress={e=>{
             navigation.dispatch(navigateAction1)
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>返回</Text>
            </TouchableNativeFeedback>)
        }
    };
    componentDidMount () {

    }
    render(){
        return(
            <View>

                <Text>提交成功！请耐心等待审核！</Text>
            </View>
        )
    }
}
const navigateAction1 = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Box'})
    ]});