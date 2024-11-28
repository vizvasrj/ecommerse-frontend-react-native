import React, { useState, useContext, useEffect, useRef } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderFilter from "./orderFilter";
import OwnerOrdersScreen from "./orders";
import { Context as MerchantContext } from "../../../context/merchantOrdersContext";
import { Animated, View, TouchableOpacity, Text } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MerchantMap from "./map";
const Stack = createNativeStackNavigator();

const MerchantNavigation = () => {
    const { state } = useContext(MerchantContext);

    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const slideHeaderDown = () => {
        Animated.timing(slideAnimation, {
            toValue: 200, // Slide the header down by 100 pixels
            duration: 500, // Adjust the duration as needed
            useNativeDriver: false, // To avoid certain warnings
        }).start(() => setIsHeaderVisible(true));
    };

    const slideHeaderUp = () => {
        Animated.timing(slideAnimation, {
            toValue: 0, // Slide the header back up to the top
            duration: 500, // Adjust the duration as needed
            useNativeDriver: false, // To avoid certain warnings
        }).start(() => setIsHeaderVisible(false));
    };

    const headerRightMerchant = () => {
        return (
            <>
                <View style={{ width: 10 }}></View>
                <TouchableOpacity onPress={() => alert('This is a filter!')}>
                    <Icons name="filter" size={30} color="#556" />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => isHeaderVisible ? slideHeaderUp() : slideHeaderDown()}>
                    <Text>{isHeaderVisible ? 'Slide Up' : 'Slide Down'}</Text>
                </TouchableOpacity> */}
            </>
        );
    };


    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="MerchantMap" component={MerchantMap} /> */}
            <Stack.Screen name="OrderFilter" component={OrderFilter}
                options={{
                    headerShown: true,
                    // title: "Orders filter",
                    // headerStyle: {
                    //     backgroundColor: "#f4511e",
                    // },
                    // headerTintColor: "#fff",
                    // headerTitleStyle: {
                    //     fontWeight: "400",
                    // },
                }}
            />

            <Stack.Screen name="OwnerOrders" component={OwnerOrdersScreen}
                options={{
                    headerRight: headerRightMerchant,
                    headerShown: true,
                    // title: "Your's Orders " + state.year +"/"+ state.month,
                    // headerStyle: {
                    //     backgroundColor: "#f4511e",
                    // },
                    // headerTintColor: "#fff",
                    // headerTitleStyle: {
                    //     fontWeight: "300"
                    // },
                }}
            />
        </Stack.Navigator>
    )
}

export default MerchantNavigation;