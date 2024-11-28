import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Maps from "./maps";

import ProductsChose from "./productsChose";

const Stack = createNativeStackNavigator();

const Tab2StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Maps" component={Maps}/>
            <Stack.Screen name="ProductsChose" component={ProductsChose}/>
        </Stack.Navigator>
    );
}

export default Tab2StackNav;