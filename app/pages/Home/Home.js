import React from 'react'
import { Image, FlatList, StyleSheet, Text, View,TouchableHighlight } from 'react-native'
import { connect } from 'react-redux';
function FooterCom(){
    return (
        <Text style={styles.loading}>loading...</Text>
    )
}

class  Home extends React.Component{
    constructor(props){
        super(props)
        // console.log('props',this.props)
        this.renderMovie = this.renderMovie.bind(this)
    }
    static navigationOptions = {
        title: 'Home'
    };
    goDetail(item){
        this.props.navigation.navigate('Detail',{id:item.id})
    }
    renderMovie({ item }) {
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档

        return (
            <TouchableHighlight onPress={()=>{this.goDetail(item)}} underlayColor="white">
                <View style={styles.container}>
                    <Image
                        source={{ uri: item.webformatURL }}
                        style={styles.thumbnail}
                    />
                    {/*<Image*/}
                        {/*source={{ uri: item.previewURL }}*/}
                        {/*style={styles.thumbnail}*/}
                    {/*/>*/}
                    {/*<View style={styles.rightContainer}>*/}
                        {/*<Text style={styles.title}>{item.user}</Text>*/}
                        {/*<Text style={styles.year}>{item.tags}</Text>*/}
                    {/*</View>*/}
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
    render() {
        const { imageList = [],loading} = this.props

        return (
            <FlatList
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
        width: 150,
        height: 200
    },
    list: {
        paddingTop: 20,
        backgroundColor: "#F5FCFF"
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