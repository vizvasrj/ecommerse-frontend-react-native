import React, { useState } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import productApi from '../../../api/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RadioButton from '../../../components/RadioButton';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartHeader from '../../../components/new/cartHeader';
import { Context as CartContext } from '../../../context/cartContext';
import { primaryColor, secondaryColor, textColor } from '../../../theme/color';
import { useRoute } from '@react-navigation/native';
import RadioButton from '../../../components/button/radioButton';
const AddressScreen = () => {
    const { state, fetchAddressFn, choseAddressFn, deleteAddressFn } = React.useContext(CartContext);
    const addresses = state.address_list;
    const selectedAddressId = state.default_address_id;
    const [token, setToken] = React.useState(null);
    // const [addresses, setAddresses] = React.useState(null);

    const route = useRoute();

    const loadedFrom = route.params?.loadedFrom || 'Unknown';
    let navigateTo;
    if (loadedFrom === 'Cart') {
        navigateTo = 'Payment';
    } else if (loadedFrom === 'PurchaseSummary') {
        navigateTo = 'PurchaseSummary';
    }
    React.useEffect(() => {

    }, [addresses]);

    React.useEffect(() => {
        AsyncStorage.getItem('token').then((value) => {
            setToken(value);
            handleCallback();
        });

    }, [handleCallback]);



    // const fetchAddress = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token')
    //         console.log(token);
    //         const response = productApi.get('/v2/user/address', {
    //             // headers: {
    //             //     'Authorization': `Bearer ${token}`
    //             // }
    //         }
    //         ).then((response) => {
    //             console.log(response.data.result.addresses);
    //             setAddresses(response.data.result.addresses);
    //         }).catch((error) => {
    //             console.log(error);
    //         }
    //         );
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleCallback = () => {
        fetchAddressFn();
    }

    const handleChoseAddress = (addressId) => {
        choseAddressFn(addressId);
    }

    const handleDeleteAddress = (addressId) => {
        deleteAddressFn(addressId);
    }
    // const [selectedAddressId, setSelectedAddressId] = useState(null);


    // const RadioButton2 = ({ selected, onSelect }) => (
    //     // <TouchableOpacity>
    //     <View style={styles.radioButton}>
    //         {selected && <View style={styles.radioButtonInner} />}
    //     </View>
    //     // </TouchableOpacity>
    // );


    const renderItem = ({ item }) => {
        let isSelected = item.address_id === selectedAddressId || item.is_default;
        // if (item.is_default) {
        //     isSelected = true;
        //     setSelectedAddressId(item.address_id);
        // }


        return (
            <>
                <View style={styles.one}>

                    <TouchableOpacity style={styles.address1}
                        onPress={async () => {
                            handleChoseAddress(item.address_id);
                        }}
                    >

                        <View

                        >
                            <View key={item.address_id} style={styles.containerItem}>
                                <Text style={styles.headerText}>{item.name}</Text>
                                <Text style={styles.addressText}>{item.address_line_1}</Text>
                                {item.address_line_2 && <Text style={styles.addressText}>{item.address_line_2}</Text>}
                                <Text style={styles.addressText}>{item.city}, {item.state} {item.zip}</Text>
                                <Text style={styles.contactText}>Phone: {item.phone}</Text>
                                {item.email && <Text style={styles.contactText}>Email: {item.email}</Text>}

                                {/* <Text style={styles.footerText}>User Address ID: {item.user_address_id}</Text> */}
                            </View>
                        </View>
                        <RadioButton selected={isSelected} />
                    </TouchableOpacity>
                    {(selectedAddressId === item.address_id || isSelected) &&
                        <>
                            <View style={styles.editDelete}>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("edit address");
                                        navigation.navigate('AddOrEditAddress', {
                                            addressId: item.address_id,
                                        })
                                    }}
                                >
                                    <Text><Icons name='pen' size={20} />EDIT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        // console.log("delete address");
                                        handleDeleteAddress(item.address_id);
                                    }}
                                >
                                    <Text>
                                        <Icons name='delete' size={20} />
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {(loadedFrom === 'Cart' || loadedFrom === 'PurchaseSummary') &&
                                <View style={styles.goNext}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(navigateTo);
                                        }}
                                    >
                                        <Text>
                                            Deliver to this Address
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            }
                        </>

                    }
                </View>
            </>
        );
    }
    const navigation = useNavigation();
    return (
        <>
            <Text>{loadedFrom}</Text>
            {loadedFrom !== "Account" && loadedFrom !== "Unknown" &&
                <CartHeader active={"address"} />
            }
            <TouchableOpacity
                style={styles.add_address}
                onPress={() => {
                    // console.log("selectedAddressId", selectedAddressId);
                    // console.log("addresses", addresses);
                    navigation.navigate('AddOrEditAddress')

                }}

            >
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 27 }}>
                        +
                    </Text>
                    <Text style={{ marginTop: 10, marginLeft: 10 }}>
                        ADD NEW ADRESS
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.container}>

                <FlatList
                    data={addresses}
                    keyExtractor={(item) => item.address_id.toString()}
                    renderItem={renderItem}
                />



            </View>
        </>
    );

}

export default AddressScreen;

const styles = StyleSheet.create({
    one: {
        margin: 10,

    },
    goNext: {
        padding: 10,
        // flexDirection: "row",
        // justifyContent: "space-between",
        backgroundColor: primaryColor,
        // marginLeft: 10,
        // marginRight: 10,
        // textAlign: "center",
        // alignContent: "center",
        alignItems: "center",
        // justifyContent: "center",
        borderRadius: 10,

    },
    editDelete: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: secondaryColor,
        borderRadius: 10,

    },

    address1: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: secondaryColor,
        borderRadius: 10,

    },
    container: {
        flex: 1,
        // padding: 10,
    },
    containerItem: {
        // padding: 15,
        borderColor: 'grey',
        // borderBottomWidth: 0.2,
        borderRadius: 10,
        // backgroundColor: '#eee', padding: 10, margin: 10, borderRadius: 10,
        // marginBottom: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 5,
    },
    addressText: {
        fontSize: 16,
        // marginBottom: 5,
    },
    contactText: {
        fontSize: 16,
        color: '#555',
        // marginBottom: 5,
    },
    footerText: {
        fontSize: 14,
        color: '#777',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: primaryColor,
    },
    add_address: {
        backgroundColor: secondaryColor,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
});