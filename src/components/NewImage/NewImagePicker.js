import React, { useContext, useState } from 'react';
import { Text, Dimensions, FlatList, View, TouchableOpacity, Image, PermissionsAndroid, Button } from 'react-native';
import { Context as AuthContext } from '../../context/authContext';
import UploadProductItemImage from './ImageUploader';
import NewImageRemover from './NewImageRemover';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const MyNewImagePicker = ({ productItemId }) => {


    const DeviceWidth = Dimensions.get('window').width;
    const { state } = useContext(AuthContext);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);
    const [image7, setImage7] = useState(null);
    const [image8, setImage8] = useState(null);
    const [image9, setImage9] = useState(null);

    const ImageDataForLoader = [
        { image: image1, setImage: setImage1, ImageOrder: 1 },
        { image: image2, setImage: setImage2, ImageOrder: 2 },
        { image: image3, setImage: setImage3, ImageOrder: 3 },
        { image: image4, setImage: setImage4, ImageOrder: 4 },
        { image: image5, setImage: setImage5, ImageOrder: 5 },
        { image: image6, setImage: setImage6, ImageOrder: 6 },
        { image: image7, setImage: setImage7, ImageOrder: 7 },
        { image: image8, setImage: setImage8, ImageOrder: 8 },
        { image: image9, setImage: setImage9, ImageOrder: 9 },
    ]

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
                const res = await UploadProductItemImage({ image: response.assets[0].uri, ProductId, ImageOrder, token: state.token })
                console.log("res::2", res)
                // http://localhost:3001/display?w=200&h=200&path=965aa320-16d6-4bbe-97ed-40313ab088b6.jpg&op=thumbnail
                setFunc(res.result)
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
        <>
            <Button
                title='camera permission'
                onPress={requestCameraPermission}
            >

            </Button>
            <Text>MyImagePicker {productItemId}</Text>
            <View
                style={{ alignItems: "center" }}
            >

                <FlatList
                    data={ImageDataForLoader}
                    keyExtractor={(item) => item.ImageOrder}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                            }}>
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
                                                        NewImageRemover(item.setImage, productItemId, item.ImageOrder);
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
    )
}

export default MyNewImagePicker;
