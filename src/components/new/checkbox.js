import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icons from 'react-native-vector-icons/FontAwesome';


const CustomCheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      {checked ? (
        <Icons name="check-square-o" size={24} color="green" />
      ) : (
        <Icons name="square-o" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    // borderWidth: 1,
    // borderColor: "black",
    padding: 5,
    // borderRadius: 5,
  },
});

export default CustomCheckBox;
