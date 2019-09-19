
import React from 'react'
import { TabBarBottom, addNavigationHelpers, createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from './pages/Home/Home'
import User from './pages/User/User'
import Detail from './pages/Home/Detail/Detail'

const HomeNavigator = createStackNavigator(
    {
        Home:Home,
        Detail:Detail
    }
)
//
// const AppNavigator = createBottomTabNavigator(
//     {
//         Home: HomeNavigator,
//         User: {screen: User},
//     }
// );

const App = createAppContainer(HomeNavigator);

export default App