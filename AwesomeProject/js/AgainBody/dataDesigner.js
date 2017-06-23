/**
 * Created by admin on 2017/5/17.
 */
import {
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
const dataDesignerstorage =new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,

    enableCache: true,

    sync: {theDesigner(){
        return {
            designers:[],
            CSDesigner:{name:'千雪幻宇',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',oneword:'sdfasdfasdf'
                ,localtion:'杭州-西湖区-中大银座'
                ,liking:1231
                ,getFindNumber:12
                ,getFindReturn:77
                ,selftext:'123123123  /n  123123' +  '123213' +'123123213 '
                ,lastTalking:[{name:'sdfasd',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',content:'sdfasdfasd',returnWord:[{name:'sdfasd',path:'https://avatars0.githubusercontent.com/u/22440637?v=3&s=460',content:'sdfasdfasd',returnWord:[]},]},{}]
                ,works:[{path:'http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115',id:'1231231'},
                    {path:'http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115',id:'1231231'},
                    {path:'http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115',id:'1231231'},
                    {path:'http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115',id:'1231231'},
                    {path:'http://huakewang.b0.upaiyun.com/2016/06/28/20160628001252626506.jpg!160x115',id:'1231231'},]}
        };
    }}
});

let t_Designer={
    designers:[],
    CSDesigner:{}
};
dataDesignerstorage.load({
    key: 'theDesigner',
    autoSync: true,
    syncInBackground: true,
}).then(ret=>{
    t_Designer=ret
});


module.exports = {t_Designer,dataDesignerstorage};
