import React, { useEffect, useState, useContext } from 'react';
import { Text, ScrollView, Button, FlatList, StyleSheet, View, Modal, Dimensions, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import ProductApi from '../../api/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageView from "react-native-image-viewing";
import QuantityInput from '../../components/new/quantityInput';
import { Context as CartContext } from '../../context/cartContext';

const NewProductDetailScreen = ({ navigation, route }) => {
    // insert <Text> into navigation header\

    const productItemId = route.params.productItemId;
    const {addToCart, } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [images, setImages] = useState(null);
    const [variance, setBrothers] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                // console.log("token", token);
                setToken(token);
                // console.log("Work hard and fast product id is this: ", productItemId);
                handleCallback();
            } catch (err) {
                console.log(err);
            }
        };

        fetchProductData();
    }, [navigation, productItemId, handleCallback]);

    const productFetch = async ({ productItemId }) => {
        try {
            const response = await ProductApi.get(`/v2/product_item/${productItemId}`)
            // console.log("from productFetch", response.data.result);
            setProduct(response.data.result);
            const newImages = response.data.result.product_item.product_images.map((image) => {
                return { ...image, uri: image.image_url };
            });

            setImages(newImages);
            const newBrothers = response.data.result.variance.filter(item => item.product_item_id !== productItemId);
            setBrothers(newBrothers);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCallback = () => {
        // Perform any actions or logic you want to execute when the callback is triggered
        // console.log("Callback triggered!");
        // Example: Call the productFetch function with a specific productItemId
        productFetch({ productItemId: productItemId });
    }




    const [visible, setIsVisible] = useState(false);
    // const images = productData.result.product_item.product_images.map((image) => {
    //     return { ...image, uri: image.image_url };
    // });

    const flatListRef = React.useRef();
    const handlePageChange = (newIndex) => {
        setCurrentIndex(newIndex);
        flatListRef.current.scrollToIndex({ index: newIndex });
    };

    const handleImagePress = (index) => {
        // console.log(`Pressed image at index: ${index}`);
        setIsVisible(true);

    };
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => {
            handleImagePress(index);
            // console.log("pressed");
        }}>
            <Image source={{ uri: item.uri }} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
    );
    // const variance = productData.result.variance.filter(item => item.product_item_id !== "113");

    async function handleGetAllCart() {
        console.log("get all cart");
        try {
            let cart = await AsyncStorage.getItem('cart');
            console.log(cart);
        } catch (err) {
            console.log("get all cart error:", err);
        }
    }

    async function removeSomeFromCart() {
        try {
            let cart = await AsyncStorage.getItem('cart');
            const json_cart = JSON.parse(cart);
            console.log("json:Cart", json_cart.product_and_quantity);
            // remove "113" key value from json_cart
            delete json_cart.product_and_quantity["113"];
            console.log("after Remove json:Cart", json_cart.product_and_quantity);
            cart = JSON.stringify(json_cart);
            await AsyncStorage.setItem('cart', cart);

        } catch (err) {
            console.log("removeSomeFromCart:", err);
        }

    }

    async function handleAddItemCart() {
        let CART = {
            "product_and_quantity":
            {
                "113": 2,
            }
            ,
        }
        try {
            const cart = await AsyncStorage.getItem('cart');
            if (cart) {
                console.log("if part because it exists.")
                await AsyncStorage.mergeItem('cart', JSON.stringify(CART));
            } else {
                console.log("else part because it not exists.")
                console.log(JSON.stringify(CART))
                await AsyncStorage.setItem('cart', JSON.stringify(CART));
                console.log("REACHED MILESTONE")
            }
            console.log("SECOND MILESTONE")
            CART = {
                "product_and_quantity":
                {
                    "114": 5,
                }
            }
            await AsyncStorage.mergeItem('cart', JSON.stringify(CART));
            console.log("added item 114 5");
            CART = {
                "product_and_quantity":
                {
                    "113": 9,
                }
                ,
            }
            await AsyncStorage.mergeItem('cart', JSON.stringify(CART));
            console.log("added item 113 9");





        } catch (err) {
            console.log("add item error:: ", err);
        }

    }

    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>New product detail screen {productItemId}</Text>
                </View> */}
                <Text>New product detail screen  asdasdas{productItemId}</Text>
                {/* <Button
                    title="Fetch product"
                    onPress={productFetch}

                /> */}
                {/* deselect all */}
                <FlatList
                    ref={flatListRef}
                    data={images}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const newIndex = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                        setCurrentIndex(newIndex);
                    }}
                />

                {images && (
                    <View style={styles.paginationContainer}>
                        {images.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlePageChange(index)}
                                style={[styles.paginationDot, { backgroundColor: index === currentIndex ? 'blue' : 'gray' }]}
                            />
                        ))}
                    </View>
                )}
                {images ? (
                    <ImageView
                        images={images}
                        key={"image_url"}
                        imageIndex={currentIndex}
                        visible={visible}
                        presentationStyle={"pageSheet"}
                        onImageIndexChange={() => setCurrentIndex(currentIndex)}

                        // HeaderComponent={MyHeaderComponent}
                        FooterComponent={({ imageIndex }) => (
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ color: "grey", padding: 10, fontSize: 25, backgroundColor: "black", borderRadius: 10 }}>
                                    {imageIndex + 1} / {images.length}
                                </Text>
                            </View>
                        )}
                        onRequestClose={() => setIsVisible(false)}
                    />

                ) : null}

                {/* product detail here */}
                {/* check for null */}
                {product ? (
                    <>
                        <View style={styles.productContainer}>
                            <Text style={styles.title}>{product.product_item.product_name}:: {product.product_item.product_item_id}</Text>

                            <Text style={styles.description}>{product.product_item.product_description}</Text>
                            <Text style={styles.detailText}>{product.product_item.brand_name}</Text>
                            <Text style={styles.detailText}>{product.product_item.category_name}</Text>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Price:</Text>
                                <Text style={styles.cutPrice}>{product.product_item.price}</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Discounted Price:</Text>
                                <Text style={styles.price}>{product.product_item.discounted_price}</Text>
                            </View>

                            <Text style={styles.detailText}>Discount Percent: {product.product_item.discount_percent}%</Text>
                            <Text style={styles.detailText}>Quantity in Stock: {product.product_item.qty_in_stock}</Text>
                            <Text style={styles.detailText}>Shop: {product.product_item.shop_name}</Text>
                        </View>
                    </>
                ) : (
                    <Text>Loading</Text>
                )}
                <View style={styles.container_action}>

                    <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            console.log("add to cart");
                            addToCart({product_item_id: product.product_item.product_item_id, quantity: quantity });
                        }}
                    >
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buyButton]}
                        onPress={() => {
                            console.log("quantity", quantity);
                            // *go to address select screen
                        }}
                    >
                        <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>
                </View>
                {variance && (
                    <>
                        <View style={{ padding: 10, marginTop: 10, borderRadius: 10, borderWidth: 1, borderColor: "grey", marginLeft: 5, marginRight: 5 }}>
                            <Text style={styles.title}>Variation</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 10 }}>
                                {variance.map((item) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            productFetch({ productItemId: item.product_item_id });
                                            console.log("New Product screen");
                                            handlePageChange(0)
                                            // navigation.navigate('NewProductDetail', {
                                            //     productItemId: `${item.product_item_id}`,
                                            // });
                                        }
                                        }
                                        style={{ padding: 10 }} key={item.product_item_id}>
                                        <View key={item.product_item_id}>
                                            <Image style={{ borderRadius: 10 }} source={{ uri: item.image_url }} width={100} height={100} />
                                            <Text style={styles.rest}>Rupees: {item.price}</Text>
                                            {/* <Text style={styles.rest}>Rupees: {item.discounted_price}</Text>
                                    <Text style={styles.rest}>Discount: {item.discount_percent}%</Text>
                                <Text style={styles.rest}>quamtity: {item.qty_in_stock}</Text> */}
                                        </View>
                                    </TouchableOpacity>
                                ))
                                }
                            </View>
                        </View>
                    </>
                )}

                {/* specification her */}
                <View style={{ padding: 10, marginTop: 10, borderRadius: 10, borderWidth: 1, borderColor: "grey", marginLeft: 5, marginRight: 5 }}>
                    <Text style={styles.title}>Specification</Text>

                    {product
                        ? (
                            <>
                                {product.product_item.specifications && product.product_item.specifications.length > 0
                                    ? (
                                        <>
                                            {product.product_item.specifications.map((item) => (
                                                <Text key={item.name} style={styles.rest}>{item.name} : {item.value}</Text>
                                            ))}
                                        </>
                                    )
                                    : <Text>No specification</Text>
                                }
                            </>
                        )
                        : <Text>loading</Text>
                    }
                </View>
                <Button
                    title='add item'
                    onPress={handleAddItemCart}
                />
                <Button
                    title="get all cart"
                    onPress={handleGetAllCart}
                />
                <Button
                    title="drop some value from cart"
                    onPress={removeSomeFromCart}
                />


            </ScrollView>

        </>

    );

}

export default NewProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // textAlign: 'center',
        // marginVertical: 20,
        marginBottom: 5,

    },
    description: {
        fontSize: 16,
        marginBottom: 5,
        // textAlign: 'center',
        // marginBottom: 20,

    },
    rest: {
        fontSize: 14,
        marginBottom: 5,
        color: '#555',
        // textAlign: 'center',
        // marginBottom: 20,

    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    buyButton: {
        backgroundColor: '#2ecc71',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    container_action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginLeft: 5,
    },
    productContainer: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        margin: 10,
        backgroundColor: '#fff', // Add a background color
    },
    detailText: {
        fontSize: 14,
        marginBottom: 8,
        color: '#555',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 5,
    },
    price: {
        fontSize: 14,
        color: '#008080', // Customize the color
    },
    cutPrice: {
        fontSize: 14,
        color: '#e74c3c', // Customize the color
        textDecorationLine: "line-through"
    },
});
