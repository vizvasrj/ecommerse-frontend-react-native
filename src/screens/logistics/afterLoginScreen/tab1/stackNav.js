import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChangePassword from "./changePassword";
import MyShops from "./myShops";
import Account from "./account";
import Me from "./me";
import EditProfile from "./editProfile";
const Stack = createNativeStackNavigator();

const Tab1StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>
            <Stack.Screen name="MyShops" component={MyShops}/>
            <Stack.Screen name="Me" component={Me}/>
            <Stack.Screen name="EditProfile" component={EditProfile}/>
        </Stack.Navigator>
    );
}

export default Tab1StackNav;