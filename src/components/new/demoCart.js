import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


const ProductItem = React.memo(
    ({ item, navigation }) => {
        // Component logic here
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("NewOwnerProduct", {
                        screen: "NewProductDetail",
                        params: { productItemId: `${item.product_item_id}` },
                    });
                }}
            >
                <View style={styles.productItem}>
                    {item.product_item_images ? (
                        <ThumbnailImage path={item.product_item_images} width={200} height={200} style={styles.productImage} />
                    ) : (
                        <Image
                            source={{ uri: 'https://apanashop-some-bucket.s3.ap-south-1.amazonaws.com/media/e/0/d783fb23d84ee53c101db719d836fb.jpg' }}
                            style={styles.productImage}
                        />
                    )}

                    <View style={styles.productDetails}>
                        <Text style={{ color: 'slategray' }}>{item.product_item_id}</Text>
                        <Text style={styles.productName}>{item.product_item_name}</Text>
                        {item.discounted_price !== 0 ? (
                            <>
                                <Text style={styles.productDisountedPrice}>{item.discounted_price}</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.productPrice}>{item.original_price}</Text>
                                <Text style={styles.productDisountedPrice}>{item.discounted_price}</Text>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    (prevProps, nextProps) => {
        // Custom comparison logic
        return prevProps.item.product_item_id !== nextProps.item.product_item_id;
    }
);

export default ProductItem;

const styles = StyleSheet.create({
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
        textDecorationLine: 'line-through',
    },
    productDisountedPrice: {
        fontSize: 14,
        color: 'green',
    },
    productStock: {
        fontSize: 14,
    },
});
