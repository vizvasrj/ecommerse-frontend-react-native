import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { Input, Button } from '@rneui/themed';
// import { productAddContext } from '../contexts/productAddContext';
import { Context as productAddContext } from '../context/productAddContext';
import CategoryFilterForm from './categoryFilter';
import { useNavigation } from '@react-navigation/native';
import { Context as ShopContext } from '../context/shopContext';

const AddProductForm = () => {
    // console.log("Render Error", shopDetail)
    const currentTimestamp = new Date();

    const navigation = useNavigation();

    const [error, setError] = useState('');

    const {state: shopState} = useContext(ShopContext);
    const shopDetail = shopState.defaultShop;

    const {
        state, add_product, search_categories,
        setShopId, setCategoryId, setName,
        setTotalStock, setPrice, setPriceUnit,
        setDescription, reset_state } = useContext(productAddContext);

    const [submited, setSubmited] = useState(false);

    const shopId = state.shopId;

    const categoryId = state.categoryId;
    const name = state.name;
    const totalStock = state.totalStock;
    const price = state.price;
    const priceUnit = state.priceUnit;
    const description = state.description;

    const saved_product = state.saved_product;

    useEffect(() => {
        navigation.addListener('focus', () => {
            // console.log(`are equal ?? shopDetail (${shopDetail} === ${state.shopId}) from state.state`)
            // console.log("from useEffect focus");
            // if (shopDetail !== shopId) {
            //     console.log("resetting state")
            //     reset_state();
            // }
            // console.log(`are equal ?? ${shopDetail} === ${shopId}`)
            setShopId(shopDetail.id);
            // console.log("from useEffect focus");
        });
    }, [navigation])

    useEffect(() => {
        if (saved_product) {
            console.log("from useEffect saved_product changed?>", saved_product)
            // setItems(state.categories)
            navigation.navigate("ImageUploader", { productId: `${saved_product.id}` })
        }
    }, [saved_product])




    // Use the reset_state function from the useContext hook

    const handleSubmit = async () => {
        if (submited) {
            return;
        }
        const product = {
            shopId: parseInt(shopId),
            categoryId: parseInt(categoryId),
            name: name,
            totalStock: parseInt(totalStock),
            price: parseInt(price),
            priceUnit: priceUnit,
            description: description,
        };
        // validate all fields are filled
        if (!name || !totalStock || !price || !priceUnit || !description || !categoryId || !shopId) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            setSubmited(true);
            await add_product(product);

            console.log("product data::", product)
            setError('');
            // navigation.navigate("ImageUploader", { productId: 4 })
        } catch (err) {
            setError('Error adding product. Please try again later.');
        }
    };
    // return <Text>some {shopDetail.name}</Text>



    return (
        <View style={{flex: 1}}>
            <FlatList refreshing={true} onRefresh={() => void 0} />
            <ScrollView style={styles.container}>

                <View>
                    {/* <Button title="Reset State" onPress={() => reset_state()} /> */}

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <View style={styles.centeredView}>
                        {/* <Text style={styles.titleText}>Add Product for shop id {shopId}</Text> */}
                        <TouchableOpacity 
                            style={{flexDirection: "row", justifyContent: "space-between"}}
                            onPress={() => {
                            console.log("you can change default shop by pressing here");

                        }}>
                            <Text style={styles.shopNameText}>{shopDetail.name}</Text>
                            <Text>▼</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => {
                            navigation.navigate("CategorySearcherSelect")
                        }}
                    >
                        {
                            state.selectedCategoryItem !== null
                                ? <Text style={styles.categoryText}>{state.selectedCategoryItem?.name}</Text>
                                : <Text style={styles.categoryText}>Select Category</Text>
                        }
                    </TouchableOpacity>
                    <Input
                        label="Name"
                        value={name}
                        onChangeText={(name) => setName(name)}
                        style={styles.input}
                    />
                    {/* ... your other inputs ... */}
                    <Input
                        label="Total Stock"
                        value={totalStock}
                        onChangeText={(total_stock) => setTotalStock(total_stock)}
                        keyboardType="numeric"
                        style={styles.input}

                    />
                    <Input
                        label="Price per unit"
                        value={price}
                        onChangeText={(price) => setPrice(price)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Input
                        label="Quantity Unit"
                        value={priceUnit}
                        onChangeText={(price_unit) => setPriceUnit(price_unit)}
                        style={styles.input}
                    />
                    <Input
                        multiline={true}
                        style={{ textAlignVertical: 'top' }}
                        label="Description"
                        value={description}
                        onChangeText={(description) => setDescription(description)}
                        // style={styles.input}
                    />

                </View>
            </ScrollView>
                    {submited 
                        ? <Button color={"secondary"} title="Add Product" /> 
                        : <Button color={"primary"} title="Add Product" onPress={handleSubmit} />}
                    
        </View>
    );

};

export default AddProductForm;


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    centeredView: {
        paddingBottom: 10,
        // alignItems: "center",
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shopNameText: {
        color: '#888',
    },
    
    categoryButton: {
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: "#bed0eb",
        borderColor: "grey",
        marginBottom: 20,
    },
    categoryText: {
        color: "#666698",
        fontSize: 25,
    },
    input: {
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
