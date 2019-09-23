import React from 'react'
import {
    Image,
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ImageBackground,
    TextInput,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux';
import {rendomColor} from 'utils/util'
function FooterCom(){
    return (
        <Text style={styles.loading}>loading...</Text>
    )
}

class  Home extends React.Component{
    constructor(props){
        super(props)
        this.renderMovie = this.renderMovie.bind(this)
        this.listHeader = this.listHeader.bind(this)
    }
    static navigationOptions = {
        title: 'Home',
        headerTransparent:true,
        headerStyle:{
            backgroundColor:'transparent'
        }
    };
    goDetail(item){
        this.props.navigation.navigate('Detail',{id:item.id})
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
                </View>
            </TouchableHighlight>
        );
    }
    loadMore(){
        let {dispatch,hasMore,page,loading} = this.props
        console.log(page)
        if(!hasMore || loading) return;
        dispatch({
            type:'home/getData',
            payload:{
                page:page + 1,
            }
        })
    }
    listHeader(imageList){
        return (
            <Image
                style={{flex:1,width:Dimensions.get('window').width,height:280}}
                resizeMode={'cover'}
                source={{ uri: imageList[2] && imageList[2].webformatURL }}
            >
            </Image>
        )
    }
    render() {
        const { imageList = [],loading} = this.props

        return (
            <FlatList
                ListHeaderComponent={()=>this.listHeader(imageList)}
                data={imageList}
                renderItem={this.renderMovie}
                style={styles.list}
                keyExtractor={(item,index) => `${index}`}
                ListEmptyComponent={<Text>no data</Text>}
                ListFooterComponent={FooterCom}
                ListFooterComponentStyle={loading ? {display:'flex'} : {display:'none'}}
                onEndReached={()=>{this.loadMore()}}
            />
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
    }
});
function mapStateToProps(state){
    // console.log(state)
    return {...state.home,loading:state.loading.models.home}
}

export default connect(mapStateToProps)(Home);
// export default connect(state => state.app)(Home)