import { ToastAndroid, Text, Button, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useContext } from "react";
import { Context as AuthContext } from "../../context/authContext";
import { Context as ActivateMerchantContext } from '../../context/activateMerchantTabContext';
import { primaryColor } from '../../theme/color';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const AccountScreen = ({ }) => {
    const { state, signout } = useContext(AuthContext);
    const { activateMerchantTab } = useContext(ActivateMerchantContext);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                    navigation.navigate('AddressList', { loadedFrom: "Account" });
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="home" size={24} />
                    <Text style={styles.menuTitle}> Address</Text>
                </View>
                <Text style={styles.menuText}>Manage your addresses</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                    navigation.navigate('OrderList');
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="list-alt" size={24} />
                    <Text style={styles.menuTitle}> Order List</Text>
                </View>
                <Text style={styles.menuText}>View your orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                    ToastAndroid.show("logout pressed.", ToastAndroid.SHORT);
                    signout();
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="sign-out" size={24} />
                    <Text style={styles.menuTitle}> Logout</Text>
                </View>
                <Text style={styles.menuText}>Logout from your account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                    // signout();
                    // navigation.navigate("MerchantTabNavigator")
                    activateMerchantTab(true);
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="shopping-cart" size={24} />
                    <Text style={styles.menuTitle}> Merchant</Text>
                </View>
                <Text style={styles.menuText}>
                    Signup or login as a merchant to sell your products
                </Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    menuButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuText: {
        fontSize: 14,
    },
});
export default AccountScreen;