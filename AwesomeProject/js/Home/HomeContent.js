/**
 * Created by admin on 2017/5/12.
 */
import React from 'react';
import {
    Text,Button,View,StyleSheet,Image,Dimensions,TouchableNativeFeedback,ListView
} from 'react-native';
const moreText = "加载完毕";    //foot显示的文案
//页码
var pageNum = 1;
//每页显示数据的条数
const pageSize = 10;
//页面总数据数
var pageCount = 0;
//页面List总数据
var totalList = new Array();

export default class HomeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loaded: false,//控制Request请求是否加载完毕
            foot:0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            error:false}
    }
    componentWillMount() {
        this._fetchListData();
    }
    _renderRow(){
        return(
            <View style={{flex:1,}}>
                <Text>11111111</Text>
                <Text>22222222</Text>
                <Text>33333333</Text>
                <Text>44444444</Text>
                <Text>55555555</Text>
            </View>
        )
    }
    _fetchListData() {
        if(pageNum > 1){
            this.setState({loaded:true});
        }
        fetch(requestURL, {
            method: 'get',
            headers: headerObj,
        }).then(response =>{
            if (response.ok) {
                return response.json();
            } else {
                this.setState({error:true,loaded:true});
            }
        }).then(json=>{
            let responseCode = json.code;
            if (responseCode == 0) {
                let responseData = json.data;

                pageCount = responseData.count;
                let list = responseData.data;

                if (orderList == null) {
                    orderList = [];
                    currentCount = 0;
                } else {
                    currentCount = list.length;
                }
                if(currentCount < pageSize){
                    //当当前返回的数据小于PageSize时，认为已加载完毕
                    this.setState({ foot:1,moreText:moreText});
                }else{//设置foot 隐藏Footer
                    this.setState({foot:0});
                }
                for (var i=0; i < list.length; i++) {
                    totalList.push( list[i] );
                }

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(totalList),
                    loaded: true,
                });
            }else{
                this.setState({error:true,loaded:true});
            }
        }).catch(function (error) {
            this.setState({error:true,loaded:true});
        });
    };
    _renderFooter() {
        if(this.state.foot === 1){//加载完毕
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        }else if(this.state.foot === 2) {//加载中
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center',}}>
                    <Image source={{uri:loadgif}} style={{width:20,height:20}}/>
                </View>);
        }
    }
    _endReached(){
        if(this.state.foot != 0 ){
            return ;
        }
        this.setState({
            foot:2,
        });
        this.timer = setTimeout(
            () => {
                pageNum ++;
                this._fetchListData();
            },500);
    };
    componentWillUnmount() {
// 如果存在this.timer，则使用clearTimeout清空。
// 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={{marginTop:0}}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReached={this._endReached.bind(this)}
                    onEndReachedThreshold={0}
                />
            </View>
        );
    }
};

const styles=StyleSheet.create({

});