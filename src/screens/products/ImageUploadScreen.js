import React from "react";

import MyImagePicker from "../../components/imagePicker";
import { Button } from "@rneui/base";
import { Alert } from "react-native";

const ImageUploaderScreen = ({route, navigation}) => {
    const productId = route.params.productId;


    return (
        <>
            <MyImagePicker productId={productId} />
            <Button 
                title={"Next"}
                onPress={() => {
                    // Alert.alert(`Next, prodct detail ${productId}`);
                    navigation.navigate("ProductDetail", {productId: productId})
                }}
            />
        </>
    )
}

export default ImageUploaderScreen;