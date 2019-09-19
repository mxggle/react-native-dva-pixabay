// In App.js in a new project

import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
class Detail extends React.Component {
    static navigationOptions = {
        title: 'Detail',
    };
    render() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        console.log(id)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}
function mapStateToProps(state){
    return {...state.app}
}

export default connect(mapStateToProps)(Detail);
// export default connect(state => state.app)(Detail)