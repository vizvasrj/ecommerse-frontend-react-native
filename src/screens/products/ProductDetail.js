import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Button, Text, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ImageView from "react-native-image-viewing";
import ProductDescription from '../../components/productDescription';
import { Context as ProductContext } from '../../context/productAddContext';


const ProductDetailScreen = ({route, navigation}) => {
    const productId = route.params.productId;

    
    const [visible, setIsVisible] = useState(false);
    
    const {state: productState, getProductFromID, getProductImages} = useContext(ProductContext);
    const images = productState.images;
    const saved_product = productState.saved_product;
    
    useEffect(() => {
        getProductFromID(productId);
        getProductImages(productId);

    }, [navigation]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();

    const handlePageChange = (newIndex) => {
        setCurrentIndex(newIndex);
        flatListRef.current.scrollToIndex({ index: newIndex });
    };

    const handleImagePress = (index) => {
        console.log(`Pressed image at index: ${index}`);
        setIsVisible(true);

    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleImagePress(index)}>
            <Image source={{ uri: item.uri }} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
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
            {/* <View style={styles.paginationContainer}>
                {images.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePageChange(index)}
                        style={[styles.paginationDot, { backgroundColor: index === currentIndex ? 'blue' : 'gray' }]}
                    />
                ))}
            </View> */}
            {images ? (
                <ImageView
                    images={images}
                    imageIndex={currentIndex}
                    visible={visible}
                    presentationStyle={"pageSheet"}
                    onImageIndexChange={() => setCurrentIndex(currentIndex)}
    
                    // HeaderComponent={MyHeaderComponent}
                    FooterComponent={({ imageIndex }) => (
                        <View style={{alignItems: "center"}}>
                            <Text style={{color: "grey", padding: 10,fontSize: 25, backgroundColor: "black", borderRadius: 10}}>
                                {imageIndex + 1} / {images.length}
                            </Text>
                        </View>
                    )}
                    onRequestClose={() => setIsVisible(false)}
                />

            ): null }
            
            {saved_product && <ProductDescription product={saved_product} />}
            <Button
                title={productId}
                onPress={() => {
                    getProductFromID(productId);
                }}
            />
            <Button 
                title='test?'
                onPress={() => {
                console.log("Add to cart product id ", saved_product);
                
            }}/>
            <Button title="get images" onPress={() => getProductImages(productId)}/>
            <Button title="console.log(images)" onPress={() => console.log(images)}/>
        </ScrollView>
    );
};

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
        textAlign: 'center',
        // marginVertical: 20,
    }
});

export default ProductDetailScreen;
