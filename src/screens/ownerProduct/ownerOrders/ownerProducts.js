import React, { useState } from 'react';

import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Context as MerchantProductContext } from '../../../context/merchant/merchantProductContext';
import Icon from 'react-native-vector-icons/Entypo';
import ThumbnailImage from '../../../components/thumbnailImage';
import { secondaryColor } from '../../../theme/color';
const MerchantProducts = ({ navigation }) => {
    const { state, getProductListFn } = React.useContext(MerchantProductContext);


    React.useEffect(() => {
        if (usedOffset.includes(state.nextOffset)) {
            return
        }
        setUsedOffset([...usedOffset, state.nextOffset]);
        getProductListFn(state.nextOffset);

    }, [])
    const [usedOffset, setUsedOffset] = useState([]);
    const [isEndReached, setIsEndReached] = useState(false);
    const handleEndReached = () => {
        if (!isEndReached) {
            if (state.nextOffset !== null) {
                if (usedOffset.includes(state.nextOffset)) {
                    return;
                }
                setUsedOffset([...usedOffset, state.nextOffset]); // Add the used offset to the usedOffset state
                getProductListFn(state.nextOffset);
            } else {
                setIsEndReached(true);
            }
        }
    }
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={state.productList}
                keyExtractor={(item) => item.product_item_id}
                onEndReached={handleEndReached}
                renderItem={({ item }) => {
                    const date = new Date(item.created_at);
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (item.sku) {
                                    // navigation.navigate("NewImageUploader", { productItemId: item.product_item_id , productId: item.id})
                                    navigation.navigate("NewAddProductItem", { productItemId: item.product_item_id , productId: item.id})
                                } else {
                                    // navigation.navigate("ProductItemDetail", { productItemId: item.id })
                                    console.log("need to insert ptoduct items")
                                }
                            }}
                        >

                            <View style={{ backgroundColor: secondaryColor, borderRadius: 5, marginBottom: 10, flexDirection: "row", padding: 2 }}>
                                <View>
                                    <ThumbnailImage
                                        path={item.image_url}
                                        width={100}
                                        height={100}
                                    />
                                </View>
                                <View>
                                    <View style={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>

                                        <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 100 }}>
                                            {item.name}
                                        </Text>
                                        {item?.sku &&
                                            <Text style={{marginRight: 100}}>
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
                            </View>

                        </TouchableOpacity>

                    )
                }}

            />
        </View>
    )
}

export default MerchantProducts;