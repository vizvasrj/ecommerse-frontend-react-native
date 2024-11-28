import React, { useState } from 'react';

import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Context as ProductAddContext } from '../../../context/productAddContext';
import { Context as MerchantProductContext } from '../../../context/merchant/merchantProductContext';
import Icon from 'react-native-vector-icons/Entypo';
import { secondaryColor } from '../../../theme/color';
import { FAB } from 'react-native-paper'

const IncompleteProducts = ({ navigation }) => {
    const { state, listIncompleteProducts, changeHeaderNameFn } = React.useContext(MerchantProductContext);
    const [usedOffset, setUsedOffset] = useState([]);
    const [isEndReached, setIsEndReached] = useState(false);

    React.useEffect(() => {
        if (usedOffset.includes(state.incompleteProductItemsOffset)) {
            return
        }
        setUsedOffset([...usedOffset, state.incompleteProductItemsOffset]);
        listIncompleteProducts(state.incompleteProductItemsOffset);
    }, [])

    const handleEndReached = () => {
        if (!isEndReached) {
            console.log("inside handleEndReached")
            console.log("next_offset", state.incompleteProductItemsOffset)
            if (state.incompleteProductItemsOffset !== null) {
                if (usedOffset.includes(state.incompleteProductItemsOffset)) {
                    // console.log("offset is already used");
                    return;
                }
                // console.log("inside if");
                setUsedOffset([...usedOffset, state.incompleteProductItemsOffset]); // Add the used offset to the usedOffset state

                listIncompleteProducts(state.incompleteProductItemsOffset);
            } else {
                setIsEndReached(true);
            }

        }
    }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        listIncompleteProducts(0, true);
        setUsedOffset([0]);
        setRefreshing(false);
    }, []);


    return (
        <>
            <View style={{ flex: 1, padding: 10 }}>
                <FlatList
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    data={state.incompleteProductItems}
                    keyExtractor={(item) => item.product_item_id + "-" + item.id}
                    onEndReached={handleEndReached}
                    renderItem={({ item }) => {
                        const date = new Date(item.created_at);
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.sku) {
                                        changeHeaderNameFn(`Image upload ${item.name} ${item.sku}`);
                                        navigation.navigate("NewImageUploader", { productItemId: item.product_item_id, productId: item.id })
                                    } else {
                                        // navigation.navigate("ProductItemDetail", { productItemId: item.id })
                                        changeHeaderNameFn(`${item.name}'s variants`);
                                        console.log("need to insert ptoduct items", item.id, item.category_id)

                                        navigation.navigate("NewAddProductItem", { productId: item.id, categoryId: item.category_id })
                                    }
                                }}
                            >
                                <View style={{ backgroundColor: secondaryColor, borderRadius: 5, marginBottom: 10 }}>
                                    <View style={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>

                                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                            {item.name}
                                        </Text>
                                        {item?.sku &&
                                            <Text>
                                                {item.sku}
                                            </Text>
                                        }
                                        <Text>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
                                    </View>


                                    <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>

                                        <View style={{ flexDirection: "row" }}>
                                            {item.sku ? <Icon name="check" size={20} color={"#1EBB55"} /> : <Icon name="squared-cross" size={20} />}
                                            <Text>Product item</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Icon name="squared-cross" size={20} />
                                            <Text>images</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>

                        )
                    }}

                />
            </View>

            <FAB
                style={{ position: 'absolute', margin: 16, right: 0, bottom: 140 }}
                small={true}
                icon="refresh"
                onPress={async () => {
                    console.log('Pressed');
                    setRefreshing(true);
                    await listIncompleteProducts(0, true);
                    setUsedOffset([0]);
                    setRefreshing(false);
                }}
            />

        </>
    )
}

export default IncompleteProducts;