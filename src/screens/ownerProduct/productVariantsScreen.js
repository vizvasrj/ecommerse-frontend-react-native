import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import ThumbnailImage from '../../components/thumbnailImage';
import { Context as MerchantProductContext } from '../../context/merchant/merchantProductContext';
import { backgroundColor, primaryColor, secondaryColor } from '../../theme/color';
import Icon from 'react-native-vector-icons/Entypo';
import inr from '../../symbols/inr';

const ProductVariantsScreen = ({ navigation, route }) => {
    const [productDetail, setProductDetail] = React.useState([]);
    const [requestStarted, SetRequestStarted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    // const productId = 340;
    const productId = route.params?.productId;
    console.log(route.params, "route.params")
    // console.log(route.params, "route.params")
    // if (productId === undefined || productId === null || productId === "") {
    //     productId = 340;
    // }

    if (!productId) {
        return <Text>need route.params.productId</Text>
    }

    const { state, getProductDetailFn } = React.useContext(MerchantProductContext);

    React.useEffect(() => {

        getProductDetailFn(productId, setProductDetail, SetRequestStarted);
    }, []);

    const imagePressHandler = (product_item_id) => {
        navigation.navigate("NewImageUploader", { productItemId: product_item_id, productId: productId })
    }

    if (requestStarted) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );

    }


    return (
        <View style={styles.container}>
            {productDetail.length !== 0 && (
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.productName}>{state.productDetail[0]?.name}</Text>
                        <Text style={styles.title}>'s Variants</Text>
                    </View>
                    <FlatList
                        data={productDetail}
                        keyExtractor={(item) => item.product_item_id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={styles.touchable}
                                >
                                    {item.image_url === null || item.image_url === "" ? <Text onPress={imagePressHandler.bind(this, item.product_item_id)} style={styles.noImageText}>No Image add image here</Text> : <ThumbnailImage
                                        path={item.image_url}
                                        width={100}
                                        height={100}
                                    />}

                                    <View style={styles.specContainer}>
                                        <Text style={styles.specText}>
                                            price: {inr}{item.original_price}
                                        </Text>
                                        <Text style={styles.specText}>
                                            product item id: {item.product_item_id}
                                        </Text>
                                        {item.specification?.map((spec, index) => (
                                            <Text key={index} style={styles.specText}>
                                                {spec.variation_name}: {spec.variation_option_value}
                                            </Text>
                                        ))}
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.editDeleteBlock}>
                                    <TouchableOpacity style={styles.functionButton}
                                        onPress={() => {

                                        }}

                                    >
                                        <Icon name="menu" size={20} color="white" />

                                        <Text style={styles.buttonText}>Specs</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.functionButton}
                                        onPress={imagePressHandler.bind(this, item.product_item_id)}
                                    >
                                        <Icon name="image" size={20} color="white" />

                                        <Text style={styles.buttonText}>Image</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.functionButton, { backgroundColor: "red" }]}
                                        onPress={() => {
                                            const specText = item.specification.map((spec, index) => {
                                                return `${spec.variation_name}: ${spec.variation_option_value}`;
                                            }).join(", ");
                                            Alert.alert("Delete", `Edit this item \n${specText}`, [
                                                {
                                                    text: "Delete",
                                                    onPress: () => {
                                                        // navigation.navigate("EditProductVariant", { productId: productId, productItemId: item.product_item_id });
                                                        console.log("Delete this item");
                                                    }
                                                },
                                                {
                                                    text: "Cancel",
                                                    onPress: () => { console.log("concel") },
                                                    style: "cancel"
                                                }
                                            ]);
                                        }}
                                    >
                                        <Icon name="trash" size={20} color="white" />
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </>

            )}
            <TouchableOpacity style={styles.addVariantButton}
                onPress={() => {
                    console.log("product id,", productId);
                }}
            >
                <Icon name="plus" size={50} color="white" />
                <Text style={styles.addText}>Add more variants of this product {state.productDetail[0]?.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    titleContainer: {
        flexDirection: "row",
        // marginBottom: 20,
    },
    title: {
        fontSize: 20,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemContainer: {
        marginBottom: 10,
        backgroundColor: backgroundColor,
        borderRadius: 10
    },
    touchable: {
        flexDirection: "row",
        backgroundColor: secondaryColor,
        padding: 10,
        borderRadius: 10,
    },
    specContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    specText: {
        fontSize: 14,
    },
    addVariantButton: {
        backgroundColor: primaryColor,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    addText: {
        marginRight: 50,
        fontSize: 20,
    },
    editDeleteBlock: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    editDeleteBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        // backgroundColor: '#f8f8f8',
    },
    functionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: '#007aff',
        borderRadius: 5,
        flexDirection: "row",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    noImageText: {
        width: 100,
        height: 100,
    }
});

export default ProductVariantsScreen;