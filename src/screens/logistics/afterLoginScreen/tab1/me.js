import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { primaryColor, secondaryColor } from '../../../../theme/color';
import { Context as AuthContext } from '../../../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Context as LogisticsContext } from '../../../../context/logistics/logisticsContext';

const Me = ({ navigation }) => {
    const {state, logisticsMe} = React.useContext(AuthContext);
    const {state: logisticsState, setLogisticsMeFn} = React.useContext(LogisticsContext);

    React.useEffect(() => {
        if (logisticsState.me === null) {
            logisticsMe(setLogisticsMeFn);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                />
                <Text style={styles.name}>{logisticsState.me ? logisticsState.me?.name : 'NO NAME SAVED'}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {
                            navigation.navigate('EditProfile');
                        }}
                    >
                        <Text style={styles.buttonText}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {
                            AsyncStorage.getItem("logistics_access_token").then((token) => {
                                console.log('token', token);
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>get token for notification</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: primaryColor,
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FF5577",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: primaryColor,
    },
    buttonText: {
        color: 'white',
    },
    container: {
        flex: 1,
    },
});

export default Me;