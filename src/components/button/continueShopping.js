import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ContinueShoppingButton = ({ navigation }) => {
    return (
        <>
            <View style={{ }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#ccc", padding: 20 }}>

                    <TouchableOpacity style={{ paddingTop: 8, paddingBottom: 8, flexDirection: "column" }}
                        onPress={() => {
                            console.log("Continue Shopping");
                        }}
                    >
                        <Text>Continue Shopping</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>

        </>
    )
}

export default ContinueShoppingButton;

