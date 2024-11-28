import React, {useEffect} from 'react';
import {getApps, GetAppResult} from 'react-native-map-link';
import {Image, Pressable, Text, View, Button} from 'react-native';

import GetLocation from 'react-native-get-location'
const MapScreen = () => {
    const loc = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }
    return (
        <View>
        <Text>Map Screen</Text>
        <Button title="get location"
            onPress={loc}
        />
            </View>
    );
}

export default MapScreen;