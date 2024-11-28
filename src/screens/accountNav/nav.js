import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "./account";
import AddressScreen from "../ownerProduct/addressScreens/addressScreen";
import AddAddressScreen from "../ownerProduct/addressScreens/addAddress";
import OrderList from "./orderList";
import OrderDetail from "./orderDetail";
import { Provider as OrderProvder } from "../../context/orderContext";
import OrderCancel from "./orderCancel";
// import MerchantTabNavigator from "../ownerProduct/ownerOrders/tabNavigator";


const Stack = createNativeStackNavigator();

const AccountNavigation = () => {
    return (
        <OrderProvder>

            <Stack.Navigator>

                <Stack.Screen name="Account" component={AccountScreen} options={{ 
                    headerShown: true,
                    title: "Account",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "400",
                    },
                    
                }} />
                <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: true, title: "Order list" }} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} 
                options={({ route }) => ({
                    headerTitleStyle: { fontSize: 14 },
                    headerShown: true,
                    title: route.params.title,

                })} />
                <Stack.Screen name="AddressList" component={AddressScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddOrEditAddress" component={AddAddressScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OrderCancel" component={OrderCancel} options={{ headerShown: true, headerTitle: "Cancel order" }} />
                {/* <Stack.Screen name="MerchantTabNavigator" component={MerchantTabNavigator} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </OrderProvder>

    )
}

export default AccountNavigation;