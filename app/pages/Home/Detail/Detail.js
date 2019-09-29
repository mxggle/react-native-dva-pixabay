import React from 'react'
import {
    View,
} from 'react-native'
import { connect } from 'react-redux';
import PhotoList from 'components/PhotoList'
import { withNavigationFocus } from 'react-navigation';


class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.searchKey = props.navigation.getParam('searchKey')
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('searchKey', 'detail'),
            headerTransparent:false,
            headerStyle: {
                backgroundColor: "#fff"
            },
            headerTitleStyle: {
                color: "#000"
            }
        };
    };
    componentDidMount(){
        const {dispatch,isFocused} = this.props;
        // console.log(this.props.navigation.getParam('searchKey'));
        if(isFocused){
            dispatch({
                type:'detail/save',
                payload:{
                    imageList:[]
                }
            })  
            dispatch({
                type:'detail/getData',
                payload:{
                    searchKey:this.searchKey
                }
            })   
        }
    }
    loadMore(){
        const {dispatch,hasMore,loading,page} = this.props;
        console.log('loading',loading);
        if(!hasMore || loading) return;
        console.log(this.searchKey);
        dispatch({
            type:'detail/getData',
            payload:{
                page:page + 1,
                searchKey:this.searchKey
            }
        })
    }
    render() {
        const { loading,imageList } = this.props;
        return (
            <View style={{flex:1, backgroundColor: "#fff"}}>
                <PhotoList 
                    loading={loading}
                    data={imageList}
                    loadMore={()=>this.loadMore()}
                />
            </View>
        );
    }
}
function mapStateToProps(state){
    return {...state.detail,loading:state.loading.models.detail}
}

export default connect(mapStateToProps)(withNavigationFocus(Detail));