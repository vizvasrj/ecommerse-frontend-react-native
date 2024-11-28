import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectShopScreen from '../../products/SelectShopScreen';
import CategorySearcherSelectScreen from '../../products/CategorySearchSelect';
import ProductUtilsScreen from '../../products/ProductScreen';
import SelectCategoryScreen from '../../products/SelectCategoryScreen';

import AddProductItemScreen from '../addProductItemScreen';
import AddBrandScreen from '../addBrandScreen';
import AddProductScreen from '../addProductScreen';
import ImageUploaderScreen from '../imageUploaderScreen';
import NewProductDetailScreen from '../productDetailScreen';
import ProductMenu from './productMenu';
import IncompleteProducts from './incompleteProducts';
import ProductVariantsScreen from '../productVariantsScreen';
const Stack = createNativeStackNavigator();
import { Context as MerchantProductContext } from '../../../context/merchant/merchantProductContext';
import MerchantProducts from './ownerProducts';
import AllProductScreen from './allProductScreen';
// import MerchantMap from './map';
// import MapScreen from './linkMap';
import Mymap from './mapbox';
import GoogleMap from './googlemap';
// import { Provider as LocationProvider } from '../../../context/LocationContext';
const Products = () => {
    const { state, } = React.useContext(MerchantProductContext);


    return (
        // <LocationProvider>


        <Stack.Navigator>


            <Stack.Screen name="Mymap" component={Mymap} />
            <Stack.Screen name="ProductMenu" component={ProductMenu} />
            {/* <Stack.Screen name="GoogleMap" component={GoogleMap} /> */}
            <Stack.Screen name="NewAddProductItem" component={AddProductItemScreen}
                options={{ headerShown: true, title: state.headerName }}
            />
            <Stack.Screen name="ProductVariants" component={ProductVariantsScreen}
                options={{ headerShown: true, title: state.headerName }}
            />
            <Stack.Screen name="IncompleteProducts" component={IncompleteProducts}
                options={{ headerShown: true, title: "Incompleted product" }}
            />
            <Stack.Screen name="MerchantProducts" component={MerchantProducts} />

            <Stack.Screen name="SelectShopScreen" component={SelectShopScreen} />
            <Stack.Screen name="CategorySearcherSelect" component={CategorySearcherSelectScreen} />
            <Stack.Screen name="ProductUtils" component={ProductUtilsScreen} />
            <Stack.Screen name="SelectCategory" component={SelectCategoryScreen} />
            <Stack.Screen name="NewProductDetail" component={NewProductDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="NewImageUploader" component={ImageUploaderScreen}
                options={{ headerShown: true, title: state.headerName }}
            />
            <Stack.Screen name="NewAddProduct" component={AddProductScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="NewAddBrand" component={AddBrandScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="AllProductScreen" component={AllProductScreen}
                options={{
                    headerShown: false,
                    title: "All Products"
                }}
            />



        </Stack.Navigator>
        // </LocationProvider>

    );
}

export default Products;