import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { primaryColor, secondaryColor } from '../../theme/color';
import R1 from '../../components/RadioButton';
import R2 from '../../components/button/radioButton';
import { Context as OrderContext } from '../../context/orderContext';
import OrderItemDetails from '../../components/cart/orderItemDetails';
const OrderCancel = ({route}) => {
    const {state, cancelOrderFn} = React.useContext(OrderContext);
    const order = route.params.orderLineItem;
    const orderID = route.params.orderID;

    console.log('OrderCancel orderID:', orderID)
    console.log('OrderCancel order:', order);


    const [value, onChangeText] = React.useState("");

    const reasons = [
        {
            "id": 1,
            "reason": "Found a Better Price"
        },
        {
            "id": 2,
            "reason": "Found a Better Product"
        },
        {
            "id": 3,
            "reason": "Long Delivery Time"
        },
        {
            "id": 4,
            "reason": "Change of Mind"
        },
        {
            "id": 5,
            "reason": "Accidental Order"
        },
        {
            "id": 6,
            "reason": "Payment Issues"
        },
        {
            "id": 7,
            "reason": "Poor Customer Service"
        },
        {
            "id": 8,
            "reason": "Negative Reviews"
        },
        {
            "id": 9,
            "reason": "Shipping Costs"
        }
    ]


    const validateReason = () => {
        if (value === "") {
            return false;
        }
        return true;
    }
    const [selected, setSelected] = React.useState(false);
    return (
        <>
            <View style={styles.container}>
                <OrderItemDetails orderItem={order} />
                
                <Text style={{margin: 10}}>Reason To cancel</Text>

                {reasons.map((reason) => (
                    <R1 
                        style={{ marginLeft: 10 }}
                        key={reason.id}
                        label={reason.reason}
                        
                        onSelect={() => {
                            setSelected(reason.id);
                            onChangeText(reason.reason);
                        }}
                        selected={selected === reason.id}
                    
                    />
                ))}

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, margin: 10, padding: 10}}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />

            </View>
            <View style={styles.cancel_button}>
                <TouchableOpacity
                    style={{ alignItems: 'center', backgroundColor: "red", padding: 10, borderWidth: 0.2, borderRadius: 5 }}
                    onPress={() => {
                        console.log(value);
                        if (!validateReason()) {
                            alert("Please select a reason to cancel the order");
                            return;
                        }
                        cancelOrderFn({orderId: orderID, reason: value, orderLineId: order.id})
                    }}
                >
                    <Text style={{ color: "wheat", fontWeight: 800, }}>Cancel Order</Text>
                </TouchableOpacity>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: secondaryColor,
        padding: 20,
    },
    cancel_button: {
        // marginTop: 5,
        padding: 10,
        backgroundColor: primaryColor,
        // borderRadius: 5,
    }
});

export default OrderCancel;