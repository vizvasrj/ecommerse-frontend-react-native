import React, { useState, useEffect } from 'react';
import { Text, Image, FlatList, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import MyFilterModel from '../../components/new/myFilterModel';
import filter from '../../demo/filterDemo';
import productApi from '../../api/product';
import ThumbnailImage from '../../components/thumbnailImage';
import ProductItem from '../../components/new/ProductItem';

const NewProductListScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [usedOffset, setUsedOffset] = useState([]);
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productItemFetch(offset);
    }, [])


    const productItemFetch = async () => {
        try {
            const response = await productApi.get('/v2/product_item', { params: { offset: offset } });
            // console.log(response.data);
            // console.log(response.data.result);
            if (response.data.result === null) {
                // green color console.log
                console.log("response.data.result === null");
                setOffset(null);
                return;
            }
            setProducts(prevProducts => [...prevProducts, ...response.data.result]);
            setOffset(parseInt(response.data.next_offset));
            // console.log("offset", parseInt(response.data.next_offset));

        } catch (error) {
            console.log("from productItemFetch", error);
        }
    }

    const [isEndReached, setIsEndReached] = useState(false);

    const handleEndReached = () => {
        if (!isEndReached) {
            console.log("inside handleEndReached")
            console.log("next_offset", offset)
            if (offset !== null) {
                if (usedOffset.includes(offset)) {
                    console.log("offset is already used");
                    return;
                }
                console.log("inside if");
                productItemFetch({ offset: offset });
            } else {
                setIsEndReached(true);
            }

        }
    }

    const renderLoader = () => {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }



    return (
        <>
            <View style={{ flex: 1, padding: 10 }}>
                {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>New product detail screen {productId}</Text>
                </View> */}

                {/* <FlatList /> */}
                <View
                    
                    onPress={() => setModalVisible(true)}
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        borderRadius: 10,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ccc',
                        zIndex: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text>Open Model</Text>

                    </TouchableOpacity>
                </View>
                <MyFilterModel filter={filter} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                <FlatList
                    data={products}
                    renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                    keyExtractor={(item) => item.product_item_id}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0}
                    
                    
                />
                <TouchableOpacity onPress={() => console.log(products)}><Text>click to see product data</Text></TouchableOpacity>
            </View>
        </>
    )
}


export default NewProductListScreen;

const styles = StyleSheet.create({
    loader: {
        marginTop: 10,
        alignItems: 'center'
    },
    item: {
        // padding: 30,

        fontSize: 18,
        height: 144,
        borderBottomWidth: 1,
    },
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
        textDecorationLine: "line-through"
    },
    productDisountedPrice: {
        fontSize: 14,
        color: 'green',
    },
    productStock: {
        fontSize: 14,
    },
})