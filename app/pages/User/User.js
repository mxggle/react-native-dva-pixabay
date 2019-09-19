import React from 'react'
import { View,Text } from 'react-native'
import { connect } from 'react-redux';
class  User extends React.Component{
    static navigationOptions = {
        title: 'user',
        headerStyle: {
            backgroundColor: '#fff',
        },
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

export default connect(state => state.app)(User)