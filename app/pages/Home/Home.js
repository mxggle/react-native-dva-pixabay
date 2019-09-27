import React from 'react'
import {
    Platform,
    Image,
    FlatList,
    Animated,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    ImageBackground,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux';
import {rendomColor} from 'utils/util'
import { HEADER_MAX_HEIGHT } from 'utils/constant.js'
import BgHeader from "components/HeaderBg";
import HeaderSearch from "components/HeaderSearch";

function FooterCom(){
    return (
        <Text style={styles.loading}>loading...</Text>
    )
}

class  Home extends React.Component{
    constructor(props){
        super(props)
        this.renderMovie = this.renderMovie.bind(this)
        this.listHeader = this.listHeader.bind(this);
        this.state = {
            scrollY:null,
            nativeScrollY:new Animated.Value(0)
        }
        this.node = null
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
    goDetail(item){
        // this.props.navigation.navigate('Detail',{id:item.id})
    }
    componentDidMount(){
    }

    renderMovie({ item }) {
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <TouchableHighlight onPress={()=>{this.goDetail(item)}} underlayColor="white">
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
    loadMore(){
        let {dispatch,hasMore,page,loading} = this.props
        if(!hasMore || loading) return;
        dispatch({
            type:'home/getData',
            payload:{
                page:page + 1,
            }
        })
    }
    listHeader(){
        return (
            <View style={{paddingTop:350}}></View>
        )
    }
    handleSearch(searchKey){
        console.log('handleSearch',searchKey)
        let {dispatch} = this.props
        dispatch({
            type:'home/getData',
            payload:{
                page:1,
                searchKey
            }
        })
    }
    render() {
        const { imageList = [],loading} = this.props;
        // let nativeScrollY = Animated.add(
        //     this.nativeScrollY,
        //     Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
        // );
        // console.log('app',this.state.nativeScrollY)
        return (
            <View style={{flex:1, backgroundColor: "#fff"}}>
                {/*<AnimatedHeader*/}
                {/*title={"Poke-Gallery"}*/}
                {/*nativeScrollY={nativeScrollY}*/}
                {/*/>*/}
                <BgHeader nativeScrollY={this.state.nativeScrollY}/>
                <HeaderSearch nativeScrollY={this.state.nativeScrollY} handleSearch={(value)=>{this.handleSearch(value)}} node={this.node}/>
                {/*<Animated.ScrollView*/}
                    {/*style={styles.scroll}*/}
                    {/*scrollEventThrottle={10}*/}

                {/*>*/}
                    <Animated.FlatList
                        ref={node=>this.node = node}
                        ListHeaderComponent={this.listHeader}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.nativeScrollY } } }],
                            {
                                useNativeDriver: true
                            }
                        )}
                        data={imageList}
                        renderItem={this.renderMovie}
                        style={{...styles.list}}
                        keyExtractor={(item,index) => `${index}`}
                        ListEmptyComponent={<Text>no data</Text>}
                        ListFooterComponent={FooterCom}
                        ListFooterComponentStyle={loading ? {display:'flex'} : {display:'none'}}
                        onEndReached={()=>{this.loadMore()}}
                    />
                {/*</Animated.ScrollView>*/}
                {/*</ImageBackground>*/}
            </View>
        );
    }
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
        // width: 150,
        height: 200,
        // backgroundColor:'#fff'
    },
    list: {
        // paddingTop: 100,
        // backgroundColor: "#F5FCFF"
        backgroundColor:'transparent'
    },
    loading:{
        height: 80,
        paddingTop:15,
        fontSize:16,
        flex:1,
        textAlign:'center'
    },
    scroll: {
        flex: 1,
        // backgroundColor:'#000'
        // alignItems: "center",
        paddingTop:200,
        // paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
    },
    scroll_container: {
        flex:1,
        alignItems: "center",
        paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
    }
});
function mapStateToProps(state){
    // console.log(state)
    return {...state.home,loading:state.loading.models.home}
}

export default connect(mapStateToProps)(Home);
// export default connect(state => state.app)(Home)