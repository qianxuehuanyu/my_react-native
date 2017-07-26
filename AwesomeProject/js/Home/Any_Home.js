/**
 * Created by admin on 2017/5/3.
 */
import React from 'react';
import {
    View
} from 'react-native';
import HomeContentScreen from './HomeContent'
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    render() {
        return (
            <View pointerEvents='auto' style={{flex:1}}>
                <HomeContentScreen screenProps={this.props.screenProps}/>
            </View>
        );
    }
};
