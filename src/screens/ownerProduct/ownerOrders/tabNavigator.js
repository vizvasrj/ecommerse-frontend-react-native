import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

import MerchantNavigation from './nav';
import Products from './productNav';
import MerchantConfig from './merchantConfig';
import { FAB } from 'react-native-paper'
import { Provider as MerchantProvider } from '../../../context/merchantOrdersContext';
import { useNavigation } from '@react-navigation/native';
import { Context as ShopContext } from '../../../context/shopContext';
const MerchantTabNavigator = ({ }) => {
    const navigation = useNavigation();
    const {state, listMyShops} = React.useContext(ShopContext);
    
    React.useEffect(() => {
        listMyShops();
    }, [])

    return (
        <MerchantProvider>


                <Tab.Navigator
                    initialRouteName="Products"
                    screenOptions={({ route }) => {
                        return {
                            tabBarActiveTintColor: '#e91e63',
                        };
                    }}
                >
                    <Tab.Screen name="Products" component={Products}
                        options={
                            {
                                headerShown: false,
                                tabBarLabel: "Products",
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name="cart" color={color} size={size} />
                                ),
                            }
                        }
                    />
                    <Tab.Screen name="MerchantNavigation" component={MerchantNavigation}
                        options={
                            {
                                headerShown: false,
                                tabBarLabel: "Orders",
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name="home" color={color} size={size} />
                                ),
                            }

                        }
                    />
                    <Tab.Screen name="MerchantConfig" component={MerchantConfig}
                        options={
                            {
                                headerShown: false,
                                tabBarLabel: "Configuration",
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name="view-headline" color={color} size={size} />
                                ),
                            }
                        }
                    />
                </Tab.Navigator>
                <FAB
                    style={{ position: 'absolute', margin: 16, right: 0, bottom: 50 }}
                    small={true}
                    icon="plus"
                    onPress={() => {
                        console.log('Pressed');
                        navigation.navigate("Products", { screen: "NewAddProduct" })

                    }}
                />
                 <FAB
                    style={{ position: 'absolute', margin: 16, right: 0, bottom: 120 }}
                    small={true}
                    icon="home"
                    onLongPress={() => {
                        console.log("home screen")
                    }}
                    onPress={() => {
                        // console.log('Pressed');
                        // navigation.navigate("Products", { screen: "AddProducts" })
                        console.log(state.defaultShop, "state.defaultShop")

                    }}
                />

        </MerchantProvider>
    );
}



export default MerchantTabNavigator;