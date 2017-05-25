/**
 * Created by admin on 2017/5/17.
 */
import {
    AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
const dataSelectstorage =new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,

    enableCache: true,

    sync: {theSelectionOld(){
        return {selectKey:[]}
    }}
});
let SelectionOld={selectKey:[]};
dataSelectstorage.load({
    key: 'theSelectionOld',
    autoSync: true,
    syncInBackground: true,
}).then(ret=>{
    SelectionOld=ret;
});

module.exports = {SelectionOld,dataSelectstorage};

