/**
 * Created by admin on 2017/5/17.
 */
import {
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
const datastorage =new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    sync: {theGlobal(){
        return {
            islogin:true,
            username:'qianxuehuanyu',
            local: '滨江区长河路351号dfasdf',
            city:'杭州',
            selectKeyword:'',
            art:['名片','海报','画册','所装','标识','名片','海报','画册','所装','标识'],
            logo:['名片','标识'],
            vr:['名片','海报','画册','封面','标识'],
            space:['名片','海报','画册','标识'],
            jewellery:['名片','所装','标识'],
            video:['名片','标识'],
            coding:['名片','海报','画册','封面','所装'],
            internet:['名片','海报','画册','封面','所装','标识'],
            path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
            showwait:'none',
            aaoldlocal:[{local: "杭州市dfasdfasf", keyword: 'home'},
                {local: "杭州市dfasdfasf", keyword: 'company'},
                {local: "杭州市dfasdfasf", keyword: 'null'}],
            auth:{submitResult:'提交',path:'',is_auth:0,kind:'',sex:'',showname:'',experience:null,education:null,skill:[],
                works:[]
            },
            AnyChat_images:[{imagepath:'http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg',href:'http://www.huakewang.com/'}
                ,{imagepath:'http://huakewang.b0.upaiyun.com/2016/04/27/20160427203805857517.jpg',href:'http://www.huakewang.com/'}
                ,{imagepath:'http://huakewang.b0.upaiyun.com/2016/04/26/20160426081736600936.jpg',href:'http://www.huakewang.com/'}],
            AnyChat_top:[123,123,123,123],
            selectbtns:[
                ['品牌设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png'),2],
                ['网页设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png'),2],
                ['多媒体',require('../../image/KB_video1.png'),require('../../image/KB_video2.png'),2],
                ['程序设计',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png'),2],
                ['互联网设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png'),2],
                ['产品设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png'),2],
                ['空间设计',require('../../image/KB_video1.png'),require('../../image/KB_video2.png'),2],
                ['虚拟现实',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png'),2]
            ]
        }
    }}
});
// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
// global.storage = storage;

// 这样，在此**之后**的任意位置即可以直接调用storage
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.storage = storage语句是否确实已经执行过了
let Global={
    username:'qianxuehuanyu',
    local: '滨江区长河路351号dfasdf',
    city:'杭州',
    selectKeyword:'',
    art:['名片','海报','画册','所装','标识','名片','海报','画册','所装','标识'],
    logo:['名片','标识'],
    vr:['名片','海报','画册','封面','标识'],
    space:['名片','海报','画册','标识'],
    jewellery:['名片','所装','标识'],
    video:['名片','标识'],
    coding:['名片','海报','画册','封面','所装'],
    internet:['名片','海报','画册','封面','所装','标识'],
    path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',
    showwait:'none',
    aaoldlocal:[{local: "西湖区dfasdfasf", keyword: 'home'},
        {local: "dafsdfasdfasf", keyword: 'company'},
        {local: "dasdfasdfasf", keyword: 'null'}],
    auth:{submitResult:'提交',path:'',is_auth:0,kind:'',sex:'',showname:'',experience:null,education:null,skill:[],
        works:[]
    },
    AnyChat_images:[{imagepath:'http://huakewang.b0.upaiyun.com/2016/04/27/20160427190906563685.jpg',href:'http://www.huakewang.com/'}
        ,{imagepath:'http://huakewang.b0.upaiyun.com/2016/04/27/20160427203805857517.jpg',href:'http://www.huakewang.com/'}
        ,{imagepath:'http://huakewang.b0.upaiyun.com/2016/04/26/20160426081736600936.jpg',href:'http://www.huakewang.com/'}],
    AnyChat_top:[123,123,123,'999+'],
    selectbtns:[
        ['品牌设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png'),2],
        ['网页设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png'),2],
        ['多媒体',require('../../image/KB_video1.png'),require('../../image/KB_video2.png'),2],
        ['程序设计',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png'),2],
        ['互联网设计',require('../../image/KB_logo1.png'),require('../../image/KB_logo2.png'),2],
        ['产品设计',require('../../image/KB_internet1.png'),require('../../image/KB_internet2.png'),2],
        ['空间设计',require('../../image/KB_video1.png'),require('../../image/KB_video2.png'),2],
        ['虚拟现实',require('../../image/KB_coding1.png'),require('../../image/KB_coding2.png'),2]
    ]
};
datastorage.load({
    key: 'theGlobal',
    autoSync: true,
    syncInBackground: true,
}).then(ret=>{
    Global=ret;
});

module.exports = {Global,datastorage};