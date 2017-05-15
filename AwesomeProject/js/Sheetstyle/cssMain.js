/**
 * Created by admin on 2017/5/4.
 */
import {
    StyleSheet
} from 'react-native';

const boxstyles=StyleSheet.create({
    bottomstyle:{
    height:60,flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
    },
    indexOfhuakewang:{
        backgroundColor:"#ee23ee",
        color:"red"
    },
    icon:{
        width:25,height:25,
    },
    more:{
        width:40,height:40,display:'none'
    },
    moreBlack:{
        display:'none'
    },
    borderoutBtm:{
        borderBottomWidth:10,
        borderTopWidth:10,
        borderLeftWidth:10,
        borderRightWidth:10,
        borderBottomColor:'rgba(0,0,0,0)',
        borderTopColor:'rgba(0,0,0,0.7)',
        borderLeftColor:'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        alignSelf:'center',
        position:'relative',
        top:10
    },
    borderininBtm:{
        borderBottomWidth:8,
        borderTopWidth:8,
        borderLeftWidth:8,
        borderRightWidth:8,
        borderBottomColor:'rgba(0,0,0,0)',
        borderTopColor:'#eee',
        borderLeftColor:'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        alignSelf:'center',
        position:'absolute',
        top:-10,left:-8,right:0,bottom:0
    },
    borderoutLeft:{
        borderBottomWidth:16,
        borderTopWidth:16,
        borderLeftWidth:16,
        borderRightWidth:16,
        borderBottomColor:'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0.7)',
        borderLeftColor:'rgba(0,0,0,0)',
        borderTopColor:'rgba(0,0,0,0)',
        alignSelf:'center',
        position:'relative',
        left:-10,top:16,
    },
    borderininLeft:{
        borderBottomWidth:14,
        borderTopWidth:14,
        borderLeftWidth:14,
        borderRightWidth:14,
        borderBottomColor:'rgba(0,0,0,0)',
        borderRightColor:'#eee',
        borderLeftColor:'rgba(0,0,0,0)',
        borderTopColor:'rgba(0,0,0,0)',
        alignSelf:'center',
        position:'absolute',
        top:-14,left:-12,right:0,bottom:0
    }
});
export {boxstyles}