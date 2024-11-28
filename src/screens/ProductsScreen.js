import React, { useState, useRef } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageUploaderScreen from './products/ImageUploadScreen';
import ProductUtilsScreen from './products/ProductScreen';
const Stack = createNativeStackNavigator();
import AddProducts from './products/AddProducts';
import { Provider as ProductAddProvider } from '../context/productAddContext';
import CategorySearcherSelectScreen from './products/CategorySearchSelect';
import SelectCategoryScreen from './products/SelectCategoryScreen';
import SelectShopScreen from './products/SelectShopScreen';
import ProductDetailScreen from './products/ProductDetail';
import { Provider as ShopProvider } from '../context/shopContext';
import ProductListScreen from './products/productList';
import { TouchableOpacity, TextInput, View, Animated, Text } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto'

import { Provider as CartProvider } from '../context/cartContext';
import { Provider as MerchantProvider } from '../context/merchantOrdersContext';
import { Context as MerchantContext } from '../context/merchantOrdersContext';
// import OwnerOrdersScreen from './ownerProduct/ownerOrders/orders';
// import OrderFilter from './ownerProduct/ownerOrders/orderFilter';
import MerchantNavigation from './ownerProduct/ownerOrders/nav';

const ProductsScreen = () => {

    const [searchQuery, setSearchQuery] = React.useState('');
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
    const handleSearchInput = (text) => {
        setSearchQuery(text);
        // You can add your search logic here
        // For example, you can filter and update the product list based on the searchQuery.
    };
    const headerRight = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={handleSearchInput}
                        style={{ fontSize: 18, marginRight: 10 }}
                    />
                    <TouchableOpacity onPress={() => alert('This is a search!')}>
                        <Fontisto name="search" size={23} color="#556" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: 10 }}></View>
                <TouchableOpacity onPress={() => alert('This is a filter!')}>
                    <Icons name="filter" size={30} color="#556" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => isHeaderVisible ? slideHeaderUp() : slideHeaderDown()}>
                    <Text>{isHeaderVisible ? 'Slide Up' : 'Slide Down'}</Text>
                </TouchableOpacity>
            </>
        );
    };


    // const slideHeader = () => {
    //     return (
    //         <Animated.View
    //             style={{
    //                 position: 'absolute',
    //                 top: 0,
    //                 left: 0,
    //                 right: 0,
    //                 backgroundColor: '#fff',
    //                 height: slideAnimation,
    //                 zIndex: 100,
    //             }}>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
    //                 <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products</Text>
    //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     <TextInput
    //                         placeholder="Search..."
    //                         value={searchQuery}
    //                         onChangeText={handleSearchInput}
    //                         style={{ fontSize: 18, marginRight: 10 }}
    //                     />
    //                     <TouchableOpacity onPress={() => alert('This is a search!')}>
    //                         <Fontisto name="search" size={23} color="#556" />
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </Animated.View>
    //     );
    // }

    return (
        <>
            <CartProvider>
                <ShopProvider>

                    <ProductAddProvider>
                        <MerchantProvider>
                            <Stack.Navigator initialRouteName="Product">


                                {/* ! s */}
                                {/* <Stack.Screen name="MerchantOrders"
                                    options={{
                                        title: "Merchant",
                                        headerShown: false
                                    }}
                                >
                                    {(props) => <MerchantNavigation {...props} />}
                                </Stack.Screen> */}
                                
                                <Stack.Screen name="SelectShopScreen"
                                >
                                    {(props) => <SelectShopScreen {...props} />}
                                </Stack.Screen>

                                <Stack.Screen
                                    name="ProductList"
                                    options={{
                                        headerRight: headerRight,
                                        title: "",
                                    }}
                                >
                                    {
                                        (props) => <ProductListScreen
                                            slideAnimation={slideAnimation}
                                            slideHeaderUp={slideHeaderUp}
                                            searchQuery={searchQuery}
                                            setSearchQuery={setSearchQuery}
                                            {...props}
                                        />}
                                </Stack.Screen>



                                <Stack.Screen name="AddProducts"
                                >
                                    {(props) => <AddProducts {...props} />}
                                </Stack.Screen>

                                <Stack.Screen name="ImageUploader">
                                    {(props) => <ImageUploaderScreen {...props}></ImageUploaderScreen>}
                                </ Stack.Screen>




                                <Stack.Screen name="CategorySearcherSelect"
                                >
                                    {(props) => <CategorySearcherSelectScreen {...props} />}
                                </Stack.Screen>



                                <Stack.Screen name="ProductUtils">
                                    {(props) => <ProductUtilsScreen {...props}></ProductUtilsScreen>}
                                </ Stack.Screen>

                                <Stack.Screen name="SelectCategory">
                                    {(props) => <SelectCategoryScreen {...props}></SelectCategoryScreen>}
                                </ Stack.Screen>


                                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

                            </Stack.Navigator>
                        </MerchantProvider>
                    </ProductAddProvider>
                </ShopProvider>
            </CartProvider>

        </>
    );
};

export default ProductsScreen;