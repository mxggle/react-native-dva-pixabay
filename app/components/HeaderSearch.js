import {Animated, ImageBackground, StyleSheet, TextInput,View,Text} from "react-native";
import { useState } from "react";
import React from 'react'

export default function HeaderSearch({nativeScrollY}) {
    const [value,setValue] = useState('test')
    let top = nativeScrollY.interpolate({
        inputRange: [0,500,1000],
        outputRange: [-50,-220,-220]
    })
    let bgOpacity = nativeScrollY.interpolate({
        inputRange: [0,500,800],
        outputRange: [0,.1,1]
    })
    const style = {

    };
    function onChangeText(){

    }
    return (
        <Animated.View style={{...styles.container,transform: [{ translateY: top }]}}>
            <Animated.View style={{...styles.searchBg,opacity: bgOpacity}}></Animated.View>
            <View style={styles.search}>
                <Text style={styles.title}>Pixabay</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
            </View>
        </Animated.View>
    );
}

const styles =  StyleSheet.create({
    container:{
        position: 'absolute',
        top:0,
        left: 0,
        width: '100%',
        backgroundColor:'transparent',
        height:300,
        zIndex:99
    },
    searchBg:{
        position: 'absolute',
        top:220,
        left: 0,
        right:0,
        height:100,
        backgroundColor: '#fff'
    },
    search:{
        position: 'absolute',
        top:200,
        left: 10,
        right:10
    },
    input:{
        height:40,
        borderRadius:6,
        backgroundColor:'rgba(0,0,0,.5)'
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