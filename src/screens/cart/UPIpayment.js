import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
const UpiVerifyScreen = () => {
    return (
        <View>
            <Text>UPI Verify Screen</Text>
            <TextInput
                placeholder="Enter UPI ID"

            />

            <Button title='submit'></Button>
        </View>
    )
}

const styles = StyleSheet.create({})

export default UpiVerifyScreen;