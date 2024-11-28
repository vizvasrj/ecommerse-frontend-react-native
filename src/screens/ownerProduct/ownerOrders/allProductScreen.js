import React, { useContext, useState, useEffect } from 'react';

import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Context as MerchantProductContext } from '../../../context/merchant/merchantProductContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { secondaryColor } from '../../../theme/color';
const AllProductScreen = ({ navigation }) => {
    const [search, setSearch] = useState(''); // Add this line
    const { state, getAllProductsFn, changeHeaderNameFn } = useContext(MerchantProductContext)

    const [usedOffset, setUsedOffset] = useState([]);
    const [isEndReached, setIsEndReached] = useState(false);

    React.useEffect(() => {
        if (usedOffset.includes(state.productsOffset)) {
            return
        }
        setUsedOffset([...usedOffset, state.productsOffset]);
        getAllProductsFn(state.productsOffset, search, false, false);
    }, [])

    const handleEndReached = () => {
        if (!isEndReached) {
            // console.log("inside handleEndReached")
            // console.log("next_offset", state.productsOffset)
            if (state.productsOffset !== null) {
                if (usedOffset.includes(state.productsOffset)) {
                    // console.log("offset is already used");
                    return;
                }
                // console.log("inside if");
                setUsedOffset([...usedOffset, state.productsOffset]); // Add the used offset to the usedOffset state

                getAllProductsFn(state.productsOffset, search, true, false);
            } else {
                setIsEndReached(true);
            }

        }
    }

    // const [refreshing, setRefreshing] = useState(false);
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);

    //     getAllProductsFn(0, true);
    //     setUsedOffset([0]);
    //     setRefreshing(false);
    // }, []);


    return (
        <>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    placeholder="Search here by product name"
                />
                <TouchableOpacity style={styles.searchButton}
                    onPress={() => {
                        setSearch("");
                        console.log(usedOffset, "used offset")
                        console.log("state.productsOffset", state.productsOffset)
                        // getAllProductsFn(0, nameSearch);
                        // setUsedOffset([0]);
                    }}
                >
                    <Icon name="trash" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton}
                    onPress={() => {
                        getAllProductsFn(0, search, false, true);
                        setUsedOffset([0]);
                        setIsEndReached(false);
                    }}
                >
                    <Icon name="search" size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={state.products}
                    keyExtractor={(item) => item.id}
                    onEndReached={handleEndReached}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        changeHeaderNameFn(item.name)
                                        navigation.navigate("ProductVariants", { productItemId: item.product_item_id, productId: item.id })
                                    }}
                                >
                                    <View style={{ backgroundColor: secondaryColor, borderRadius: 5, marginBottom: 10, flexDirection: "row", padding: 2 }}>
                                        <View>
                                            <Text style={styles.title}>{item.name}</Text>
                                            <Text style={styles.text}>Category: {item.category_name}</Text>
                                            <Text style={styles.text}>Brand: {item.brand_name}</Text>
                                            <Text style={styles.text}>Product item count: {item.product_item_count}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
            {
                state.errorMessage !== "" ? (
                    <View style={{padding: 10}}>
                        <Text style={{color: "red"}}>
                            {state.errorMessage}
                        </Text>
                    </View>
                )

                    : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: fontColor,
    },
    text: {
        fontSize: 14,
    },
    searchContainer: {
        backgroundColor: "white",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: 'gray',
        // borderWidth: 1
    },
    searchInput: {
        flex: 1,
        height: 50,
    },
    searchButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },

})

export default AllProductScreen;