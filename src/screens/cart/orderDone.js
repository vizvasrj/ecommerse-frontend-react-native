import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SplashScreen = ({ onEnd }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onEnd();
        }, 2000); // Show the screen for 2 seconds

        return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }, [onEnd]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thank you, your order has been placed!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default SplashScreen;