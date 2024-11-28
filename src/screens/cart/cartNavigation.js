import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from './cartScreen';
import OrderScreen from './orderScreen';
import CartScreen2 from './CartScreen2';
// import AddressScreen from './choseAddress';
import PaymentScreen from './chosePayment';
import PurchaseSummary from './purchaseSummary';
import AddressScreen from '../ownerProduct/addressScreens/addressScreen';
import AddAddressScreen from '../ownerProduct/addressScreens/addAddress';

const Stack = createNativeStackNavigator();

const CartNavigation = () => {
    return (
        <Stack.Navigator>
            
            <Stack.Screen name="CartList2" component={CartScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddressList" component={AddressScreen} options={{headerShown: false}} />
            <Stack.Screen name="AddOrEditAddress" component={AddAddressScreen} options={{headerShown: false}} />

            <Stack.Screen name="PurchaseSummary" component={PurchaseSummary} options={{ headerShown: false }} />

            <Stack.Screen name="CartList" component={CartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Checkout" component={OrderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default CartNavigation;  