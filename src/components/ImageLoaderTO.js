import React from "react";

import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
// import { Image } from "@rneui/base";

const ImageLoaderTO = ({ImageRemover, SetImage, ImageUri, DeviceWidth, ImagePicker, ProductId, ImageOrder}) => {
    return (
        <TouchableOpacity
        style={{
            width: DeviceWidth * 0.2,
            height: DeviceWidth * 0.2,
            marginBottom: 10,
            marginLeft: 10,
            backgroundColor: 'powderblue',
        }}
        onPress={() => {
            ImagePicker(SetImage, ProductId ,ImageOrder);
        }}>
        {ImageUri ? (
            <>
                <Image
                    style={{ width: DeviceWidth * 0.2, height: DeviceWidth * 0.2 }}
                    source={{ uri: ImageUri }}
                />
                <TouchableOpacity 
                    style={{marginTop: -20, backgroundColor: "#FF000099", padding: 1, alignItems: "center"}}
                    onPress={() => {
                        ImageRemover(SetImage, ProductId, ImageOrder);
                    }}
                >
                    <Text style={{color: "white", fontWeight: 700}}>Remove</Text>
                </TouchableOpacity>
            </>
        ) : (
            <Text>no image</Text>
        )}
    </TouchableOpacity>
    )
}

export default ImageLoaderTO;