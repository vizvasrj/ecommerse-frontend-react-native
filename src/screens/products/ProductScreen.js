import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "@rneui/base";
import Spacer from "../../components/Spacer";
import { TouchableOpacity } from "react-native";

const data = {
    "love": "me",
    "love2": "everything"
}

const ProductUtilsScreen = ({navigation}) => {
    return (
        <>
            <Text>product screen? {data.love}</Text>
            <Spacer/>
            <TouchableOpacity 
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("ImageUploader")
                }}
            >
                <Text>
                    Image uploader
                </Text>
            </TouchableOpacity>
        </>
    )
}

export default ProductUtilsScreen;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "green",
        borderRadius: 50,
        alignItems: "center",
        padding: 10
    },
})