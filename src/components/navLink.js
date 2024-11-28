import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const NavLink = ({ navigation, text, path }) => {

    return (
        <>
            <TouchableOpacity
            onPress={() => {
                navigation.navigate(path)}

            }
            >
                <Text style={{ color: "#0099ff" }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </>

    )
};

export default NavLink;