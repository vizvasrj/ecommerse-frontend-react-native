import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';

const QuantityInput = ({quantity, setQuantity}) => {

  const handleIncrement = () => {
    // Implement logic to increase quantity
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    // Implement logic to decrease quantity, but not less than 1
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={quantity.toString()}
        keyboardType="numeric"
        onChangeText={(text) => {
          // Implement logic to handle text input changes if needed
          const parsedValue = parseInt(text, 10);
          setQuantity(isNaN(parsedValue) ? 1 : parsedValue);
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    width: 50,
  },
});

export default QuantityInput;
