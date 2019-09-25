import {Animated, ImageBackground, StyleSheet, TextInput,View,Text} from "react-native";
import { useState } from "react";
import React from 'react'

export default function BgHeader({nativeScrollY}) {
    const [value,setValue] = useState('test')
    let top = nativeScrollY.interpolate({
        inputRange: [-2000,0,3000],
        outputRange: [300,-50,-1300]
    })
    const style = {
        position: 'absolute',
        top:0,
        left: 0,
        width: '100%',
        backgroundColor:'#f00',
        height:600,
        transform: [{ translateY: top }],
        // zIndex:99
    };
    function onChangeText(){

    }
    return (
        <Animated.View style={style}>
            <ImageBackground blurRadius={1} source={require('../assets/images/bg.jpg')} style={{height:'100%'}}>
            </ImageBackground>
            {/*<View style={styles.search}>*/}
                {/*<Text style={styles.title}>Pixabay</Text>*/}
                {/*<TextInput*/}
                    {/*style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}*/}
                    {/*onChangeText={text => onChangeText(text)}*/}
                    {/*value={value}*/}
                {/*/>*/}
            {/*</View>*/}
        </Animated.View>
    );
}

const styles =  StyleSheet.create({
    search:{
        position: 'absolute',
        top:200,
        left: 10,
        right:10
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