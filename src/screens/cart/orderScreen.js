import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";

const Checkout = ({ route, navigation }) => {
    const shopping_cart_item_ids = [{
        "product_item_id": "59",
        "quantity": "2",
    }, {
        "product_item_id": "68",
        "quantity": "3",
    }];
    // const shopping_cart_item_ids = route.params.shopping_cart_item_ids;
    // 
    return (
        <View>
            <Text>Checkout</Text>
            {shopping_cart_item_ids.map(item => {
                return (
                    <View key={item.product_item_id}>
                        <Text>PID: {item.product_item_id}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                    </View>
                )
            }
            )}
        </View>
    )
}

const styles = StyleSheet.create({

})


export default Checkout;