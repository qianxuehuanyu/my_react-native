/**
 * Created by admin on 2017/5/9.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
class BoxScreen extends React.Component {
    render(){
        return (
            <View style={{height:120,backgroundColor:'#445433'}}>
                <Button title="发需求" onPress={this.props.navigation.navigate('Find')}/>
                <Button title="秀作品" onPress={this.props.navigation.navigate('Show')}/>
                <Button title="云报价" onPress={this.props.navigation.navigate('Cloud')}/>
            </View>
        )
    }
};
class FindScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>发需求</Text>
            </View>
        )
    }
};
class ShowScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>秀作品</Text>
            </View>
        )
    }
};
class CloudScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>云报价</Text>
            </View>
        )
    }
};

const MoreStack=StackNavigator({
    Box:{screen:BoxScreen},
    Find:{screen:FindScreen},
    Show:{screen:ShowScreen},
    Cloud:{screen:CloudScreen}
});

class MoreScreen extends React.Component{
    render(){
        return(
            <View>

            </View>
        )

    }
}
export {MoreStack}
export default MoreScreen


