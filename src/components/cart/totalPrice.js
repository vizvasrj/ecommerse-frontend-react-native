import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { Context as CartContext } from "../../context/cartContext";
const TotalPriceComponent = ({ totalPriceState, isBlinking, additional_charge_text }) => {

    const key = isBlinking ? "blinking" : "notBlinking";
    const { state } = React.useContext(CartContext);
    const totalDeliveryCost = state.additional_data ? state.additional_data.reduce((total, item) => total + item.totalDeliveryCost, 0) : 0;

    const [total_discounted_price, set_total_discounted_price] = React.useState(0);
    React.useEffect(() => {
        set_total_discounted_price(totalPriceState.total_discounted_price + totalDeliveryCost);
    }, [state.additional_data, totalPriceState])

    return (
        <>
            <View key={key} style={{
                padding: 10,
                flex: 1,
                backgroundColor: isBlinking ? '#ff050510' : ''
            }}>
                <View style={{

                }}>
                    <View style={styles.orderTotalDetails}>
                        <Text>Total Product Price: </ Text>

                        <Text style={styles.orderDetailCostText}><Text style={styles.plus}>+</Text> R: {totalPriceState.total_product_price.toFixed(2)}</ Text>
                    </View>
                    <View style={styles.orderTotalDetails}>
                        <Text>Total Discount Price: </ Text>
                        <Text style={styles.orderDetailCostText}><Text style={styles.minus}>—</Text> R: {totalPriceState.total_discount.toFixed(2)}</ Text>
                    </View>
                    <View style={styles.orderTotalDetails}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("additional fees")
                                ToastAndroid.show(additional_charge_text, ToastAndroid.SHORT);
                            }}
                        >
                            <Text>Additional Fees: </Text>
                        </TouchableOpacity>
                        <Text style={styles.orderDetailCostText}><Text style={styles.plus}>+</Text> R: {totalDeliveryCost.toFixed(2)}</Text>
                    </View>
                    <View style={{ borderWidth: 0.2, borderRadius: 2 }}>
                    </View>
                    <View style={styles.orderTotalDetails}>
                        <Text>Order Total: </ Text>
                        <Text style={styles.orderDetailCostText}>R: {total_discounted_price.toFixed(2)}</ Text>
                    </View>
                </View>

            </View>
        </>
    )

}

const styles = StyleSheet.create({
    plus: {
        color: "tomato"
    },
    minus: {
        color: "green"
    },
    orderTotalDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    orderDetailCostText: {
        fontWeight: "600",
    },

})

export default TotalPriceComponent;