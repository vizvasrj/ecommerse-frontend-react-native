import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ButtonNext = ({ totalPriceState, onPressDetail, onPressNext }) => {
    return (
        <>
            <View style={{ }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#ccc", padding: 20 }}>

                    <TouchableOpacity style={{ paddingTop: 8, paddingBottom: 8, flexDirection: "column" }}
                        onPress={onPressDetail}
                    >
                        <Text style={{ color: "purple", paddingLeft: 20, paddingRight: 20 }}>
                            Rupees: {totalPriceState.total_discounted_price.toFixed(2)}
                        </Text>
                        <Text style={{ color: "blue", fontWeight: 500, paddingLeft: 20, paddingRight: 20 }}>
                            VIEW PRICE DETAILS
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressNext}
                        style={{ backgroundColor: "purple", borderRadius: 10, justifyContent: "center" }}>
                        <Text style={{ color: "white", paddingLeft: 40, paddingRight: 40, }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}

export default ButtonNext;

