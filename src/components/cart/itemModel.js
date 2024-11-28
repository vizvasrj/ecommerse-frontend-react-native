import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import ThumbnailImage from "../thumbnailImage";
import { Context as CartContext } from "../../context/cartContext";
import HandleRemoveFn from "../new/handleRemoveFn";
const CartItemModel = ({
    isModalVisible,
    setSelectedProduct,
    setModalVisible,
    closeModal,
    selectedProduct,
    // handleDecrement, 
    // handleQuantityChange, 
    // handleQuantityEndEditing, 
    // handleIncrement, 
    quantity,
    toggleShowMore,
    // setShowMoreMap, 
    // showMoreMap, 
    // HandleRemoveFn, 
    // removeFromCart,
    setQuantity,
    run,
    showOnly = false,
}) => {
    const { incrementDecrementQuantityFn, removeFromCart } = React.useContext(CartContext);
    // const [quantity, setQuantity] = useState(1);
    const [showMoreMap, setShowMoreMap] = useState({});

    const isMounted = React.useRef(true);

    // const updateQuantity = () => {
    //     // Implement logic to update quantity in your context or state
    //     console.log('Updated quantity:', quantity);
    //     // Add your logic to update the quantity in your context or state
    //     closeModal();
    // };
    // let timeoutId;
    const incrementDecrementQuantityFnTHIS = (itemId, newQuantity) => {
        // Your implementation of incrementDecrementQuantityFn
        console.log(`Incrementing quantity for item ${itemId} to ${newQuantity}`);
        incrementDecrementQuantityFn(selectedProduct?.shopping_cart_item_id, newQuantity);
        // Call your server-side function here
    };
    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    React.useEffect(() => {
        if (isMounted.current) {
            // Skip the first run on mount or page reload
            isMounted.current = false;
            return;
        }
        if (run) {
            return;
        }
        let timeoutId;

        const handleIncrementWithDelay = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                incrementDecrementQuantityFnTHIS(selectedProduct?.shopping_cart_item_id, quantity);
            }, 1000);
        };

        handleIncrementWithDelay();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [quantity]);

    const handleQuantityChange = (text) => {
        const newQuantity = parseInt(text);
        if (!isNaN(newQuantity)) {
            if (newQuantity <= 0) {
                setQuantity(1);
            } else {
                setQuantity(newQuantity);
            }
        }
    };
    const handleQuantityEndEditing = () => {
        // Save the updated quantity here
        console.log("Updated quantity:", quantity, selectedProduct?.shopping_cart_item_id);
        incrementDecrementQuantityFn(selectedProduct?.shopping_cart_item_id, quantity);

    };


    const showMore2 = showMoreMap[selectedProduct?.shopping_cart_item_id] || false;


    return (
        <View key={`${showMore2}`}>
            <Modal visible={isModalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text></Text>
                            <TouchableOpacity

                                onPress={closeModal}>
                                <Text style={{ padding: 10 }}>x</Text>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.productDetail}>
                            <ThumbnailImage
                                width={100}
                                height={100}
                                path={selectedProduct?.image_url}
                            />
                            <View style={styles.productTextualDetail}>
                                <Text style={styles.productName}>{selectedProduct?.product_item_name}</Text>
                                <Text>Rs. {selectedProduct?.discounted_price.toFixed(2)}</Text>
                                {/* <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                                    {selectedProduct?.specifications.slice(0, showMore2 ? selectedProduct?.specifications.length : 2).map((variation) => (

                                        <View key={variation.name} style={{ flexDirection: "row" }}>
                                            <Text>{variation.name}: </Text>
                                            <Text>{variation.value}</Text>
                                        </View>
                                    ))}

                                    {selectedProduct?.specifications.length > 2 && (
                                        <TouchableOpacity onPress={() => {
                                            toggleShowMore(selectedProduct?.shopping_cart_item_id, setShowMoreMap)
                                        }
                                        }>
                                            <Text style={{ color: 'blue', marginTop: 5 }}>
                                                {showMore2 ? 'Show Less' : 'Show More'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View> */}

                                <View>
                                    {selectedProduct?.specifications.map((variation) => (

                                        <View key={variation.name} style={{ flexDirection: "row" }}>
                                            <Text>{variation.name}: </Text>
                                            <Text>{variation.value}</Text>
                                        </View>
                                    ))}


                                </View>
                                {!showOnly ? (

                                    <View style={{ width: 150 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {/* + Button */}
                                            <TouchableOpacity
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 0.5,
                                                    borderColor: "black",
                                                    // borderRadius: 8,
                                                }}
                                                onPress={handleIncrement}
                                            >
                                                <Text style={{ fontSize: 20 }}>＋</Text>
                                            </TouchableOpacity>

                                            {/* Quantity Input */}
                                            <TextInput
                                                style={{
                                                    height: 40, // Set the height to match the buttons
                                                    borderWidth: 0.5,
                                                    textAlign: 'center', paddingHorizontal: 10,
                                                    flex: 1, // Use flex to allow the TextInput to take remaining space
                                                }}
                                                value={`${quantity}`}
                                                onChangeText={handleQuantityChange}
                                                onEndEditing={handleQuantityEndEditing}
                                            />

                                            {/* - Button */}
                                            <TouchableOpacity
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 0.5,
                                                    borderColor: "black",
                                                    // borderRadius: 8,
                                                }}
                                                onPress={handleDecrement}
                                            >
                                                <Text style={{ fontSize: 20 }}>—</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    <Text>Quantity: {selectedProduct?.quantity}</Text>
                                )}


                                {!showOnly &&

                                    <TouchableOpacity
                                        onPress={() => {
                                            HandleRemoveFn(selectedProduct?.shopping_cart_item_id, removeFromCart);
                                            closeModal();
                                            setSelectedProduct(null);
                                        }}
                                    >
                                        <Text>X Remove</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        // position: "absolute",
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        // height: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,

    },
    productDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
    },
    productTextualDetail: {
        width: "60%",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default CartItemModel;