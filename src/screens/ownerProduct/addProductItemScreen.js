import { Button } from '@rneui/base';
import React, { useEffect, useState, useRef } from 'react';

import { FlatList, Text, View, TextInput, ScrollView, StyleSheet } from 'react-native';

import productApi from '../../api/product';
import { Context as MerchantProductContext } from '../../context/merchant/merchantProductContext';
import { secondaryColor } from '../../theme/color';
const AddProductItemScreen = ({ navigation, route }) => {
    const { state, addProductItemFn, getProductItemFn, updateProductItemFn } = React.useContext(MerchantProductContext);
    const { productItem } = state;
    const { productId, productItemId } = route.params;

    const [error, setError] = useState(null);
    const [price, setPrice] = React.useState(0);
    const [qtyInStock, setQtyInStock] = React.useState(0);
    const [variationItems, setVariationItems] = React.useState([]);

    const [success, setSuccess] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const [runVariation, setRunVariation] = useState(false);
    
    
    useEffect(() => {
        if (!productItemId) {
            console.log("productId", productId);
            setRunVariation(true);
        }
    }, [productId])
    const variationGetFn = async () => {
        console.log("variationGetFn", );
        try {
            const response = await productApi.get(`/v2/user/merchant/products/variation/${productId}`);
            console.log("from variationGetFn", response.data);
            setVariationItems(response.data.result.variations);
        } catch (err) {
            console.log(err);
        }
    }

    useState(() => {
        if (productItemId) {
            getProductItemFn(productItemId, setError);
            // variationGetFn();
        }
    }, []);



    useEffect(() => {
        if (productItem && productItemId) {
            setPrice(productItem.original_price);
            setQtyInStock(productItem.qty_in_stock);
            console.log("productItem.specifications", productItem)
            setInputValues(productItem.specs_hash_map);
            setRunVariation(true);
        }
    }, [productItem]);
    
    const handleInputChange = (itemId, text) => {
        setInputValues({
            ...inputValues,
            [itemId]: text,
        });
    };
    

    const scrollViewRef = useRef();
    useEffect(() => {
        if (error != null) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [error])


    

    const addProductItemFnHandler = () => {
        setError(null);
        addProductItemFn({
            product_id: productId,
            price: parseFloat(price),
            qty_in_stock: parseInt(qtyInStock),
            variation_option_value: inputValues,
            setError: setError,
            setSuccess: setSuccess,
        });
    }




    const updateProductItemFnHandler = () => {
        setError(null);
        updateProductItemFn({
            product_item_id: productItemId,
            price: parseFloat(price),
            qty_in_stock: parseInt(qtyInStock),
            specifications: Object.entries(inputValues).map(([variation_id, variation_option_value]) => {
                return {
                    variation_id: parseInt(variation_id),
                    variation_option_value
                };
            }),
            setError: setError,
        });
    
    }

    useEffect(() => {
        if (runVariation) {
            variationGetFn();
            setRunVariation(false);

        }
    }, [runVariation])

    useEffect(() => {
        if (success) {
            navigation.navigate("NewImageUploader", { productItemId: success.product_item_id, productId: productId})
        }
    }, [success])

    const getVariationOptionValueFromInputValues = (variation_id) => {
        const variation_option_value = inputValues[variation_id];
        return variation_option_value !== undefined ? variation_option_value : "";
    }
    return (
        <>
            <ScrollView style={styles.container} ref={scrollViewRef}>
                <View style={styles.nestedContainer}>

                    <View>
                        <View style={styles.labelInput}>
                            <Text style={styles.label}>Price</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={"0.00"}
                                    keyboardType='numeric'
                                    onChangeText={(text) => {
                                        setPrice(text);
                                    }}
                                    value={`${price}`}
                                />
                            </View>

                        </View>
                        <View style={styles.labelInput}>
                            <Text style={styles.label}>Quantity in stock</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={"0"}
                                    keyboardType='numeric'
                                    onChangeText={(text) => {
                                        setQtyInStock(text);
                                    }}
                                    value={`${qtyInStock}`}
                                />
                            </View>
                        </View>
                        {variationItems?.map((item) => {
                            return (
                                <View key={item.id} style={styles.labelInput}>

                                    <View >
                                        <Text style={styles.label}>{item.name}</Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={item.name}
                                                onChangeText={(text) => {
                                                    handleInputChange(item.id, text);
                                                }}
                                                // value={inputValues[item.id]}
                                                value={getVariationOptionValueFromInputValues(`${item.id}`)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: "red" }}>{error}</Text>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button title="Create Product Item"
                    onPress={() => {
                        console.log("inputValues", inputValues)
                        if (productItemId) {
                            updateProductItemFnHandler();
                        }
                        else {
                            addProductItemFnHandler();
                        }
                    }}
                />
            </View>
        </>
    );
}
export default AddProductItemScreen;

const styles = StyleSheet.create({
    nestedContainer: {
        flex: 1,
        padding: 10,

    },
    container: {
        flex: 1,
        padding: 10,

    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    inputContainer: {
        // borderBottomWidth: 1,
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 5,
        backgroundColor: secondaryColor
    },
    input: {
        height: 40,

    },
    buttonContainer: {
        // flex: 1,
        padding: 10,
        justifyContent: "flex-end",
    },
    labelInput: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 5,
        backgroundColor: secondaryColor
    }
});
