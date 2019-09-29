import React,{useState} from 'react'
import {
    Image,
    Animated,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ImageBackground,
    ActivityIndicator,
    Dimensions
} from 'react-native'
import {rendomColor} from 'utils/util'
import ImageGallery from "components/ImageGallery";
const { width: viewportWidth,height:viewportHeight } = Dimensions.get('window');

function FooterCom(style){
    return (
        <View style={{marginTop:15,marginBottom:15}}>
          <ActivityIndicator size="small" color="#000" />
        </View>
    )
}

export default function PhotoList({loading,listHeader = null,data,onScroll = ()=>{},getNode = ()=>{},loadMore}){
    const [node,setNode] = useState(null);
    const [modelVisible,setModelVisible] = useState(false);
    const [previewId,setPreviewId] = useState('')
    function preview(item){
      setPreviewId(item.id)
      setModelVisible(true)
    }
    function renderItem({ item }) {
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <TouchableHighlight onPress={()=>{preview(item)}} underlayColor="white">
                <View style={styles.container}>
                    <ImageBackground
                        key={item.previewURL}
                        source={{ uri: item.previewURL }}
                        style={{width: '100%', height: '100%',backgroundColor:rendomColor()}}
                        blurRadius={5}>
                        <Image
                            source={[{ uri: item.webformatURL }]}
                            style={{...styles.thumbnail,height:item.webformatHeight}}
                        />
                    </ImageBackground>
                    <Text style={styles.username}>{item.user}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    return (
      <View style={{flex:1}}>
        <Animated.FlatList
            ref={node=>{
              node && getNode(node)
              setNode(node)
            }}
            ListHeaderComponent={listHeader}
            onScroll={onScroll}
            data={data}
            renderItem={renderItem}
            style={{...styles.list}}
            keyExtractor={(item,index) => `${item.id}${index}`}
            ListEmptyComponent={<View style={{height:viewportHeight,backgroundColor:'#fff',paddingTop:15}}>
              <ActivityIndicator size="small" color="#000" />
            </View>}
            ListFooterComponent={FooterCom}
            ListFooterComponentStyle={loading ? {display:'flex'} : {display:'none'}}
            onEndReached={()=>{loadMore()}}
        />
        {
        <ImageGallery
          loadData={loadMore}
          listNode={node}
          previewId={previewId}
          imageList={data}
          modelVisible={modelVisible}
          swipeDown={()=>{setModelVisible(false)}}
        />
        }
      </View>
    );
}
var styles = StyleSheet.create({
    container: {
        borderBottomWidth:2,
        borderBottomColor:'#fff',
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        backgroundColor: "#F5FCFF",
    },
    username:{
        position:'absolute',
        left:15,
        bottom:20,
        color:'#fff',
        fontSize:14
    },
    rightContainer: {
        flex: 1,
        marginLeft:15
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "left"
    },
    year: {
        textAlign: "left"
    },
    thumbnail: {
        flex:1,
        height: 200,
    },
    list: {
        backgroundColor:'transparent',
    },
    loading:{
        height: 80,
        paddingTop:15,
        fontSize:16,
        flex:1,
        textAlign:'center'
    },
});