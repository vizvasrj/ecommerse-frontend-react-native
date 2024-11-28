import React, { useEffect, Component, useState, useContext } from 'react';
import {
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    ActivityIndicator,
    Image as NativeImage,
    Platform,
    NativeModules,
    StyleSheet,
    Pressable,
    Modal,
    Dimensions,
    DeviceEventEmitter,
} from 'react-native';
import { Image } from '@rneui/themed';
import ResizeOrDelete from './floatingModel';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageLoaderTO from './ImageLoaderTO';
import axios from 'axios';
import { Context as AuthContext } from '../context/authContext';
import { Context as ProductContext } from '../context/productAddContext';
import UploadImage from './imageUploader';
import ImageRemover from './imageRemover';
import { useNavigation } from '@react-navigation/native';
// import ThumbnailImage from './thumbnailImage';
const MyImagePicker = ({productId}) => {
    const navigation = useNavigation();
    console.log("from MyimagePicker", productId);
    const DeviceWidth = Dimensions.get('window').width;
    const {state} = useContext(AuthContext);
    
    const {
        state: productState, setImage1, setImage2, 
        setImage3, setImage4, setImage5, setImage6, 
        setImage7, setImage8, setImage9} = useContext(ProductContext);

    const image1 = productState.image1;
    const image2 = productState.image2;
    const image3 = productState.image3;
    const image4 = productState.image4;
    const image5 = productState.image5;
    const image6 = productState.image6;
    const image7 = productState.image7;
    const image8 = productState.image8;
    const image9 = productState.image9;

    const [image10, setImage10] = useState(null);
    // useEffect(() => {
    //     console.log("from useEffect");
    //     const fetchData = async () => {
    //         try {
    //             console.log("from useEffect focus");
    //             // setItems(state.categories)
    //             const resp = await axios.get("http://192.168.1.5:8003/get_thumbnail_url?path=91706a73-3c4f-4298-a1eb-92bb99d66e44.jpg&w=100&h=100");
    //             console.log("resp:", resp.data);
    //             setImage10(resp.data.result);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    
    //     navigation.addListener("focus", fetchData);
    
    //     return () => {
    //         // Cleanup: Remove the listener when the component unmounts
    //         navigation.removeListener("focus", fetchData);
    //     };
    // }, [navigation]);
    const [error, setError] = useState('some error');
    const ImagePicker = async (setFunc, ProductId, ImageOrder) => {
        console.log("hello image ppicer")
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
                    const res = await UploadImage({image: response.assets[0].uri, ProductId, ImageOrder, token: state.token})
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

    // const ImageRemover = async (setFunc, ProductId, ImageOrder) => {
    //     console.log("hello image remover")
    //     await RemoveImageAxios({ProductId, ImageOrder})
    //     setFunc(null)
    // }

    return (
        <>  
            {error ? <Text style={{padding: 10}}>{error}</Text> : null}
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                }}>
                <View>
                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage1}
                        ImageUri={image1}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={1}
                    />

                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage2}
                        ImageUri={image2}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={4}
                    />

                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage3}
                        ImageUri={image3}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={7}
                    />
                </View>

                <View>
                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage4}
                        ImageUri={image4}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={2}
                    />

                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage5}
                        ImageUri={image5}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={5}
                    />

                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage6}
                        ImageUri={image6}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={8}
                    />

                </View>
                <View>
                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage7}
                        ImageUri={image7}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={3}
                    />

                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage8}
                        ImageUri={image8}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={6}
                    />

                    <ImageLoaderTO
                        ImageRemover={ImageRemover}
                        SetImage={setImage9}
                        ImageUri={image9}
                        DeviceWidth={DeviceWidth}
                        ImagePicker={ImagePicker}
                        ProductId={productId}
                        ImageOrder={9}
                    />

                </View>

            </View>
            {/* <ThumbnailImage 
                path={"92a22867-016c-4af9-8cb6-fe630c5c6175.jpg"}
                layoutHeight={DeviceWidth * 0.2}
                layoutWidth={DeviceWidth * 0.2}
                height={500}
                width={500}
            /> */}

        </>
    );
};

export default MyImagePicker;

