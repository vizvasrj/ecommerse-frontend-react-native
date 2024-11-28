import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ThumbnailImage from "../thumbnailImage";
import { secondaryColor } from "../../theme/color";
const OrderItemDetails = ({ orderItem }) => {
  return (
    <View style={styles.grid}>
      <View style={{ width: 100, height: 100 }}>
        <ThumbnailImage width={100} height={100} path={orderItem?.image_url} style={styles.image} />
      </View>
      <View style={{ flexDirection: "column", marginLeft: 10, width: '70%' }}>
        <Text>Product Name: {orderItem.product_name}</Text>
        <Text>Quantity: {orderItem.quantity}</Text>
        <Text>Purchased Price: {orderItem.purchased_price}</Text>
        <Text>Shipping Method: {orderItem.shipping_method}</Text>
        <Text>Shop Name: {orderItem.shop_name}</Text>
        <Text>Order Status: {orderItem.order_status}</Text>
      </View>
      {/* <Text>Product Description: {orderItem.product_description}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: secondaryColor, // assuming secondaryColor is defined
    borderRadius: 5,
  },
  image: {
    resizeMode: "contain",
  },
});

export default OrderItemDetails;
