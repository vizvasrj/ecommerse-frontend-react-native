import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import ThumbnailImage from '../thumbnailImage';
import { Context as CartContext } from '../../context/cartContext';


const CartItem = ({ item, toggleShowMore, openModal, HandleRemoveFn, removeFromCart, showOnly }) => {
    const [showMoreMap, setShowMoreMap] = React.useState({});
    const { state, calculateDeliveryCostFn, getDeliveryType } = useContext(CartContext);
    const showMore = showMoreMap[item.shopping_cart_item_id] || false;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
    
    React.useEffect(() => {
        if (item.delivery_type && item.delivery_type.length > 0) {
            setSelectedDeliveryType(item.delivery_type[0].id);
        }
    }, [item]);

    return (

        <View style={styles.level2ProductItem}>

            <TouchableOpacity
                onPress={() => {
                    // if (showOnly) {
                    //     return;
                    // }
                    openModal(item);
                }}
            >
                <View style={styles.productDetail}>
                    <ThumbnailImage
                        width={100}
                        height={100}
                        path={item.image_url}
                    />
                    <View style={styles.productTextualDetail}>
                        <Text style={styles.productName}>{item.product_item_name}</Text>
                        {/* TODO */}
                        {item.discounted_price ? <Text>Rs. {item.discounted_price.toFixed(2)}</Text> : <Text>Rs. {item.product_item_price?.toFixed(2)}</Text>}
                        {/* <Text>Rs. {item.product_item_price.toFixed(2)}</Text> */}
                        <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                            {item.specifications?.slice(0, showMore ? item.specifications.length : 2).map((variation) => (

                                <View key={variation.name} style={{ flexDirection: "row" }}>
                                    <Text>{variation.name}: </Text>
                                    <Text>{variation.value}</Text>
                                </View>
                            ))}

                            {/* Toggle button */}
                        </View>
                        {showOnly === undefined && (
                            <>
                                {item.specifications?.length > 2 && (
                                    <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => toggleShowMore(item.shopping_cart_item_id, setShowMoreMap)}>
                                        <Text style={{ color: 'blue' }}>
                                            {showMore ? 'Show Less' : 'Show More'}
                                        </Text>
                                    </TouchableOpacity>

                                )}
                                <Text>Quantity: {item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        HandleRemoveFn(item.shopping_cart_item_id, removeFromCart);
                                    }}
                                >
                                    <Text>X Remove</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}>

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {item.delivery_type?.map((deliveryType, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setSelectedDeliveryType(deliveryType.id);
                                    setModalVisible(false);
                                    // console.log("CCCCCCCCCCC", state.totalPriceState)
                                    // calculate the delivery cost
                                    calculateDeliveryCostFn(item, deliveryType.id);

                                }}
                            >
                                <Text style={styles.modalText}>{`${deliveryType.name} (${deliveryType.cost} Rs. - ${deliveryType.duration})`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.otherDetails}>
                    <Text>Delivery Fee</Text>
                    <Text>{item.quantity} {String.fromCharCode(215)} {selectedDeliveryType ? item.delivery_type?.find(dt => dt.id === selectedDeliveryType).cost : '0'}  Rs.</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    console.log(selectedDeliveryType)
                }}
            >
                <View style={styles.otherDetails}>
                    <Text>Seller</Text>
                    <Text>{item.shop_name}</Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CartItem;

const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})