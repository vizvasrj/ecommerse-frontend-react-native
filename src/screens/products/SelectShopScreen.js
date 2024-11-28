import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, Text, FlatList, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as productAddContext } from '../../context/productAddContext';
import { Context as shopContext } from '../../context/shopContext';
const SHOPS_DATA = [
    {
        id: 1,
        title: 'Shop 1',
        image_url: 'https://apanashop-some-bucket.s3.ap-south-1.amazonaws.com/media/e/0/d783fb23d84ee53c101db719d836fb.jpg'

    },
    {
        id: 2,
        title: 'Shop 2',
        image_url: 'https://apanashop-some-bucket.s3.ap-south-1.amazonaws.com/media/e/0/d783fb23d84ee53c101db719d836fb.jpg'
    },
    {
        id: 4,
        title: 'Shop 3',
        image_url: 'https://apanashop-some-bucket.s3.ap-south-1.amazonaws.com/media/e/0/d783fb23d84ee53c101db719d836fb.jpg'
    }
]

const ResetState = ({ shopId, state, reset_state }) => {
    console.log("state.shopId === shopId", state.shopId, shopId)
    if (`${state.shopId}` !== `${shopId}`) {
        console.log(`resetting state from useEffect in AddProducts because shopId: ${shopId}, state.shopId: ${state.shopId}`)
        reset_state();
    }
}

const Item = ({ id, title, image_url, navigation, state, reset_state }) => (
    <TouchableOpacity
        onPress={() => {
            ResetState({ shopId: id, state, reset_state });
            navigation.navigate("AddProducts", { shop_id: `${id}`, shopName: `${title}` })
        }}
    >
        {/* <Image source={{ uri: image_url }} width={100} height={100} /> */}
        <Text
            // best styling you got
            style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 10, color: 'blue', backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, margin: 10 }}
        >{title}</Text>
    </TouchableOpacity>
)

const SelectShopScreen = ({ navigation }) => {

    const { state: shopState, listMyShops } = useContext(shopContext);
    useEffect(() => {
        navigation.addListener('focus', () => {
            listMyShops();
        });

    }, [navigation])

    const { state, reset_state } = useContext(productAddContext);
    const [refreshing, setRefreshing] = React.useState(false);
    return (
        <>
            {
                shopState.myShops.length === 0 
                ? <FlatList refreshing={true} onRefresh={()=>void 0}/> 
                : (
                    <FlatList
                        refreshing={refreshing}
                        onRefresh={() => {
                            // wait for 2 second to simulate loading
                            setRefreshing(true);
                            setTimeout(() => {
                                console.log("from refresh")
                                console.log("after 2 seconds")
                                setRefreshing(false);
                            }, 2000);
                        }}
    
    
                        data={shopState.myShops}
                        renderItem={({ item }) => <Item id={item.id} title={item.name} image_url={item.image_url} navigation={navigation}
                            state={state} reset_state={reset_state}
                        />}
                        keyExtractor={item => item.id}
                    />

                )
            }
            <Button 
                title="sss"
                onPress={() => {
                    listMyShops();
                    console.log("from button", shopState.myShops[0].name);
            }}/>

            <Button 
                title="go to details screen"
                onPress={() => {
                    navigation.navigate("ProductDetail", { productId: "8" })
                }} 
            />
        </>
    );
}

export default SelectShopScreen;
