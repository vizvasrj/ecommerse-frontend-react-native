import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDescription = ({ product }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productShopName}>{`Shop Id: ${product.shop_id}`}</Text>
      <Text style={styles.productQuantity}>{`Quantity: ${product.total_stock} ${product.price_unit}`}</Text>
      <Text style={styles.productPrice}>{`Price: $${product.price}`}</Text>
      <Text style={styles.productRating}>{`Rating: ${product.rating}`}</Text>
      <Text style={styles.productStockAvailability}>{`Stock Availability: ${product.stockAvailability}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    marginTop: 8,
  },
  productShopName: {
    fontSize: 16,
    marginTop: 8,
  },
  productQuantity: {
    fontSize: 16,
    marginTop: 8,
  },
  productPrice: {
    fontSize: 18,
    marginTop: 8,
  },
  productRating: {
    fontSize: 16,
    marginTop: 8,
  },
  productStockAvailability: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default ProductDescription;
