/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AuthNavScreen from './src/screens/AuthNavigationScreen';
import { Text } from 'react-native';
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as CartProvider } from './src/context/cartContext';
import { Provider as MerchantActivateProvider } from './src/context/activateMerchantTabContext';
const App = () => {
    return (
        <AuthProvider>
            <MerchantActivateProvider>
                <CartProvider>
                    <AuthNavScreen>

                        <Text>?</Text>
                    </AuthNavScreen>

                </CartProvider>
            </MerchantActivateProvider>
        </AuthProvider>
    );
};

export default App;
