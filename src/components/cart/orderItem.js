import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { darkOne, secondaryColor } from "../../theme/color";
import ThumbnailImage from "../thumbnailImage";
import { useNavigation } from "@react-navigation/native";
import OrderItemDetails from "./orderItemDetails";
const OrderItem = ({ orderItem, onPress, style, cancelled }) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.orderItem, style]}>
            <OrderItemDetails orderItem={orderItem} />
            <View>
                {cancelled ? (<Text style={{ color: "red" }}>Cancelled</Text>)
                    : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onPress}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    )}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: darkOne,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 5,
        padding: 10,
        backgroundColor: "#ff0000",
        borderRadius: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
    },
});

export default OrderItem;