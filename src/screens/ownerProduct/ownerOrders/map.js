// import React, { useContext, useEffect, useState, useCallback } from 'react';
// import { View, StyleSheet, Button, ScrollView, Text } from "react-native";
// import MapView, { Polyline, Circle, PROVIDER_DEFAULT } from 'react-native-maps';
// import useLocation from '../../../hooks/useLocation';
// import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy, getCurrentPositionAsync } from 'expo-location';
// import { Context as LocationContext } from '../../../context/LocationContext';

// import * as Location from 'expo-location';

// const MerchantMap = ({ navigation }) => {
//     const { state, addLocation, state: { currentLocation, locations } } = useContext(LocationContext);

//     const [isFocussed, SetIsFocessed] = useState(false)
//     const callback = useCallback((location) => {
//         addLocation(location, state.recording)

//     }, [state.recording])

//     const [err] = useLocation(isFocussed || state.recording, callback);
//     useEffect(() => {
//         const dosomething = navigation.addListener('blur', () => {
//             console.log(navigation.isFocused());
//             SetIsFocessed(false)
//         });

//     }, [navigation]);

//     useEffect(() => {
//         const dosomething = navigation.addListener('focus', () => {
//             console.log(navigation.isFocused());
//             SetIsFocessed(true)
//         });

//     }, [navigation]);

//     const printCurrentLocation = async () => {
//         let { status } = await requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             setErr("Permission to access location was denied");
//         }

//         let loc = await getCurrentPositionAsync({});
//         console.log(loc, "from loc")
//     }

//     const getLocationPermission = async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             console.error('Permission to access location was denied');
//             return;
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         console.log(location);
//     }



//     return (
//         <ScrollView
//             style={{
//                 // flex: 1,
//                 // justifyContent: 'space-between',
//                 // alignItems: 'center',

//                 // Paddings to handle safe area
//                 // paddingTop: insets.top,
//                 // paddingBottom: insets.bottom,
//                 // paddingLeft: insets.left,
//                 // paddingRight: insets.right,
//             }}
//         >
//             <Text style={{}} h3>
//                 TrackCreateScreen
//             </Text>
//             <MapView
//                 style={{ height: 300 }}
//                 initialRegion={{
//                     // ...currentLocation?.coords,
//                     latitude: 23.9849527,
//                     longitude: 85.3450508,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01
//                 }}
//             // region={{
//             //     ...currentLocation.coords,
//             //     // latitude: 23.9849527,
//             //     // longitude: 85.3450508,
//             //     latitudeDelta: 0.01,
//             //     longitudeDelta: 0.01
//             // }}
//             // provider={PROVIDER_DEFAULT}

//             >
//                 {/* <Circle
//                     center={[23.9849527,85.3450508]}
//                     radius={30}
//                     strokeColor="rgba(158, 158, 258, 1.0)"
//                     fillColor="rgba(158, 158, 258, 0.3)"

//                 /> */}
//                 <Polyline coordinates={locations.map(loc => loc.coords)} strokeWidth={5} />

//             </MapView>
//             <Button title="state print" onPress={() => printCurrentLocation()} />
//             {err ? <Text>{err}</Text> : null}
//             <Button onPress={() => {
//                 getLocationPermission()
//             }} title="get location permission" />
//         </ScrollView>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
// });

// export default MerchantMap;
