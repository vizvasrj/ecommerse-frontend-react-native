import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";


const CartHeader = ({active}) => {
    let cartStyle = [styles.simple];
    let addressStyle = [styles.simple];
    let paymentStyle = [styles.simple];
    let summaryStyle = [styles.simple];


    if (active == "cart") {
        cartStyle = [styles.simple, styles.doneColor, styles.activeBar];
    }
    if (active == "address") {
        cartStyle = [styles.simple, styles.doneColor];
        addressStyle = [styles.simple, styles.doneColor, styles.activeBar];
    }
    if (active == "payment") {
        cartStyle = [styles.simple, styles.doneColor];
        addressStyle = [styles.simple, styles.doneColor];
        paymentStyle = [styles.simple, styles.doneColor, styles.activeBar];
    }
    if (active == "summary") {
        cartStyle = [styles.simple, styles.doneColor];
        addressStyle = [styles.simple, styles.doneColor];
        paymentStyle = [styles.simple, styles.doneColor];
        summaryStyle = [styles.simple, styles.doneColor, styles.activeBar];
    }
    return (
        <View style={styles.cartHeader}>

            <View style={[cartStyle]}>
                <Text style={styles.cartHeaderText}>cart</Text>
            </View>
            <View style={[addressStyle]}>
                <Text style={styles.cartHeaderText}>address</Text>
            </View>
            <View style={[paymentStyle]}>
                <Text style={styles.cartHeaderText}>payment</Text>
            </View>
            <View style={[summaryStyle]}>
                <Text style={styles.cartHeaderText}>summary</Text>
            </View>
        </View>

    )
}

export default CartHeader;

const styles = StyleSheet.create({
    simple: {
        color: "black",
        flex: 1,
        // backgroundColor: "lightblue",
        padding: 2,
    },
    cartHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    cartHeaderText: {
        textAlign: "center",
    },
    doneColor: {
        backgroundColor: "lightblue",
    },
    activeBar: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }

})