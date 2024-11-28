import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, Button } from "react-native";
import CartHeader from '../../components/new/cartHeader';
import Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context as CartContext } from '../../context/cartContext';
import TotalPriceComponent from '../../components/cart/totalPrice';
import ButtonNext from '../../components/cart/buttonNext';
import CartItem from '../../components/cart/item';
import CartItemModel from '../../components/cart/itemModel';
import { secondaryColor } from '../../theme/color';
import SplashScreen from './orderDone';


const PurchaseSummary = ({ navigation, route }) => {
    const loadedFrom = route?.params?.loadedFrom;
    console.log("HI loadedFrom", loadedFrom);
    const { state, getTotalPrice, state: { default_address, payment_method }, placeOrderFn, setSplashScreenVisibleFn } = React.useContext(CartContext);

    React.useEffect(() => {
        getTotalPrice();
    }, []);

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

    // model view for product detail
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);
    const [run, setRun] = React.useState(true);

    const openModal = (product) => {

        setModalVisible(true);
        setSelectedProduct(product);
        setQuantity(product.quantity); // Set the initial quantity
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    React.useEffect(() => {
        if (isModalVisible) {
            // Clear the quantity when the modal is closed
            setRun(false);
        } else {
            setRun(true);
        }
    }, [isModalVisible])

    const [splashScreenVisible, setSplashScreenVisible] = React.useState(false);
    const handleSplashScreenEnd = () => {
        // Navigate to another screen, or perform some other action
        // navigation.navigate("CartList2");
        navigation.navigate('AccountNavigation', { screen: 'OrderList' });

        // Hide the splash screen
        setSplashScreenVisible(false);
        setSplashScreenVisibleFn(false);
    };
    //  TODO Order placed here
    // state.placeOrder = () => {
    //     if (state.splash_screen_visible) {
    //         setSplashScreenVisible(true);

    //     }
    // }

    React.useEffect(() => {
        if (state.splash_screen_visible) {
            setSplashScreenVisibleFn(true);
            setSplashScreenVisible(true);
        }
    }, [state.splash_screen_visible]);

    // TODO need all infor to add order  
    //* {
    //*     "payment_method_id": "2",
    //*     "shipping_address_id": "2",
    //*     "shipping_method_id": "1",
    //*     "products": [
    //*         {
    //*             "product_item_id": "63",
    //*             "quantity": 2
    //*         },
    //*         {
    //*             "product_item_id": "64",
    //*             "quantity": 3
    //*         }
    //*     ]
    //* }
    const handlePlaceOrder = () => {
        // const delivery_type = state.additional_data;
        console.log("additional_data from purchaseSummary", state.additional_data)
        const delivery_type = state.additional_data.map(item => {
            return {
                ...item,
                shopping_cart_item_id: item.shopping_cart_item_id,
                totalDeliveryCost: item.totalDeliveryCost
            };
        });
        console.log("delivery_type", delivery_type);
        // console.log(state.default_address.address_id)
        const shipping_address_id = `${state.default_address.address_id}`
        // const payment_method = `Debit Card` // for cod
        const shipping_method_id = `1` //* for standard
        
        const products = state.cart_items.map((item) => {
            console.log(item.product_item_id, item.quantity)
            intProductItemId = parseInt(item.product_item_id);
            const delivery = delivery_type.find(deliveryItem => {
                console.log("deliveryItem", deliveryItem, "[",deliveryItem.product_item_id === intProductItemId ,"]")
                return deliveryItem.product_item_id === intProductItemId;
            });
            console.log("delivery from purchaseSummary", delivery)
            return {
                product_item_id: intProductItemId,
                quantity: item.quantity,
                delivery: delivery,
            }
        })

       placeOrderFn({ shipping_address_id, payment_method_id: state.user_payment_method_id, shipping_method_id, products }); 
    }

    return (
        <>
            {state.splash_screen_visible ? (
                <SplashScreen onEnd={handleSplashScreenEnd} />
            ) : (
                <>
                    <View style={{ flex: 1 }}>
                        {loadedFrom != "PurchaseSummary" && (
                            <CartHeader active={"summary"} />
                        )}
                        <ScrollView style={{ marginBottom: 0 }}
                            ref={scrollViewRef}
                        >

                            <View>
                                {loadedFrom == "PurchaseSummary" ? (
                                    <Text style={styles.boldText}>Order Success</Text>
                                ) : (
                                    <Text style={styles.boldText}>Order Summary</Text>
                                )}
                            </View>

                            <View style={{
                                paddingTop: 5,
                                paddingLeft: 10,
                                paddingBottom: 5,
                                paddingRight: 10,
                                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                                // borderRadius: 10,
                                marginBottom: 10,
                                // flexDirection: "row",
                            }}>

                                <Text style={{ color: '#000' }}>
                                    <Icons name="truck" size={20} style={{}} />
                                    <Text style={{ margin: 10 }}>Estimated Delivery by Tuesday 15th Jan</Text>

                                </Text>
                                <View style={{ width: 10 }}></View>
                            </View>

                            <View>
                                {state.cart_items.map((item, index) => {
                                    return (
                                        <View key={`${index}`}>
                                            <CartItem
                                                item={item}
                                                openModal={openModal}
                                                showOnly={true}
                                            />
                                        </View>
                                    )
                                })}

                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    if (loadedFrom == "PurchaseSummary") {
                                        // navigation.navigate("AddressList", { loadedFrom: "PurchaseSummary" })
                                        console.log("diaabled")
                                    } else {
                                        navigation.navigate("AddressList", { loadedFrom: "PurchaseSummary" })
                                    }
                                }}
                            >
                                <View style={{ padding: 10, borderRadius: 5, borderWidth: 0.2, backgroundColor: secondaryColor, flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <Text style={{ paddingTop: 2, paddingBottom: 2, fontSize: 20, }}>Delivery Address</Text>
                                        <View>
                                            {/* from state.default_address */}
                                            <View>
                                                <Text>Name: {state.default_address.name}</Text>
                                                <Text>Address Line 1: {state.default_address.address_line_1}</Text>
                                                <Text>Address Line 2: {state.default_address.address_line_2}</Text>
                                                <Text>City: {state.default_address.city}</Text>
                                                <Text>State: {state.default_address.state}</Text>
                                                <Text>Zip: {state.default_address.zip}</Text>
                                                <Text>Email: {state.default_address.email}</Text>
                                                <Text>Phone: {state.default_address.phone}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <MaterialIcons name="chevron-down" size={20} style={{}} />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ borderWidth: 0.2, borderRadius: 5, padding: 10, marginTop: 10, marginBottom: 10 }}
                                onPress={() => {
                                    if (loadedFrom == "PurchaseSummary") {
                                        // navigation.navigate("Payment", { loadedFrom: "PurchaseSummary" })
                                        console.log("diaabled")
                                    } else {
                                        navigation.navigate("Payment", { loadedFrom: "PurchaseSummary" })
                                    }
                                }}>
                                <Text style={{ fontSize: 20, }}>Selected Payment method</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text>{state.payment_method}</Text>
                                    <View>
                                        <MaterialIcons name="chevron-down" size={20} style={{}} />
                                    </View>

                                </View>

                            </TouchableOpacity>

                            {/* start for total price */}
                            <TotalPriceComponent isBlinking={isBlinking} totalPriceState={state.totalPriceState} />
                            {/* end for total price */}


                        </ScrollView>
                    </View >
                    {/* Item model start */}
                    < CartItemModel
                        isModalVisible={isModalVisible}
                        closeModal={closeModal}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        // handleIncrement={handleIncrement}
                        // handleDecrement={handleDecrement}
                        // handleQuantityChange={handleQuantityChange}
                        // handleQuantityEndEditing={handleQuantityEndEditing}
                        // updateQuantity={updateQuantity}
                        // setShowMoreMap={setShowMoreMap2}
                        // showMore2={showMore2}
                        // showMoreMap={showMoreMap2}
                        // HandleRemoveFn={HandleRemoveFn}
                        // removeFromCart={removeFromCart}
                        run={run}
                        // toggleShowMore={toggleShowMoreFn}
                        showOnly={true}
                        setModalVisible={setModalVisible}

                    />
                    {/* end */}
                    {/* start bot button to go next */}
                    {loadedFrom != "PurchaseSummary" && (
                        <ButtonNext
                            totalPriceState={state.totalPriceState}

                            onPressDetail={() => {
                                if (scrollViewRef.current) {
                                    scrollViewRef.current.scrollToEnd({ animated: true });
                                    handleBlink();
                                }
                            }}

                            onPressNext={() => {
                                handlePlaceOrder();
                                // navigation.navigate("PurchaseSummary", { loadedFrom: "PurchaseSummary" })
                            }}
                        />

                    )}
                    {/* end for button to fgo next */}
                </>
            )}
        </>
    )
}

export default PurchaseSummary;

const styles = StyleSheet.create({
    boldText: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,

    },
    wrapMethod: {
        paddingTop: 10,
        paddingBottom: 10,
        // borderBottomWidth: 0.2,
    },
    textmethod: {
        paddingLeft: 10,
    },

})

