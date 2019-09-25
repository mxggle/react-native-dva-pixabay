import {Animated, ImageBackground, StyleSheet, TextInput,View,Text} from "react-native";
import React from 'react'

export default function HeaderBg({nativeScrollY}) {
    let translateY = nativeScrollY.interpolate({
        inputRange: [-2000,0,3000],
        outputRange: [300,-100,-1300]
    })
    return (
        <Animated.View style={{...styles.container,transform: [{ translateY }]}}>
            <ImageBackground blurRadius={1} source={require('../assets/images/bg.jpg')} style={{height:'100%'}}>
            </ImageBackground>
        </Animated.View>
    );
}

const styles =  StyleSheet.create({
    container:{
        position: 'absolute',
        top:0,
        left: 0,
        width: '100%',
        backgroundColor:'#f00',
        height:1000,
    },
    title:{
        color:'#fff',
        fontSize:32,
        textAlign: 'center',
        marginBottom:20,
        fontWeight: '700',
        opacity:.8
    }
})