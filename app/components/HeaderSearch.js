import {Animated, ImageBackground, StyleSheet, TextInput,View,Text,Platform} from "react-native";
import { useState,useEffect } from "react";
import React from 'react'
import { SearchBar } from 'react-native-elements';

export default function HeaderSearch({ nativeScrollY,handleSearch,node}) {
    const [search,setSearch] = useState('')
    let translateY = new Animated.Value(0),
        bgOpacity = new Animated.Value(0);

    // 绑定滚动事件
    // 这里为了尝试使用timing方法track动态值才这么写
    // 可以直接将此处的toValue值赋值给translateY（见HeaderBg组件）
    // 虽然两种写法在这里效果相同，但是某些情况下还是有区别
    function bindScrollAni(){
        Animated.timing(
            translateY,
            {
                toValue:nativeScrollY.interpolate({
                    inputRange: [0,240,1000],
                    outputRange: [-50,-230,-230]
                }),
                useNativeDriver: true,
                duration:0
            }
        ).start()
        Animated.timing(
            bgOpacity,
            {
                toValue:nativeScrollY.interpolate({
                    inputRange: [0,180,240],
                    outputRange: [0,.1,1]
                }),
                useNativeDriver: true,
                duration:0
            }
        ).start()
    }
    bindScrollAni();

    function updateSearch(v){
        setSearch(v)
    }
    function handleFocus(){
        node && node.getNode().scrollToOffset({
            offset:300
        })
        // Animated.spring(
        //     translateY,
        //     {
        //         toValue:-230,
        //         useNativeDriver: true,
        //     }
        // ).start()
        // Animated.spring(
        //     bgOpacity,
        //     {
        //         toValue:1,
        //         useNativeDriver: true,
        //     }
        // ).start()
    }
    function handleBlur(){
        node && node.getNode().scrollToOffset({
            offset:0
        })
        // Animated.sequence([
        //     Animated.parallel([
        //         Animated.spring(
        //             translateY,
        //             {
        //                 toValue:0,
        //                 useNativeDriver: true,
        //                 duration:0
        //             }
        //         ).start(),
                {/*Animated.spring(*/}
                    {/*bgOpacity,*/}
                    {/*{*/}
                        {/*toValue:0,*/}
        //                 useNativeDriver: true,
        //                 duration:0
        //             }
        //         ).start()
        //     ]),
        //     Animated.parallel([
        //         Animated.timing(
        //             translateY,
        //             {
        //                 toValue:nativeScrollY.interpolate({
        //                     inputRange: [0,280,1000],
        //                     outputRange: [-50,-230,-230]
        //                 }),
        //                 useNativeDriver: true,
        //                 duration:0
        //             }
        //         ).start(),
        //         Animated.timing(
        //             bgOpacity,
        //             {
        //                 toValue:nativeScrollY.interpolate({
        //                     inputRange: [0,280,800],
        //                     outputRange: [0,.1,1]
        //                 }),
        //                 useNativeDriver: true,
        //                 duration:0
        //             }
        //         ).start()
        //     ]),
        //
        // ])

    }
    function handleSubmit(){
        handleSearch(search)
    }
    return (
        <Animated.View style={{...styles.container,transform: [{ translateY: translateY }]}}>
            <Animated.View style={{...styles.searchBg,opacity: bgOpacity}}></Animated.View>
            <View style={styles.search}>
                <Text style={styles.title}>Pixabay</Text>
                <SearchBar
                    onSubmitEditing={handleSubmit}
                    onFocus={handleFocus}
                    onCancel={handleBlur}
                    platform={Platform.OS}
                    showCancel={true}
                    containerStyle={styles.searchContainer}
                    // inputContainerStyle{}
                    lightTheme={true}
                    placeholder="search"
                    onChangeText={updateSearch}
                    value={search}
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
        left: 0,
        right:0
    },
    searchContainer:{
        backgroundColor:'transparent',
        borderTopWidth:0,
        borderBottomWidth:0
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