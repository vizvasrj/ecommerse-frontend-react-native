import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { Context as orderContext } from '../../context/orderContext';
import ThumbnailImage from '../../components/thumbnailImage';

const OrderList = ({ navigation }) => {

    const { state, getOrderListFn } = React.useContext(orderContext);

    React.useEffect(() => {
        getOrderListFn(0);
    }, [])

    const [usedOffset, setUsedOffset] = useState([]);
    const [isEndReached, setIsEndReached] = useState(false);
    const handleEndReached = () => {
        if (!isEndReached) {
            // console.log("inside handleEndReached")
            // console.log("next_offset", state.nextOffset)
            if (state.nextOffset !== null) {
                if (usedOffset.includes(state.nextOffset)) {
                    // console.log("offset is already used");
                    return;
                }
                // console.log("inside if");
                getOrderListFn(state.nextOffset);
            } else {
                setIsEndReached(true);
            }

        }
    }


    return (
        <View style={styles.container}>

            <FlatList
                refreshing={state.isLoading}
                data={state.orderList}
                keyExtractor={(item) => item.order_id}
                onEndReached={handleEndReached}
                onRefresh={() => getOrderListFn(0, true)}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => {
                                navigation.navigate('OrderDetail', {
                                    orderId: item.order_id,
                                    title: `${item.order_id}`,
                                });
                            }}
                        >
                            <Text style={styles.orderId}>
                                Order ID: {item.order_id}
                            </Text>
                            <Text style={styles.orderData}>
                                Payment Type: {item.payment_type}
                            </Text>
                            <Text style={styles.orderData}>
                                Shipping Method: {item.shipping_method}
                            </Text>
                            <Text style={styles.orderData}>
                                Order Total: {item.order_total}
                            </Text>
                            <Text style={styles.orderData}>
                                Order Status: {item.order_status}
                            </Text>
                            <Text>
                                {new Date(item.created_at).toLocaleString("en-GB")}

                            </Text>
                            {item.order_items.map((orderItem) => (
                                <View key={orderItem.id} style={{ flexDirection: "row" , paddingTop: 5}}>
                                    <View style={{marginRight: 7}}>
                                        <ThumbnailImage
                                            width={50}
                                            height={50}
                                            path={orderItem.image_url}
                                            style={styles.image}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <Text>Product Name: {orderItem.product_name}</Text>
                                        <Text>Order Status: {orderItem.order_status}</Text>

                                    </View>
                                </View>
                            ))}

                        </TouchableOpacity>
                    )
                }}
            />



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
    },
    itemContainer: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9c2ff',
        borderRadius: 5,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderData: {
        fontSize: 14,
    },

});

export default OrderList;