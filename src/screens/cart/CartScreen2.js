import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import CartHeader from '../../components/new/cartHeader';
import { Context as CartContext } from "../../context/cartContext";
import TotalPriceComponent from '../../components/cart/totalPrice';
import ButtonNext from '../../components/cart/buttonNext';
import CartItemModel from '../../components/cart/itemModel';
import CartItem from '../../components/cart/item';
import toggleShowMoreFn from '../../components/cart/toggleShowMoreFn';
import HandleRemoveFn from '../../components/new/handleRemoveFn';
const CartScreen2 = ({ navigation }) => {

    const { state, getAllCartItem, removeFromCart, getTotalPrice, state: {additional_data}} = React.useContext(CartContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const [run, setRun] = useState(true);
    const [isBlinking, setIsBlinking] = useState(false);



    const handleBlink = () => {
        // Enable blinking
        setIsBlinking(true);

        // Disable blinking after 500 milliseconds (adjust as needed)
        setTimeout(() => {
            setIsBlinking(false);
        }, 500);
    };

    // const toggleShowMore = (productId) => {
    //     setShowMoreMap((prevMap) => ({
    //         ...prevMap,
    //         [productId]: !prevMap[productId],
    //     }));
    // };

    // const toggleShowMore = toggleShowMoreFn(productId, setShowMoreMap);

    const checkDelivery = () => {
        if (!state.additional_data) {
            return false;
        }
    
        return state.cart_items.every((item) => {
            const correspondingAdditionalData = state.additional_data.find((data) => item.shopping_cart_item_id === data.shopping_cart_item_id);
            return correspondingAdditionalData && correspondingAdditionalData.delivery !== "false";
        });
    }
    
    React.useEffect(() => {
        getAllCartItem(0);

        getTotalPrice();
    }, []);

    const openModal = (product) => {

        setModalVisible(true);
        setSelectedProduct(product);
        setQuantity(product.quantity); // Set the initial quantity
    };

    React.useEffect(() => {
        if (isModalVisible) {
            // Clear the quantity when the modal is closed
            setRun(false);
        } else {
            setRun(true);
        }
    }, [isModalVisible])

    const closeModal = () => {
        setModalVisible(false);
    };


    const flatListRef = useRef(null);
    if (state.cart_items.length === 0) {
        return (
            <>
                <View style={{ flex: 1 }}>
                    <CartHeader active={"cart"} />
                    <Text style={{fontSize: 25, padding: 20,textAlign: "center"}}>No Item in the Cart</Text>
                </View>
            </>
        )
    } else {

        return (
            <>
                <View style={{ flex: 1 }}>
                    <CartHeader active={"cart"} />
                    <Button 
                        title='lolo'
                        onPress={() => {
                            console.log("sss",state.additional_data)
                        }}
                    >

                    </Button>

                    {/* <Text>lorem...</Text> */}

                    <Button title='get all item in cart' onPress={() => {console.log(state.cart_items)}} />
                    <View style={styles.container}>
                        <FlatList
                            ref={flatListRef}
                            data={state.cart_items}
                            renderItem={({ item }) => {
                                return (
                                    <CartItem
                                        item={item}
                                        openModal={openModal}
                                        toggleShowMore={toggleShowMoreFn}
                                        // setShowMoreMap={setShowMoreMap}
                                        // showMoreMap={showMoreMap}
                                        HandleRemoveFn={HandleRemoveFn}
                                        removeFromCart={removeFromCart}
                                    />
                                );

                            }}
                            ListFooterComponent={() => {
                                return (
                                    <View style={{marginBottom: 50}}>
                                        <Text>Wish list</ Text>
                                        <TotalPriceComponent 
                                            isBlinking={isBlinking} 
                                            totalPriceState={state.totalPriceState} 
                                            additional_charge_text={"some text like delivery charge"} 
                                            // additional_charge={additional_data.}
                                        />
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.shopping_cart_item_id}

                            contentContainerStyle={{}}
                        />
                    </View>


                    {/* Item model start */}
                    <CartItemModel
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
                        toggleShowMore={toggleShowMoreFn}
                        // setShowMoreMap={setShowMoreMap2}
                        // showMore2={showMore2}
                        // showMoreMap={showMoreMap2}
                        // HandleRemoveFn={HandleRemoveFn}
                        // removeFromCart={removeFromCart}
                        run={run}
                        setModalVisible={setModalVisible}

                    />
                    {/* end */}


                </View>
                {/* for button */}
                <ButtonNext
                    totalPriceState={state.totalPriceState}

                    onPressDetail={() => {
                        if (flatListRef.current) {
                            flatListRef.current.scrollToEnd({ animated: true });
                            handleBlink();
                        }
                    }}

                    onPressNext={() => {
                        if (checkDelivery()) {
                            navigation.navigate("AddressList", { loadedFrom: "Cart" })
                        } else {
                            alert("Please select delivery for all items in the cart");
                        }
                        // navigation.navigate("AddressList", { loadedFrom: "Cart" })
                    }}
                />

            </>

        )
    }

}

export default CartScreen2;

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        marginBottom: 50,
    },
    level2ProductItem: {
        backgroundColor: "#000fff19",
        borderWidth: 0.2,
        padding: 5,
        borderRadius: 2,
        marginBottom: 5,
    },
    productDetail: {
        flexDirection: "row",
    },
    productTextualDetail: {
        paddingRight: 80,
        paddingLeft: 20,
        // flex: 1,
    },
    productName: {
        fontWeight: "800",
        fontSize: 15,
    },
    divider: {
        borderWidth: 0.2,
        borderRadius: 2,
    },
    otherDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // height: '100%',
        // alignItems: 'center',
        // width: '100%',
        // minWidth: '100%',
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },


})