import Carousel from 'react-native-snap-carousel';
import {StyleSheet,Text,View,Dimensions, ImageBackground,TouchableHighlight} from "react-native";
const { width: viewportWidth } = Dimensions.get('window');
import {homeCarouselData} from 'utils/constant'
import React from 'react'
export default function HomeCarousel({onPress}){

  function _renderItem ({item}) {
      return (
        <TouchableHighlight onPress={()=>{onPress(item.title)}} underlayColor="white">
          <View style={styles.slide}>
            <ImageBackground style={styles.imageBg} resizeMode={'cover'} source={{uri:item.url}}>
              <View style={styles.mask}>
                <Text style={styles.title}>{ item.title }</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableHighlight>
      );
  }

    return (
      <View style={styles.carousel}>
        <Text style={styles.category}>Category</Text>
        <Carousel
          // ref={}
          data={homeCarouselData}
          renderItem={_renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth - 60}
        />
        <Text style={styles.category}>New</Text>
      </View>
    );
}

const styles =  StyleSheet.create({
  carousel:{
    height:250,
    backgroundColor:'#fff'
  },
  slide:{
    height:150,
    backgroundColor:'#000',
    borderRadius:12,
    overflow:"hidden"
  },
  category:{
    fontSize:16,
    lineHeight:24,
    color:'#000',
    fontWeight:"bold",
    marginBottom:12,
    paddingTop:10,
    paddingLeft:20
  },
  imageBg:{
    flex:1
  },
  mask:{
    backgroundColor:'rgba(0,0,0,.3)'
  },
  title:{
    textAlign:"center",
    lineHeight:150.,
    fontSize:22,
    color:'#fff',
    fontWeight:"bold"
  }
})