// In App.js in a new project

import React from 'react';
import { View, Text ,Image,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {withNavigationFocus} from 'react-navigation'
class Detail extends React.Component {
    static navigationOptions = {
        title: 'Detail',
    };
    componentDidMount(){
        const {dispatch,isFocused,navigation} = this.props;
        if(isFocused){
            const id = navigation.getParam('id');
            dispatch({
                type:'detail/getData',
                payload:{
                    id
                }
            })
        }
    }

    render() {
        const { navigation,imgDetail } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        // console.log(imgDetail)
        const { largeImageURL,views,downloads,favorites,likes,comments} = imgDetail;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'transparent'}}>
                <Image
                    resizeMode={'contain'}
                    style={{width:Dimensions.get('window').width,height:280}}
                    source={{uri: largeImageURL}}
                />
                <View style={{flex:1}}>
                    <Text>查看数: {views}</Text>
                    <Text>下载数: {downloads}</Text>
                    <Text>收藏数：{favorites}</Text>
                    <Text>点赞数：{likes}</Text>
                    <Text>评论数: {comments}</Text>
                </View>
            </View>
        );
    }
}
function mapStateToProps(state){
    return {...state.detail}
}

export default connect(mapStateToProps)(withNavigationFocus(Detail));
// export default connect(state => state.app)(Detail)