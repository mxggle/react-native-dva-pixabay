import React from 'react'
import { View,Text } from 'react-native'
import { connect } from 'react-redux';
class  Demos extends React.Component{
    static navigationOptions = {
        title: '可用库列表'
    };
    render() {
        const { user = ''} = this.props
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>{user}</Text>
            </View>
        );
    }
}
function mapStateToProps(state){
    // console.log(state)
    return {...state.home,loading:state.loading.models.home}
}
export default connect(mapStateToProps)(Demos)