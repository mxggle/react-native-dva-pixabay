import React from 'react'
import {
    Animated,
    View,
} from 'react-native'
import { connect } from 'react-redux';
import BgHeader from "components/HeaderBg";
import HeaderSearch from "components/HeaderSearch";
import HomeCarousel from "components/HomeCarousel";
import PhotoList from 'components/PhotoList'

class  Home extends React.Component{
    constructor(props){
        super(props)
        this.listHeader = this.listHeader.bind(this);
        this.state = {
            nativeScrollY:new Animated.Value(0),
            galleryOpacity:new Animated.Value(0),
        }
        this.node = null;
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "",
            headerTransparent:true,
            headerStyle: {
                backgroundColor: "transparent"
            },
            headerTitleStyle: {
                color: "#FFF"
            }
        };
    };
    goDetail(value){
        this.props.navigation.navigate('Detail',{searchKey:value})
    }
    listHeader(){
        return (
            <View style={{paddingTop:350}}>
                <HomeCarousel onPress={(value)=>this.goDetail(value)}/>
            </View>
        )
    }
    // handleSearch(searchKey){
    //     let {dispatch} = this.props
    //     dispatch({
    //         type:'home/getData',
    //         payload:{
    //             page:1,
    //             searchKey
    //         }
    //     })
    // }
    loadMore(){
        const {dispatch,hasMore,loading,page} = this.props;
        if(!hasMore || loading) return;
        dispatch({
            type:'home/getData',
            payload:{
                page:page + 1,
            }
        })
    }
    render() {
        const { loading,imageList } = this.props;
        return (
            <View style={{flex:1, backgroundColor: "#fff"}}>
                <BgHeader nativeScrollY={this.state.nativeScrollY}/>
                <HeaderSearch nativeScrollY={this.state.nativeScrollY} handleSearch={(value)=>{this.goDetail(value)}} node={this.node}/>
               <PhotoList 
                getNode={node=>{this.node = node}}
                listHeader={this.listHeader}
                loading={loading}
                data={imageList}
                loadMore={()=>this.loadMore()}
                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.nativeScrollY } } }],
                        {
                            useNativeDriver: true
                        }
                    )
                }
               />
            </View>
        );
    }
}
function mapStateToProps(state){
    return {...state.home,loading:state.loading.models.home}
}

export default connect(mapStateToProps)(Home);