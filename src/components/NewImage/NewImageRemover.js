import React from "react";
import productImageApi from "../../api/productImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NewRemoveImageAxios = async ({ productItemId, ImageOrder }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log(token, "NewImageRemover.js")
        const res = await productImageApi.delete(`/product_item_image?product_item_id=${productItemId}&display_order=${ImageOrder}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("res::", res.data);
    } catch (err) {
        console.log("err::", err);
    }
}

const NewImageRemover = async (setFunc, productItemId, ImageOrder) => {
    console.log("hello image remover", productItemId, "<< product Item id")
    await NewRemoveImageAxios({ productItemId, ImageOrder })
    setFunc(null)
}

export default NewImageRemover;