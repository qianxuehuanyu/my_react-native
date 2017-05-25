/**
 * Created by admin on 2017/5/17.
 */
import {
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
const dataCitystorage =new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,

    enableCache: true,

    sync: {theCity(){
        return {
            usedcity:['杭州'],
            theCity:'杭州'
        };
    }}
});

let City={
    usedcity:['杭州'],
    theCity:'杭州'
};
dataCitystorage.load({
    key: 'theCity',
    autoSync: true,
    syncInBackground: true,
}).then(ret=>{
    City=ret
});


module.exports = {City,dataCitystorage};
