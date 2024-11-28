import React from "react";
import { View, StyleSheet } from "react-native";
import { primaryColor } from "../../theme/color";

const RadioButton = ({ selected }) => (
    <View style={styles.radioButton}>
        {selected && <View style={styles.radioButtonInner} />}
    </View>
);

export default RadioButton;

const styles = StyleSheet.create({
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: primaryColor,
    },
});