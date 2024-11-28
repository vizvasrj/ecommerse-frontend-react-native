import { ToastAndroid, Text, Button, TouchableOpacity, View } from 'react-native';
import React, { useContext } from "react";
import { Context as AuthContext } from "../context/authContext";
import { primaryColor } from '../theme/color';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = ({ }) => {
    const { state, signout } = useContext(AuthContext);
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flex: 1, padding: 20 }}>
                <View style={{ padding: 5 }}>
                    <TouchableOpacity style={{ borderRadius: 10, padding: 10, justifyContent: "center", alignItems: "center", backgroundColor: primaryColor }}
                        onPress={() => {
                            navigation.navigate('AddressList');
                        }}
                    >
                        <Text style={{ backgroundColors: primaryColor }}>
                            Address
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ padding: 5 }}>
                    <TouchableOpacity style={{ borderRadius: 10, padding: 10, justifyContent: "center", alignItems: "center", backgroundColor: primaryColor }}
                        onPress={() => {
                            // ToastAndroid.show("logout pressed.", ToastAndroid.SHORT);
                            navigation.navigate('OrderList');
                        }}        
                    >
                        <Text style={{ backgroundColors: primaryColor }}>
                            Order List
                        </Text>
                    </TouchableOpacity>

                </View>

                
                <View style={{ padding: 5 }}>
                    <TouchableOpacity style={{ borderRadius: 10, padding: 10, justifyContent: "center", alignItems: "center", backgroundColor: primaryColor }}
                        onPress={() => {
                            ToastAndroid.show("logout pressed.", ToastAndroid.SHORT);
                            signout();
                        }}        
                    >
                        <Text style={{ backgroundColors: primaryColor }}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>

                

            </View>
        </>
    )
}

export default AccountScreen;