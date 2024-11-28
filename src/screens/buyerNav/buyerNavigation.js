// tabScreenOptions.js
import React, { useEffect, useContext, useState } from 'react';
import { Text } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using this package for icons
import { Context as CartContext } from '../../context/cartContext';

import AccountNavigation from '../accountNav/nav';
import HomeScreen from '../HomeScreen';
import NewOwnerProductScreen from '../NewProductScreen';
import CartNavigation from '../cart/cartNavigation';


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();


const BuyersNavigation = ({ route }) => {
    const { state: CartState, cartCountfn } = useContext(CartContext);

    const [isSignedOut, SetIsSignedOut] = useState(true);
    const toSignOut = (value) => {
        SetIsSignedOut(value);
    }
    useEffect(() => {
        cartCountfn();
    }, []);


    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => {
                    return {

                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === 'AccountNavigation') {
                                iconName = focused
                                    ? 'account-circle'
                                    : 'account-circle-outline';
                            } else if (route.name === 'Home') {
                                iconName = focused
                                    ? 'home'
                                    : 'home-outline';
                            } else if (route.name === 'NewOwnerProduct') {
                                iconName = focused
                                    ? 'shopping'
                                    : 'shopping-outline';
                            } else if (route.name === 'Cart') {
                                iconName = focused
                                    ? 'cart'
                                    : 'cart-outline';
                                return (
                                    <>
                                        <Icons name={iconName} size={size} color={color} />
                                        <Text
                                            style={{
                                                marginTop: -30,
                                                marginRight: -20,
                                                color: 'white',
                                                backgroundColor: 'red',
                                                borderRadius: 10,
                                                width: 20,
                                                height: 20,
                                                textAlign: 'center',
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                                marginLeft: 10,
                                                verticalAlign: 'middle',
                                            }}
                                        >{CartState.cart_count}</Text>
                                    </>
                                )
                            } else {
                                iconName = focused ? 'application-cog' : 'application-settings-outline';
                            }

                            return <Icons name={iconName} size={size} color={color} />
                        }
                    }

                }}
            >
                {/* <Tab.Screen name="Products" options={{ headerShown: false }}>
                                {(props) => <ProductsScreen {...props} />}
                            </Tab.Screen> */}

                <Tab.Screen name="AccountNavigation"
                    options={{ headerShown: false, tabBarLabel: 'Account' }}

                >
                    {(props) => <AccountNavigation {...props} />}
                </Tab.Screen>
                <Tab.Screen name="NewOwnerProduct" options={{ headerShown: false, title: "Products" }}>
                    {(props) => <NewOwnerProductScreen {...props} />}
                </Tab.Screen>
                <Tab.Screen name="Cart">
                    {(props) => <CartNavigation {...props} />}
                </Tab.Screen>

                <Tab.Screen name="Home"
                >
                    {(props) => <HomeScreen {...props} toSignOut={toSignOut} />}
                </Tab.Screen>




            </Tab.Navigator>
        </>
    );
}

export default BuyersNavigation;