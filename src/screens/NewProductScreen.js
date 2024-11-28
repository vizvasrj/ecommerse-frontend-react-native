import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProductScreen from './ownerProduct/addProductScreen';
import NewProductDetailScreen from './ownerProduct/productDetailScreen';
import AddProductItemScreen from './ownerProduct/addProductItemScreen';
import AddBrandScreen from './ownerProduct/addBrandScreen';
import ImageUploaderScreen from './ownerProduct/imageUploaderScreen';
import NewProductListScreen from './ownerProduct/productListScreen';
import AddressScreen from './ownerProduct/addressScreens/addressScreen';
import AddAddressScreen from './ownerProduct/addressScreens/addAddress';

const Stack = createNativeStackNavigator();

const NewOwnerProductScreen = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="NewAddress" component={AddressScreen} options={{headerShown: false}}  /> */}
            <Stack.Screen name="NewProductList" component={NewProductListScreen} options={{headerShown: false}}  />
            <Stack.Screen name="AddressList" component={AddressScreen} options={{headerShown: false}}  />
            {/* <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="AddOrEditAddress" component={AddAddressScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewProductDetail" component={NewProductDetailScreen} options={{headerShown: false}}  />
            <Stack.Screen name="NewImageUploader" component={ImageUploaderScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewAddProductItem" component={AddProductItemScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewAddProduct" component={AddProductScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewAddBrand" component={AddBrandScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

export default NewOwnerProductScreen;