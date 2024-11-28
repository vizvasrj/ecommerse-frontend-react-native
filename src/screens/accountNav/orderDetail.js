import React from "react";

import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, Button, Touchable } from "react-native";
import { Context as orderContext } from '../../context/orderContext';
import { primaryColor, secondaryColor, textColor, darkOne } from "../../theme/color";
import ThumbnailImage from "../../components/thumbnailImage";
import inr from "../../symbols/inr";
import OrderItem from "../../components/cart/orderItem";


const OrderDetail = ({ navigation, route }) => {
    const { state, getOrderDetailFn, clearOrderDetailFn } = React.useContext(orderContext);
    const [isLoading, setIsLoading] = React.useState(false); // Add this line
    const [hasError, setHasError] = React.useState(false); // Add this line
    const orderId = route.params.orderId;
    console.log('OrderDetail orderId:', orderId);

    React.useEffect(() => {
        // clearOrderDetailFn();
        setIsLoading(true); // Set loading to true before fetching data
        getOrderDetailFn(orderId)
            .then(() => {
                setIsLoading(false); // Set loading to false after fetching data
            })
            .catch(() => {
                setIsLoading(false); // Set loading to false after fetching data
                setHasError(true); // Set hasError to true if there is an error
            })

    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }



    if (hasError) {
        return (
            <View style={styles.container}>
                <Text>An error occurred while fetching the data.</Text>
            </View>
        );
    }


    // return (
    //     <View style={styles.container}>

    //         <ScrollView>
    //             {state.order_items?.map((orderItem) => (
    //                 <View style={styles.pelletBackground}>
    //                     <View style={styles.grid} key={orderItem.id}>
    //                         <View style={{ width: 100, height: 100 }}>
    //                             <ThumbnailImage
    //                                 width={100}
    //                                 height={100}
    //                                 path={orderItem.image_url}
    //                                 style={styles.image}
    //                             />

    //                         </View>
    //                         <View style={{ flexDirection: "column", marginLeft: 10 }}>
    //                             <Text>Product Name: {orderItem.product_name}</Text>
    //                             <Text>Quantity: {orderItem.quantity}</Text>
    //                             <Text>Purchased Price: {orderItem.purchased_price}</Text>
    //                             <Text>Shipping Method: {orderItem.shipping_method}</Text>
    //                             <Text>Shop Name: {orderItem.shop_name}</Text>
    //                             <Text>Order Status: {orderItem.order_status}</Text>
    //                         </View>
    //                         {/* <Text>Product Description: {orderItem.product_description}</Text> */}
    //                     </View>
    //                     <View>
    //                         <TouchableOpacity
    //                             style={styles.button}
    //                             onPress={() => {
    //                                 console.log("navigation to cancel page")
    //                                 navigation.navigate('OrderCancel');
    //                             }}
    //                         >
    //                             <Text style={styles.buttonText}>
    //                                 Cancel
    //                             </Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             ))}
    //             <View style={styles.pelletBackground}>
    //                 <View style={[styles.grid, {flexDirection: "column"}]}>
    //                     <Text style={styles.title}>Shipping Address</Text>
    //                     <Text>{state.shipping_address}</Text>
    //                 </View>
    //             </View>
    //             <View style={styles.pelletBackground}>
    //                 <TouchableOpacity style={[styles.grid, {flexDirection: "row"}]}
    //                     onPress={() => {
    //                         console.log();
    //                     }}
    //                 >
    //                     <Text style={{fontWeight: 800}}>Order Total: </Text>
    //                     <Text>{inr}{state.orderList.find(order => order.order_id === orderId)?.order_total.toFixed(2)}</Text>
    //                 </TouchableOpacity>
    //             </View>

    //         </ScrollView>

    //     </View>
    // )
    return (
        <ScrollView>
            {state.order_items?.map((orderItem) => {
                console.log("orderItem", orderItem.order_status, orderItem.id);
                if (orderItem.order_status === "cancelled") {
                    return (
                        <View 
                            key={orderItem.id}
                        >

                            <OrderItem
                                cancelled={true}
                                style={{ backgroundColor: "#44422290" }}
                                key={orderItem.id}
                                orderItem={orderItem}
                                onPress={() => {
                                    console.log("navigation to cancel page", "orderID ", orderId);
                                    navigation.navigate("OrderCancel", {
                                        orderLineItem: orderItem,
                                        orderID: orderId,
                                    });
                                }}
                            />
                        </View>
                    )
                }
                return (
                    <OrderItem
                        key={orderItem.id}
                        orderItem={orderItem}
                        onPress={() => {
                            console.log("navigation to cancel page", "orderID ", orderId);
                            navigation.navigate("OrderCancel", {
                                orderLineItem: orderItem,
                                orderID: orderId,
                            });
                        }}
                    />
                )
                    

            })}
            <View style={styles.pelletBackground}>
                <View style={[styles.grid, { flexDirection: "column" }]}>
                    <Text style={styles.title}>Shipping Address</Text>
                    <Text>{state.shipping_address}</Text>
                </View>
            </View>
            <View style={styles.pelletBackground}>
                <TouchableOpacity style={[styles.grid, { flexDirection: "row" }]}
                    onPress={() => {
                        console.log();
                    }}
                >
                    <Text style={{ fontWeight: 800 }}>Order Total: </Text>
                    <Text>{inr}{state.orderList.find(order => order.order_id === orderId)?.order_total.toFixed(2)}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    button: {
        marginTop: 5,
        padding: 10,
        backgroundColor: "#ff0000",
        borderRadius: 5,
        // marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    grid: {
        // marginTop: 10,
        // margin: 5,
        flexDirection: "row",
        borderRadius: 10,
        padding: 5,
        borderColor: "grey",
        backgroundColor: secondaryColor,
    },
    multiLineText: {
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    pelletBackground: {
        backgroundColor: darkOne,
        padding: 10,
        marginBottom: 10,
    },
});

export default OrderDetail;