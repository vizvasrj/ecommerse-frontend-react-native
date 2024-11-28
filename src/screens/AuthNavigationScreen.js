import React, { useState, useContext, useEffect } from "react";
import { Text } from "@rneui/base";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import { View, ActivityIndicator } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountNavigation from "./accountNav/nav";
import HomeScreen from "./HomeScreen";
import EmailVerifyScreen from "./EmailVerifyScreen";
import NewOwnerProductScreen from "./NewProductScreen";
import CartNavigation from './cart/cartNavigation';
import MerchantTabNavigator from "./ownerProduct/ownerOrders/tabNavigator";
import BuyersNavigation from "./buyerNav/buyerNavigation";

import LogisticsLoginScreen from "./logistics/loginLogistics";
import LogisticsSignUpScreen from "./logistics/signupLogistics";

import { Context as ActivateMerchantContext } from "../context/activateMerchantTabContext";
import { Context as AuthContext } from "../context/authContext";
import { Context as CartContext } from "../context/cartContext";
import { Provider as ShopProvider } from "../context/shopContext";
import { Provider as ProductAddProvider } from "../context/productAddContext";
import { Provider as MerchantProductContext } from "../context/merchant/merchantProductContext";
import LogisticsNav from "./logistics/navLogistics";

import { Provider as LogisticsProvider } from "../context/logistics/logisticsContext";

import authApi from '../api/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavScreen = ({ children }) => {
    const { state, tryLocalSignin, tryLocalSigninLogistics, authMeFn } = useContext(AuthContext);

    const { state: ActivateMerchantState, tryLocalMerchantTab } = useContext(ActivateMerchantContext);

    
    

    useEffect(() => {

        const checkAuthAndMerchantTab = async () => {
            await Promise.all([
                tryLocalSignin(), 
                tryLocalMerchantTab(), 
                tryLocalSigninLogistics(),
            ]);
            setIsLoading(false); // set loading to false after checking
        };
        checkAuthAndMerchantTab();
    }, [])

    // useEffect(() => {
    //     console.log("from AuthNavScreen useEffect for authMeFn", state.tokenAlive, state.token)
    //     authMeFn(state.token)
    // }, [])

    const [isLoading, setIsLoading] = useState(true); // new state for loading
    
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );

    }

    return (

        <NavigationContainer>
            {state.token ? (
                ActivateMerchantState.merchantTab ? (
                    <ShopProvider>
                        <ProductAddProvider>
                            <MerchantProductContext>
                                <MerchantTabNavigator />
                            </MerchantProductContext>
                        </ProductAddProvider>
                    </ShopProvider>
                ) : (
                    <BuyersNavigation />
                )
            ) : state.logisticsToken ? (
                <LogisticsProvider>
                    <LogisticsNav />
                </LogisticsProvider>
            ) : (
                <Stack.Navigator initialRouteName="Auth">
                    <Stack.Screen name="Login">
                        {(props) => <LoginScreen {...props}></LoginScreen>}
                    </ Stack.Screen>
                    <Stack.Screen name="Signup">
                        {(props) => <SignupScreen {...props}></SignupScreen>}
                    </ Stack.Screen>
                    <Stack.Screen name="EmailVerifyScreen">
                        {(props) => <EmailVerifyScreen {...props}></EmailVerifyScreen>}
                    </ Stack.Screen>

                    <Stack.Screen name="LogisticsLoginScreen" component={LogisticsLoginScreen} ></Stack.Screen>
                    <Stack.Screen name="LogisticsSignUpScreen" component={LogisticsSignUpScreen} ></Stack.Screen>

                    
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default AuthNavScreen;