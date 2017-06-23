/**
 * Created by admin on 2017/5/4.
 */
import React from 'react';
import {
    Text,View,ListView,TouchableNativeFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationActions } from 'react-navigation'
import {upload,dataUpload} from '../AgainBody/dataShow'


export default class ShowScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: `作品`,
            headerRight:(<TouchableNativeFeedback
                onPress={()=>{
                          navigation.dispatch(navigateAction1)
            }
            }>
                <Text style={{color:'#048bef',paddingRight:10}}>下一步</Text>
            </TouchableNativeFeedback>)
        }
    };
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    componentDidMount () {
        alert('上传图片，可多张');
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
            upload.images=images;
            dataUpload.save({
                key:'theuploadImage',
                data:upload
            });
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({dataSource:ds.cloneWithRows(images)});
        });
    }
    _renderRow(rowData){
        return (
            <TouchableNativeFeedback>
                <View>
                    <Image source={require(rowData.path)} style={{height:50,width:35,margin:2}}/>
                </View>
            </TouchableNativeFeedback>
        )
    }
    render(){
        return(
            <View>
                <Text>选择一张图片制作您作品的封面</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    style={{flex:1}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{flexDirection:'row',}}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        )
    }
}
const navigateAction1 = NavigationActions.navigate({routeName:'ShowWrite',param:{workId:null}});
