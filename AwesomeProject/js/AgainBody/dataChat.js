/**
 * Created by admin on 2017/5/17.
 */
import {
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
const dataChatstorage =new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
        theChat(){
            return {
                ChatList:[]
            }
        },
        theChatProject(){
            return {
                ChatProjectList:{id:'1234123',kind:'project',
                    send:{name:'洪辉',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                        sex:'1',localtion:'杭州'},kindword:['产品经理','三汇信息']
                    ,useReady:'<a style={color:red}>[预算：1.5万元]</a><a> 找12312312312321321321212121212121212' +
                '1212121212121212121212121212' +'1212121212121212121212121' +
                '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
                    images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
                    time:'2017/06/22 15:55:14',
                    likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
                    talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
                        {sender:'dafsd',to:'洪辉',text:'sdfasdfasdfasdfasd'},
                        {sender:'dafsd',to:'dfas大',text:'sdfasdfasdfasdfasd'}]
                }
            }
        },
        theChatProjectList(){
            return {
                ChatProjectList:[
                    {id:'1234123',kind:'project',
                    send:{name:'洪辉',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                        sex:'1',localtion:'杭州'},kindword:['产品经理','三汇信息']
                    ,useReady:'<a style={color:red}>[预算：1.5万元]</a><a> 找12312312312321321321212121212121212' +
                    '1212121212121212121212121212' +'1212121212121212121212121' +
                    '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
                    images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
                    time:'2017/06/22 15:55:14',
                    likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
                    talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
                        {sender:'dafsd',to:'洪辉',text:'sdfasdfasdfasdfasd'},
                        {sender:'dafsd',to:'dfas大',text:'sdfasdfasdfasdfasd'}]
                    },
                    {id:'1234123',kind:'project',
                        send:{name:'洪辉',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                            sex:'1',localtion:'杭州'},kindword:['产品经理','三汇信息']
                        ,useReady:'<a style={color:red}>[预算：1.5万元]</a><a> 找12312312312321321321212121212121212' +
                    '1212121212121212121212121212' +'1212121212121212121212121' +
                    '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
                        images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
                        time:'2017/06/22 15:55:14',
                        likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
                        talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
                            {sender:'dafsd',to:'洪辉',text:'sdfasdfasdfasdfasd'},
                            {sender:'dafsd',to:'dfas大',text:'sdfasdfasdfasdfasd'}]
                    },
                    {id:'1234123',kind:'project',
                        send:{name:'洪辉',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
                            sex:'1',localtion:'杭州'},kindword:['产品经理','三汇信息']
                        ,useReady:'<a style={color:red}>[预算：1.5万元]</a><a> 找12312312312321321321212121212121212' +
                    '1212121212121212121212121212' +'1212121212121212121212121' +
                    '2121212121212121212121212' +'121212121212121212121212121212121212121212121212121212121</a>',
                        images:['http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg'],
                        time:'2017/06/22 15:55:14',
                        likeNum:['晚高峰','沪电股份','高富帅大地飞歌'],
                        talkingList:[{sender:'dafsd',to:'ddfas',text:'sdfasdfasdfasdfasd'},
                            {sender:'dafsd',to:'洪辉',text:'sdfasdfasdfasdfasd'},
                            {sender:'dafsd',to:'dfas大',text:'sdfasdfasdfasdfasd'}]
                    },
                ]
            }
        },

    }
});

let Chat={},theChatProject={},ChatProjectList=[{},{},{}];
dataChatstorage.load({
    key: 'theChat',
    autoSync: true,
    syncInBackground: true,
}).then(ret=>{
    Chat=ret
});
dataChatstorage.load({
    key: 'theChatProject',
    autoSync: true,
    syncInBackground: true,
}).then(ret=>{
    ChatProjectList=ret
});


module.exports = {Chat,ChatProjectList,theChatProject,dataChatstorage};
