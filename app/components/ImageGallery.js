import {StyleSheet,Text} from "react-native";
import React from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';


export default function ImageGallery({ modelVisible,swipeDown,imageList,previewId,loadData,listNode}) {
    const images = imageList.map(item=>{
      return {
        url:item.largeImageURL
        // url:item.previewURL
      }
    })
    const index = imageList.findIndex(item =>item.id === previewId)
    function onSwipeDown(){
      swipeDown && swipeDown()
    }
    function handleChange(index){
      console.log('index',index)
      listNode.getNode().scrollToIndex({
        index,
        viewPosition:0.5
      })
      if(index === imageList.length - 5){
        loadData && loadData()
      }
    }
    function renderHeader(index){
      return (
        <Text style={styles.title}>{imageList[index].user}</Text>
      )
    }
    return (
      <Modal visible={modelVisible} transparent={true} animationType={'fade'}>
          <ImageViewer
            renderIndicator={()=>null}
            renderHeader={renderHeader}
            onChange={handleChange}
            index={index}
            enableSwipeDown={true}
            onSwipeDown={onSwipeDown}
            imageUrls={images}/>
      </Modal>
    );
}

const styles =  StyleSheet.create({
  title:{
    color:'#fff',
    textAlign:'center',
    marginTop:20,
  }
})