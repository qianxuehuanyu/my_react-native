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
    sync: {theFirstData(){
        return {
            imageBoxShow:0,
        };
    }}
});

let FirstData={
    imageBoxShow:0,
};
dataCitystorage.load({
    key: 'theFirstData',
    autoSync: true,
    syncInBackground: true,
}).then(ret=>{
    FirstData=ret
});


module.exports = {FirstData,dataCitystorage};
