import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Text } from '@rneui/base';
import productImageAPI from "../api/productImage";

const ThumbnailImage = ({ path, height, width , style}) => {
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await productImageAPI.get(`/get_thumbnail_url?path=${path}&w=${width}&h=${height}`);
                setImageUri(resp.data.result);

            } catch (error) {
                setImageUri("https://sdaletech.com/wp-content/uploads/2017/12/200x200-1.png");
                if (error.response) {
                    console.log("Error fetching data:", error.response.data);
                } else {
                    setImageUri("https://sdaletech.com/wp-content/uploads/2017/12/200x200-1.png")
                    // console.log("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }, [path, height, width]);

    return (
        <>
            {imageUri ? (
                <>
                <Image
                    source={{ uri: imageUri }}
                    style={style}
                    width={width}
                    height={height}
                />
                </>

            ): (
                <Text>no image</Text>
            )}
        </>
    );
};

export default ThumbnailImage;
