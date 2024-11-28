import React, { useCallback, memo } from "react";
import { Text, FlatList, View, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { Context as CartContext } from "../../context/cartContext";
import CartItemWithAllThings from "../../components/new/cartConponentQuantity";
import {Button} from '@rneui/themed'

const CartScreen = ({ navigation }) => {
    const { state, getAllCartItem } = React.useContext(CartContext);

    // const [checked, setChecked] = React.useState([]);



    React.useEffect(() => {
        getAllCartItem(state.next_offset);
    }, []);


    const [checkboxItems, setCheckboxItems] = React.useState([]);

    const onEndReached = () => {

        getAllCartItem(state.next_offset);
    }
    const flatListRef = React.useRef(null);


    return (
        <>


            <View>
                <TouchableOpacity
                    onPress={() => {
                        // map state.currentPayload and print only product_item_id
                        console.log(checkboxItems.map(item => item))
                    }}


                >
                    <Text >checked items</Text>
                </TouchableOpacity>


                <FlatList
                    ref={flatListRef}
                    onEndReachedThreshold={0}
                    onEndReached={onEndReached}
                    data={state.cart_items}
                    keyExtractor={(item) => item.product_item_id}
                    renderItem={({ item }) => {
                        return (
                            <CartItemWithAllThings item={item} checkboxItems={checkboxItems} setCheckboxItems={setCheckboxItems} />

                        )
                    }}
                />
                <TouchableOpacity
                    style={{postion:'absolute',bottom:75, borderRadius:0, backgroundColor:"lightgreen", padding:10, alignItems:'center', borderColor: "grey", borderWidth: 1 }}
                    onPress={() => {
                        // map state.currentPayload and print only product_item_id
                        console.log("buy")
                        navigation.navigate("Checkout", {shopping_cart_item_ids: checkboxItems})
                    }}
                    activeOpacity={1}


                >
                    <Text style={{color: "blue", fontSize: 25, fontWeight: 800}}>Checkout</Text>
                </TouchableOpacity>
            </View>

        </>

    )

}
export default CartScreen;
styles = StyleSheet.create({
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: 'red',
        // textDecorationLine: "line-through"
    },
    productDisountedPrice: {
        fontSize: 14,
        color: 'green',
    },
});
