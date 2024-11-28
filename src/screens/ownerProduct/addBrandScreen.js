import React from 'react';
import productApi from '../../api/product';
import { Text, TextInput, View, Button } from 'react-native';

const AddBrandScreen = ({ navigation, route }) => {
    // const {setBrandSelectedItems} = route.params;

    const [brandName, setBrandName] = React.useState(null);

    const brandSearchFn = async (name) => {
        console.log("searchFunction", name);
        try {
            const response = await productApi.post("/v2/brand/search", { "name": name });
            console.log("from searchFunction", response.data);
            // setBrandSelectedItems(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }
    
    // console.log("AddBrandScreen", setBrandSelectedItems)
    return (
        <>
            <View style={{ flex: 1, padding: 10 }}>

                <Text>Brand</Text>
                <View style={{ borderBottomWidth: 1, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingLeft: 5, paddingRight: 5, margin: 5 }}>
                    <TextInput placeholder={"Brand name"} 
                        onChangeText={(text) => {
                            console.log("onChangeText", text);
                            setBrandName(text);
                        }}
                    />
                </View>
            </View>

            <View style={{ flex: 1, padding: 10, justifyContent: "flex-end" }}>
                <Button title={"Add"} onPress={() => {
                    console.log("NEXT");
                    // setBrandSelectedItems(demoData);
                    brandSearchFn(brandName);
                    navigation.goBack();
                }} />
            </View>

        </>
    );
}

export default AddBrandScreen;