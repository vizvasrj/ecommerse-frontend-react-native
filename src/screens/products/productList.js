import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Context as productAddContext } from '../../context/productAddContext';
import { Button, Text } from '@rneui/base';
import { Animated } from 'react-native';
import ThumbnailImage from '../../components/thumbnailImage';
import RadioButton from '../../components/RadioButton';
const ProductListScreen = ({ navigation, slideHeaderUp, slideAnimation, searchQuery, setSearchQuery }) => {
    const { state, productList } = useContext(productAddContext);
    // const [loading, setLoading] = useState(false);
    // const [totalItems, setTotalItems] = useState(0);

    const products = state.products;
    const next_offset = state.nextOffset;
    const previous_offset = state.previousOffset;
    {/* crate sort button */ }
    const [activeSort, setActiveSort] = useState(null);
    const [filterName, setFilterName] = useState(null);
    const [filterSortHighToLow, setFilterSortHighToLow] = useState(false);
    const [filterSortLowToHigh, setFilterSortLowToHigh] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);

    const options = ['price_high_to_low', 'price_low_to_high'];

    const offset = 0;

    useEffect(() => {
        productList({ offset: offset, filterChanged: true });
        console.log("changed navigation?")
    }, [navigation])

    const handleEndReached = () => {
        console.log("inside handleEndReached")
        console.log("next_offset", next_offset)
        if (next_offset !== null) {
            console.log("inside if");
            productList({ offset: next_offset, name: searchQuery, priceSort: selectedOption, filterChanged: false });
        }
    }

    const filterProducts = ({ priceSort }) => {
        console.log("inside filterProducts");

        productList({ offset: offset, filterChanged: true, priceSort: priceSort });
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
            <Animated.View
                style={{
                    height: 200, // The height of the header when expanded
                    transform: [{ translateY: slideAnimation }],
                    backgroundColor: 'lightgray', // Customize the background color
                    position: 'absolute',
                    top: -200,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <Text>Header Content</Text> */}

                {/* <TouchableOpacity onPress={() => {
                    filterProducts({ priceSort: 'price_high_to_low' });
                    setActiveSort('highToLow');
                }}>
                    <Text h4 style={{ color: activeSort === 'highToLow' ? "green" : "#445566" }}>
                        Sort by Price High to low
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    filterProducts({ priceSort: 'price_low_to_high' });
                    setActiveSort('lowToHigh');
                }}>
                    <Text h4 style={{ color: activeSort === 'lowToHigh' ? "green" : "#445566" }}>
                        Sort by Price low to High
                    </Text>
                </TouchableOpacity> */}
                <View style={{borderWidth: 2, borderRadius: 10, padding: 5, borderColor: "grey"}}>
                    <Text>Sort By Price</Text>
                    {options.map((option) => (
                        <RadioButton
                            key={option}
                            label={option}
                            selected={selectedOption === option}
                            onSelect={() => {
                                // if same option is selected then deselect it
                                if (selectedOption === option) {
                                    setSelectedOption(null);
                                    filterProducts({ priceSort: null });
                                    return;
                                }

                                setSelectedOption(option);
                            }}
                        />
                    ))}
                </View>

                <Button
                    title="Search and Close"
                    onPress={() => {
                        // Alert.alert(`${searchQuery}::${selectedOption}`)
                        let search_query = searchQuery;
                        if (searchQuery === "") {
                            search_query = null;
                        }
                        // Alert.alert(`${search_query}::${selectedOption}`)
                        productList({
                            offset: offset, 
                            filterChanged: true, 
                            priceSort: selectedOption, 
                            name: search_query, 
                        });
                        setSearchQuery(search_query);
                        slideHeaderUp();
                    }}
                />
            </Animated.View>
            <FlatList
                data={products}
                renderItem={({ item }) => {

                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => {

                                    navigation.navigate('ProductDetail', { productId: `${item.id}` })
                                }}
                            >
                                <View style={styles.productItem}>
                                    {item.image_url
                                        ? (
                                            <ThumbnailImage path={item.image_url} width={200} height={200} style={styles.productImage} />
                                        )
                                        : <Image source={{ uri: "https://apanashop-some-bucket.s3.ap-south-1.amazonaws.com/media/e/0/d783fb23d84ee53c101db719d836fb.jpg" }} style={styles.productImage} />}

                                    <View style={styles.productDetails}>
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.productPrice}>{item.price}</Text>
                                        <Text style={styles.productStock}>
                                            In Stock: {item.total_stock} {item.total_stock === 1 ? 'item' : 'items'}
                                        </Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </>
                    )
                }}
                keyExtractor={item => item.id}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0}
                ListFooterComponent={renderLoader}


            />

        </>
    )
}

export default ProductListScreen;

styles = StyleSheet.create({
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
        color: 'green',
    },
    productStock: {
        fontSize: 14,
    },
})