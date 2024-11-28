import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, ToastAndroid, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productApi from '../../../api/product';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import CartHeader from '../../../components/new/cartHeader';
import Icons from 'react-native-vector-icons/FontAwesome6';
import { Context as CartContext } from '../../../context/cartContext';
// import { requestAndroidLocationPermissions } from '@rnmapbox/maps';
import { requestAndroidLocationPermissions } from '../../../components/permissions/locationPermission';
import Geolocation from '@react-native-community/geolocation';

const AddAddressScreen = ({ route }) => {
    const IS_ANDROID = Platform.OS === 'android';
    const [isAndroidPermissionGranted, setIsAndroidPermissionGranted] = useState(false);
    const [isFetchingAndroidPermission, setIsFetchingAndroidPermission] = useState(true);

    useEffect(() => {
        const fetchPermissions = async () => {
            if (IS_ANDROID) {
                const isGranted = await requestAndroidLocationPermissions();
                console.log("isGranted", isGranted);
                setIsAndroidPermissionGranted(isGranted);
                setIsFetchingAndroidPermission(false);
            }
        };
    
        fetchPermissions();
    }, []);

    const { updateAddress, addAddress, setSuccessRedirect, getGeocoding, state: cartState } = React.useContext(CartContext);
    // const addressId = navigation.route
    const navigation = useNavigation();
    let addressId = null;

    addressId = route.params && route.params.addressId ? route.params.addressId : null;

    const [name, setName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [coords, setCoords] = useState({});

    const handleZipChange = (text) => {
        // Ensure only numeric values are entered
        const numericValue = text.replace(/[^0-9]/g, '');
        setZip(numericValue);
    };

    const [address, setAddresses] = React.useState(null);
    useEffect(() => {
        handleFetchOneAddress();
    }, [handleFetchOneAddress]);

    const handleFetchOneAddress = () => {
        if (addressId) {
            fetchOneAddress(addressId);
        }
    }


    const fetchOneAddress = (address_id) => {
        // console.log("address_list", cartState.address_list)
        const address = cartState.address_list.find((address) => address.address_id === addressId);
        console.log(address);

        setAddressLine1(address.address_line_1);
        setName(address.name);
        setAddressLine2(address.address_line_2);
        setCity(address.city);
        setState(address.state);
        setZip(address.zip);
        setPhone(address.phone);
        setEmail(address.email);

        // setAddresses(addresses);
    }

    const saveAddress = async (address_id) => {
        jsonData = {
            name: name,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city: city,
            state: state,
            zip: zip,
            phone: phone,
            email: email,
            location: coords.location
        }
        if (address_id) {
            await updateAddress(address_id, jsonData)
        } else {
            await addAddress(jsonData)
        }
    }
    // create toast android with take message 
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const handleAddAddress = async () => {
        if (name.trim() === '') {
            showToast('Name field is empty');
            return;
        }

        if (city.trim() === '') {
            showToast('City field is empty');
            return;
        }

        if (state.trim() === '') {
            showToast('State field is empty');
            return;
        }

        if (zip.trim() === '') {
            showToast('Zip field is empty');
            return;
        }

        if (phone.trim() === '') {
            showToast('Phone field is empty');
            return;
        }
        // showToast('All fields are filled');
        await saveAddress(addressId);
    }

    React.useEffect(() => {
        console.log("state has been changed", cartState.success_redirect)
        if (cartState.success_redirect) {
            navigation.navigate('AddressList');
            setSuccessRedirect(false);
        }
    }, [cartState.success_redirect])


    return (
        <>
            {/* <CartHeader active={"address"} /> */}
            <ScrollView style={{ flex: 1, padding: 10, marginBottom: 50 }}>

                <View style={{ padding: 10, backgroundColor: "#eee", borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Icons name="location-dot" size={20} color="lightblue" />
                            <Text>Address</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}
                            onPress={() => {
                                Geolocation.getCurrentPosition(info => {
                                    const coords = { lat: info.coords.latitude, lng: info.coords.longitude };
                                    getGeocoding(coords, {
                                        setStreet: setAddressLine1,
                                        setCity: setCity,
                                        setState: setState,
                                        setPostalCode: setZip,
                                        
                                    });
                                    setCoords({
                                        location: { latitude: info.coords.latitude, longitude: info.coords.longitude}
                                    });
                                
                                });
                                // console.log("success_redirect", cartState.success_redirect)
                            }}
                        >
                            <Icons name="location-crosshairs" size={20} color="lightblue" />
                            <Text>Use my location</Text>

                        </TouchableOpacity>
                    </View>

                    <View>


                        <TextInput
                            label="Address Line 1"
                            multiline={true}
                            autoCorrect={false}


                            style={styles.input}
                            placeholder="Address Line 1"
                            value={addressLine1}
                            onChangeText={setAddressLine1}
                        />

                        <TextInput
                            label="Address Line 2"

                            style={styles.input}
                            placeholder="Address Line 2"
                            value={addressLine2}
                            onChangeText={setAddressLine2}
                        />

                        <TextInput
                            label="City"

                            style={styles.input}
                            placeholder="City"
                            value={city}
                            onChangeText={setCity}
                        />

                        <TextInput
                            label="State"

                            style={styles.input}
                            placeholder="State"
                            value={state}
                            onChangeText={setState}
                        />

                        <TextInput
                            label="Zip code"

                            style={styles.input}
                            placeholder="Zip"
                            value={zip}
                            onChangeText={handleZipChange}
                            maxLength={6}
                            keyboardType='numeric'
                        />
                    </View>
                </View>



                {/* <View style={{ borderWidth: 0.5 }}></View> */}
                <View style={{
                    backgroundColor: "#eee",
                    padding: 10,
                    borderRadius: 10,

                }}>
                    <Text>Contact Details</Text>
                    <View style={{}}>
                        <TextInput
                            label="Name"

                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            label="Email"
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            label="Phone"

                            style={styles.input}
                            placeholder="Phone"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>
            </ScrollView>


            <TouchableOpacity
                style={styles.button}
                onPress={() => {

                    // navigation.navigate('AddressScreen');
                    handleAddAddress();

                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >Save Address and Continue</Text>
            </TouchableOpacity>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 10,
        // justifyContent: 'space-around',
    },
    input: {
        // width: '95%',
        // height: 40,
        // borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        // borderRadius: 5,
        // borderColor: "grey",
        backgroundColor: 'transparent',
    },
    button: {
        position: 'absolute',
        // width: '80%',
        left: 10,
        right: 10,
        height: 40,
        // borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        // borderColor: "grey",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        bottom: 0,


    },
});

export default AddAddressScreen;
