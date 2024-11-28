import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, Button } from "react-native";
import CartHeader from '../../components/new/cartHeader';
import Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context as CartContext } from '../../context/cartContext';
import TotalPriceComponent from '../../components/cart/totalPrice';
import ButtonNext from '../../components/cart/buttonNext';
import RadioButton from '../../components/button/radioButton';
const ChosePayment = ({ route, navigation }) => {

    const { state, getTotalPrice, selectPaymentMethodFn } = React.useContext(CartContext);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(null);
    const [paymentData, setPaymentData] = React.useState({});

    const handlePaymentMethodSelection = (method, data) => {
        console.log(method, data)
        selectPaymentMethodFn(method, data);
        setSelectedPaymentMethod(method);
        setPaymentData(data);
    };
    React.useEffect(() => {
        getTotalPrice();
    }
        , []);

    const [isBlinking, setIsBlinking] = React.useState(false);
    const handleBlink = () => {
        // Enable blinking
        setIsBlinking(true);

        // Disable blinking after 500 milliseconds (adjust as needed)
        setTimeout(() => {
            setIsBlinking(false);
        }, 500);
    };

    const scrollViewRef = React.useRef(null);



    return (
        <>

            <View style={{ flex: 1 }}>
                <CartHeader active={"payment"} />
                <ScrollView style={{ marginBottom: 0 }}
                    ref={scrollViewRef}

                >

                    <View>
                        <Text style={styles.boldText}>Select Payment Method</Text>
                    </View>

                    <View style={{
                        padding: 10,
                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                        borderRadius: 10,
                        marginBottom: 10,

                    }}>
                        <Text style={{ color: '#000' }}>currently cash on delivery is only available an this could be multi line so please check that is can tke multi line</Text>
                    </View>

                    <View style={styles.payonline}>
                        <View>
                            <Text style={{ fontWeight: "bold" }}>Pay Online</Text>
                            <View style={{ borderWidth: 0.2 }}></View>
                            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        const payment_data = {
                                            upi_id: "upi_id",
                                        }
                                        handlePaymentMethodSelection('upi', payment_data)
                                    }}
                                    style={styles.wrapMethod}
                                >
                                    <View style={{ flexDirection: "row" }} >
                                        <MaterialIcons name="qrcode" size={20} />
                                        <Text style={styles.textmethod}>UPI (GPay/PhonePay)</Text>

                                    </View>
                                    <RadioButton selected={selectedPaymentMethod === 'upi'} />
                                    
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => handlePaymentMethodSelection('card')}
                                    style={styles.wrapMethod}
                                >
                                    <View style={{ flexDirection: "row" }} >
                                        <MaterialIcons name="credit-card" size={20} />
                                        <Text style={styles.textmethod}>Debit/Credit card</Text>

                                    </View>
                                    <RadioButton selected={selectedPaymentMethod === 'card'} />

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handlePaymentMethodSelection('wallet')}
                                    style={styles.wrapMethod}
                                >
                                    <View style={{ flexDirection: "row" }} >
                                        <MaterialIcons name="wallet" size={20} />
                                        <Text style={styles.textmethod}>Wallet</Text>

                                    </View>
                                    <RadioButton selected={selectedPaymentMethod === 'wallet'} />

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handlePaymentMethodSelection('netbanking')}
                                    style={styles.wrapMethod}
                                >
                                    <View style={{ flexDirection: "row" }} >
                                        <MaterialIcons name="bank" size={20} />
                                        <Text style={styles.textmethod}>Net banking</Text>

                                    </View>
                                    <RadioButton selected={selectedPaymentMethod === 'netbanking'} />
                                    
                                </TouchableOpacity>
                            </View>

                        </View>



                        <TouchableOpacity>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.paycash}>
                        <View>
                            <Text style={{ fontWeight: "bold" }}>Pay Cash</Text>
                            <View style={{ borderWidth: 0.2 }}></View>
                            <View style={{ paddingTop: 10, paddingBottom: 10 }}>

                                <TouchableOpacity
                                    onPress={() => handlePaymentMethodSelection('cod', {})}
                                    style={styles.wrapMethod}
                                >
                                    <View style={{ flexDirection: "row" }} >
                                        <MaterialIcons name="cash" size={20} />
                                        <Text style={styles.textmethod}>Cash on Delivery</Text>

                                    </View>
                                    <RadioButton selected={selectedPaymentMethod === 'cod'} />

                                </TouchableOpacity>
                            </View>

                        </View>
                        <TouchableOpacity>
                        </TouchableOpacity>
                    </View>


                    {/* start for total price */}
                    <TotalPriceComponent isBlinking={isBlinking} totalPriceState={state.totalPriceState} />
                    {/* end for total price */}
                    <Button title="state.user_payment_method_id" 
                        onPress={() => {
                            console.log("user_payment_method_id", state.user_payment_method_id)
                        }}
                    />

                </ScrollView>
            </View>
            {/* start bot button to go next */}
            <ButtonNext
                totalPriceState={state.totalPriceState} 

                onPressDetail={() => {
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                        handleBlink();
                    }
                }}

                onPressNext={() => {
                    if (state.user_payment_method_id != null) {
                        navigation.navigate("PurchaseSummary", { loadedFrom: "Cart" })
                    }
                }}
            />
            {/* end for button to fgo next */}
        </>
    )
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,

    },
    payonline: {
        marginTop: 10,
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
    },
    paycash: {
        marginTop: 10,
        backgroundColor: "#eeeeee",
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
    },
    wrapMethod: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        // borderBottomWidth: 0.2,
    },
    textmethod: {
        paddingLeft: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: '#000',
    },

})

export default ChosePayment;
