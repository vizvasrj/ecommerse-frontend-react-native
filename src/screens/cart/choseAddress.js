import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import CartHeader from '../../components/new/cartHeader';

const ChoseAddress = ({ route, navigation }) => {
    return (
        <View>
            <CartHeader active={"address"} />
            <Text>ChoseAddress</Text>
        </View>
    )



}

export default ChoseAddress;