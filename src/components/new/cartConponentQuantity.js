import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from 'react-native-vector-icons/AntDesign';
import { Context as CartContext } from "../../context/cartContext";
import ThumbnailImage from "../../components/thumbnailImage";
// import CartDropdown from "../../components/new/cartDropdown";

// import { CheckBox } from '@rneui/base';
import CheckBox from '../../components/new/checkbox';

const CartItemWithAllThings = ({ item, checkboxItems, setCheckboxItems }) => {

    const [quantity, setQuantity] = React.useState(item.quantity);
    const { state, removeFromCart,
        // add_checkbox_item_fn,
        // remove_checkbox_item_fn,
        incrementDecrementQuantityFn,
    } = React.useContext(CartContext);

    // const checkboxItems = state.checkbox_items;

    const navigation = useNavigation();
    let timeoutId;
    const incrementDecrementQuantityFnTHIS = (itemId, newQuantity) => {
        // Your implementation of incrementDecrementQuantityFn
        console.log(`Incrementing quantity for item ${itemId} to ${newQuantity}`);
        incrementDecrementQuantityFn(item.shopping_cart_item_id, newQuantity);
        // Call your server-side function here
    };

    // const handleIncrement = () => {
    //     setQuantity(quantity + 1);
    //     // incrementDecrementQuantityFn(item.shopping_cart_item_id, quantity + 1);
    //     clearTimeout(timeoutId);

    //     // Set a new timeout for 1000 milliseconds (1 second)
    //     timeoutId = setTimeout(() => {
    //       incrementDecrementQuantityFn(item.shopping_cart_item_id, quantity + 1);
    //     }, 1000);
    // };

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => prevQuantity - 1);
    };


    const isMounted = React.useRef(true);
    // const isDevelopment = React.useRef(process.env.NODE_ENV === "development");

    React.useEffect(() => {
        if (isMounted.current) {
            // Skip the first run on mount or page reload
            isMounted.current = false;
            return;
        }
        let timeoutId;

        const handleIncrementWithDelay = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                incrementDecrementQuantityFnTHIS(item.shopping_cart_item_id, quantity);
            }, 1000);
        };

        handleIncrementWithDelay();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [quantity]);


    // const handleDecrement = () => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //         incrementDecrementQuantityFn(item.shopping_cart_item_id, quantity - 1);
    //     }
    // };

    const handleQuantityChange = (text) => {
        const newQuantity = parseInt(text);
        if (!isNaN(newQuantity)) {
            if (newQuantity === 0) {
                setQuantity(1);
            } else {
                setQuantity(newQuantity);
            }
        }
    };
    const handleRemove = () => {
        removeFromCart(item.shopping_cart_item_id);
    }

    const handleQuantityEndEditing = () => {
        // Save the updated quantity here
        console.log("Updated quantity:", quantity, item.shopping_cart_item_id);
        incrementDecrementQuantityFn(item.shopping_cart_item_id, quantity);

    };

    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        // console.log("checkedItem", checkedItem)
        // setChecked(checkedItem);
        checkboxItems.map((citem) => {
            if (citem.shopping_cart_item_id === item.shopping_cart_item_id) {
                setChecked(true);
            }
        }
        )


    }, [checkboxItems])

    React.useEffect(() => {
        if (!checked) {
            // if its true then remove it from checkboxItems

            // console.log("!checked",item.shopping_cart_item_id, checkboxItems.filter(id => id !== item.shopping_cart_item_id))
            const removed = checkboxItems.filter(id => id !== item.shopping_cart_item_id);
            setCheckboxItems(removed)
        } else {
            console.log("checked")
            // if its false then add it to checkboxItems
            checkboxItems.push(item.shopping_cart_item_id);
        }
    }, [checked]);

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <View>
                <View style={{ flex: 1, flexDirection: "row", position: "absolute", marginTop: 15 }}>
                    <CheckBox
                        checked={checked}
                        onPress={() => {
                            console.log("checkbox", checked)
                            setChecked(!checked);

                        }}
                    />
                </View>
                <View
                    style={{ marginLeft: 10 }}
                >

                    <View style={styles.productItem}>
                        {item.image_url ? (
                            <ThumbnailImage
                                path={item.image_url}
                                width={200}
                                height={200}
                                style={styles.productImage}
                            />
                        ) : (
                            <Image
                                source={{
                                    uri:
                                        "https://apanashop-some-bucket.s3.ap-south-1.amazonaws.com/media/e/0/d783fb23d84ee53c101db719d836fb.jpg",
                                }}
                                style={styles.productImage}
                            />
                        )}

                        <View style={styles.productDetails}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <Button title="+" onPress={handleIncrement} />
                                <TextInput
                                    value={`${quantity}`}
                                    onChangeText={handleQuantityChange}
                                    onEndEditing={handleQuantityEndEditing}
                                />
                                {/* <CartDropdown selectedValue={`${quantity}`} onValueChange={setQuantity} /> */}
                                <Button title="-" onPress={handleDecrement} />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("NewOwnerProduct", {
                                        screen: "NewProductDetail",
                                        params: { productItemId: `${item.product_item_id}` },
                                    });
                                }}

                            >
                                <Text style={styles.productName}>{item.product_item_name}</Text>

                            </TouchableOpacity>
                            <Text style={{}}>PI: {item.product_item_id}</Text>
                            <Text style={{}}>SCI: {item.shopping_cart_item_id}</Text>
                            <Text style={styles.productPrice}>{item.product_item_price}</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("quantity", quantity)
                                }}
                            >
                                <Text>quantity</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    console.log("remove");
                                    handleRemove();

                                }}
                            >
                                <Text>Remove<Icons name="delete" size={20} /></Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    productItem: {
        flex: 1,
        flexDirection: "row",
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        padding: 10,
        margin: 10
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    productDetails: {
        flex: 1,
        flexDirection: "column",
        marginLeft: 10
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "darkblue"
    },
    productPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "darkblue"
    }
});

export default React.memo(CartItemWithAllThings);