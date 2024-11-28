import { Platform } from 'react-native';
import productImageAPI from "../../api/productImage";

const UploadProductItemImage = async ({ image, ProductId, ImageOrder, token }) => {
    return new Promise(async (resolve, reject) => {
        const data = new FormData();
        data.append('file', {
            name: "someImage.jpg",
            type: 'image/jpeg',
            uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        });
        data.append('product_item_id', ProductId)
        data.append('image_order', ImageOrder)
        // var url = "http://192.168.1.5:8003/upload_product_image";

        try {
            const response = await productImageAPI.post("/product_item_image", data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Correct header name
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            console.log("res::1", response.data);
            resolve(response.data);
        } catch (err) {
            console.log("err:: from imageUploader.js err.response,data", err.response.data, err.response.status);
            reject(err);
        }
    });
}

export default UploadProductItemImage;


