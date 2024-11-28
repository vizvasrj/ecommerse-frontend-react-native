import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using this package for icons
import Tab1StackNav from './afterLoginScreen/tab1/stackNav';
import Tab2StackNav from './afterLoginScreen/tab2/stackNav';

const Tab = createBottomTabNavigator();

const LogisticsNav = () => {


    return (
        <Tab.Navigator>
            <Tab.Screen name="Tab1" component={Tab1StackNav}
                options={
                    {
                        headerShown: false,
                        title: "Account",
                        tabBarIcon: ({ color, size }) => (
                            <Icons name="account" color={color} size={size} />
                        )
                    }
                }
            />
            <Tab.Screen name="Tab2" component={Tab2StackNav}
                options={
                    {
                        headerShown: false,
                        title: "Dashboard",
                        tabBarIcon: ({ color, size }) => (
                            <Icons name="home" color={color} size={size} />
                        )
                    }
                }
            />
        </Tab.Navigator>
    );
}

export default LogisticsNav;

