import React from "react";
import axios from "axios";
import productImageAPI from "../api/productImage";
const RemoveImageAxios = async ({ ProductId, ImageOrder }) => {
    try {

        const res = await productImageAPI.delete(`/product_image?product_id=${ProductId}&display_order=${ImageOrder}`,)
        console.log("res::", res.data);

    } catch (err) {
        console.log("err::", err);
    }
}

const ImageRemover = async (setFunc, ProductId, ImageOrder) => {
    console.log("hello image remover")
    await RemoveImageAxios({ ProductId, ImageOrder })
    setFunc(null)
}

export default ImageRemover;