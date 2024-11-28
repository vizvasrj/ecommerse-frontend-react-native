import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const CustomDropdown = ({ selectedValue, onValueChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(selectedValue);

    const dropdownOptions = [1, 2, 3, 4];

    const handleDropdownOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleDropdownClose = () => {
        setIsOpen(false);
    };

    const handleValueChange = (value) => {
        setValue(value);
        onValueChange(value);
        setIsOpen(false);
    };

    return (
        <View style={styles.dropdownContainer}>
            <Pressable style={styles.dropdownButton} onPress={handleDropdownOpen}>
                <Text style={styles.dropdownButtonText}>{value}</Text>
                {isOpen ? (
                    <View style={styles.dropdownArrowUp} />
                ) : (
                    <View style={styles.dropdownArrowDown} />
                )}
            </Pressable>
            {isOpen && (
                <View style={styles.dropdownOptionsContainer}>
                    {dropdownOptions.map((option) => (
                        <Pressable
                            key={option}
                            style={styles.dropdownOption}
                            onPress={() => handleValueChange(option)}
                        >
                            <Text style={styles.dropdownOptionText}>{option}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        width: 60,
        // zIndex: 12
    },
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
    },
    dropdownButtonText: {
        fontSize: 16,
    },
    dropdownArrowUp: {
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderStyle: "solid",
        borderColor: "#000",
        transform: [{ rotate: "45deg" }],
    },
    dropdownArrowDown: {
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 10,
        borderStyle: "solid",
        borderColor: "#000",
        transform: [{ rotate: "-45deg" }],
    },
    dropdownOptionsContainer: {
        position: "absolute",
        top: 35,
        maxHeight: 140,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        zIndex: 120,

    },
    dropdownOption: {
        padding: 5,
        zIndex: 120,
    },
    dropdownOptionText: {
        fontSize: 16,
    },
});

export default CustomDropdown;