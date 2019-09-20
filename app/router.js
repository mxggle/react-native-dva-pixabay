
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from './pages/Home/Home'
import Demos from './pages/Demos/Demos'
import Detail from './pages/Home/Detail/Detail'

const HomeNavigator = createStackNavigator(
    {
        Home:Home,
        Detail:Detail
    },{
        navigationOptions:{
            tabBarLabel:'图片',
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

)
const DemoNavigator = createStackNavigator(
    {
        Demo:Demos,
    },{
        navigationOptions:{
            tabBarLabel:'Demo',
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

)
const AppNavigator = createBottomTabNavigator(
    {
        Home: {screen:HomeNavigator},
        Demo: {screen: DemoNavigator},
    },{
        tabBarOptions:{
            showIcon:false,
            labelStyle: {
                fontSize: 16,
                lineHeight:50
            },
            // activeTintColor:'#00f'
        }
    }
);

const App = createAppContainer(AppNavigator);

export default AppNavigator