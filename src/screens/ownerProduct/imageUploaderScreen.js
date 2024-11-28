
import React, { useContext, useState, useEffect } from "react";
import { Text, Dimensions, FlatList, View, TouchableOpacity, Image, PermissionsAndroid, Button } from "react-native";
// import { Button } from "@rneui/base";
// import MyNewImagePicker from "../../components/NewImage/NewImagePicker";
import MerchantProductImagePicker from "../../components/merchant/merchantProductImagePicker";
// import productApi from '../../api/product';
// import { Context as MerchantProductContext } from '../../context/merchant/merchantProductContext';
import productApi from '../../api/product';
import { Context as MerchantProductContext } from "../../context/merchant/merchantProductContext";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Context as AuthContext } from "../../context/authContext";

const ImageUploaderScreen = ({ navigation, route }) => {
    const productItemId = route.params.productItemId;
    const productId = route.params.productId;
    const [error, setError] = useState(null);

    const handleNextButtonPress = () => {
        const some = images.some(image => Boolean(image));
        console.log("some, some product id ", some, productId);
        if (some) {

            navigation.reset({
                index: 2,
                routes: [
                    { name: "ProductMenu" },
                    { name: "MerchantProducts" },
                    { name: "ProductVariants", params: { productId: productId } }
                ],
            });
        }
        else {
            setError("please add at least an image");
        }
    }

    const DeviceWidth = Dimensions.get('window').width;
    const { state } = useContext(AuthContext);
    const { state: MerchantProductState, uploadProductItemImage, removeProductItemImage } = useContext(MerchantProductContext);


    const [images, setImages] = useState(Array(9).fill(null));

    useEffect(() => {
        const fetchImages = async () => {
            try {
                console.log("productItemId::", productItemId)
                const response = await productApi.get(`/v2/user/merchant/product_image/${productItemId}`);
                console.log("response::", response.data.result.images)
                if (!response.data.result.images) {
                    return;
                }
                const fetchedImages = response.data.result.images;
                const newImages = [...images];
                fetchedImages.forEach(image => {
                    newImages[image.display_order - 1] = image.uri;
                });
                setImages(newImages);
            } catch (err) {
                console.error(err);
            }
        };

        fetchImages();
    }, []);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to your storage to update the profile picture.",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const ImagePicker = async (setFunc, ProductId, ImageOrder) => {
        console.log("hello image ppicer")
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;



        let options = {
            storageOptions: {
                path: 'image',
                selectionLimit: 5,
                includeBase64: true,
            },
        };
        const l = launchImageLibrary(options, async (response) => {
            console.log(response, "from Launch image");
            try {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    return;
                }
                console.log("Uploader phase")
                const res = await uploadProductItemImage({ image: response.assets[0].uri, ProductId, ImageOrder, token: state.token })
                console.log("res::2", res)
                // http://localhost:3001/display?w=200&h=200&path=965aa320-16d6-4bbe-97ed-40313ab088b6.jpg&op=thumbnail
                // setFunc(res.result)
                const newImages = [...images];
                newImages[ImageOrder - 1] = res.result;
                setImages(newImages);

            } catch (err) {
                console.log("err::", err)
                setError("error uploading Image")

            }
            // setFunc(response.assets[0].uri);
        });
        l.finally(() => {
            console.log("finally")
        })

    };



    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* <Text>ImageUploaderScreen {productItemId}</Text> */}
                {/* <MerchantProductImagePicker productItemId={productItemId} /> */}
                <>
                    {/* <Button
                        title='camera permission'
                        onPress={requestCameraPermission}
                    >

                    </Button> */}
                    {/* <Text>MyImagePicker {productItemId}</Text> */}
                    {/* <Button
                        title="test images print"
                        onPress={() => {
                            images.map((image) => {
                                console.log("image::", image);
                            });

                        }}
                    /> */}

                    <View
                        style={{ alignItems: "center", marginTop: 50 }}
                    >

                        <FlatList
                            data={images.map((image, index) => ({
                                image, setImage: (newImage) => {
                                    const newImages = [...images];
                                    newImages[index] = newImage;
                                    setImages(newImages);
                                }, ImageOrder: index + 1
                            }))}
                            keyExtractor={(item) => item.ImageOrder}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{}}>
                                        <TouchableOpacity
                                            style={{
                                                width: DeviceWidth * 0.2,
                                                height: DeviceWidth * 0.2,
                                                marginBottom: 10,
                                                marginLeft: 10,
                                                backgroundColor: 'powderblue',
                                            }}
                                            onPress={() => ImagePicker(item.setImage, productItemId, item.ImageOrder)}
                                        >
                                            {
                                                item.image ?
                                                    <>
                                                        <Image
                                                            style={{
                                                                height: DeviceWidth * 0.2,
                                                                width: DeviceWidth * 0.2,
                                                            }}
                                                            source={{
                                                                uri: item.image,
                                                            }}
                                                        />
                                                        <TouchableOpacity
                                                            style={{ marginTop: -20, backgroundColor: "#FF000099", padding: 1, alignItems: "center" }}
                                                            onPress={() => {
                                                                removeProductItemImage({ setFunc: item.setImage, productItemId: productItemId, ImageOrder: item.ImageOrder });
                                                            }}
                                                        >
                                                            <Text style={{ color: "white", fontWeight: 700 }}>Remove</Text>
                                                        </TouchableOpacity>
                                                    </>
                                                    :
                                                    <Text>No image</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                            numColumns={3}
                        />

                    </View>

                </>
                {error &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
                    </View>

                }

            </View>
            <View style={{ padding: 10, justifyContent: "flex-end", position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <Button title="Next" onPress={handleNextButtonPress} />
            </View>

        </View>
    )
}

export default ImageUploaderScreen;

