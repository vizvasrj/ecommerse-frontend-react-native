import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View, ToastAndroid } from "react-native";
import SearchSelect from "../../components/category/SearchSelect";
import productApi from "../../api/product"
import { useNavigation } from "@react-navigation/native";
const AddProductScreen = ({route}) => {
    const navigation = useNavigation();

    const [name, setName] = useState(null);

    const [description, setDescription] = useState(null);

    const [categoryId, setCategoryId] = useState(null);
    const [categoryItem, setCategoryItem] = useState(null);
    const [stateCategories, setStateCategories] = useState([]);
    const [productID, setProductID] = useState(null);
    const [categorySelectedItems, setCategorySelectedItems] = useState({});


    const categorySearchFunction = async (name) => {
        console.log("searchFunction", name);
        try {
            const response = await productApi.post("/product_category/search", { "name": name });
            console.log("from searchFunction", response.data);
            setStateCategories(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }

    const [brandId, setBrandId] = useState(null);
    const [brandItem, setBrandItem] = useState(null);
    const [stateBrands, setStateBrands] = useState([]);
    const [brandSelectedItems, setBrandSelectedItems] = useState({});


    const brandSreachFunction = async (name) => {
        console.log("searchFunction", name.name);
        try {
            const response = await productApi.post("/v2/brand/search", { "name": name.name });
            console.log("from searchFunction", response.data);
            setStateBrands(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }


    const createProduct = async (categoryId, name, description, brandId) => {
        console.log("createProduct", categoryId, name, description, brandId);
        
        try {
            const response = await productApi.post("", {
                "category_id": parseInt(categoryId), 
                "name": name, 
                "description": description,
                "shop_id": 1,
                "brand_id": parseInt(brandId),
            });
            console.log("from createProduct", response.data);
            setProductID(response.data.result.id);
            // console.log("productID", response.data.result.id)
            navigation.navigate("NewAddProductItem", {productID: `${response.data.result.id}`})
        } catch (err) {
            console.log(err);
        }
    }

    const handleCreateProduct = () => {
        if (!categoryId || !name || !description || !brandId) {
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
            return;
        }
        createProduct(categoryId, name, description, brandId);
    }

    return (
        <>
            <View style={{ flex: 1, padding: 10 }}>
                <Text>Add prouct screen for owner</Text>
                <Text>Category</Text>
                <SearchSelect
                    searchFunction={categorySearchFunction}
                    setSearchItem={setCategoryItem}
                    setSearchItemId={setCategoryId}
                    navigation={navigation}
                    searchStateList={stateCategories}
                    setSearchStateList={setStateCategories}
                    selectedItems={categorySelectedItems}
                    setSelectedItems={setCategorySelectedItems}
                />

                <Text>Name</Text>
                <View style={{ borderBottomWidth: 1, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingLeft: 5, paddingRight: 5, margin: 5 }}>
                    <TextInput placeholder={"name"} 
                        onChangeText={(text) => {
                            // console.log("onChangeText", text);
                            setName(text);
                        }}
                    />
                </View>

                <Text>Description</Text>
                <View style={{ borderBottomWidth: 1, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingLeft: 5, paddingRight: 5, margin: 5 }}>

                    <TextInput placeholder={"description"} multiline={true} 
                        onChangeText={(text) => {
                            // console.log("onChangeText", text);
                            setDescription(text);
                        }}
                    />
                </View>


                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Brand</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("NewAddBrand");
                        }}
                    >
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>add brand</Text>
                    </TouchableOpacity>
                </View>

                <SearchSelect 
                    searchFunction={brandSreachFunction}
                    setSearchItem={setBrandItem}
                    setSearchItemId={setBrandId}
                    navigation={navigation}
                    searchStateList={stateBrands}
                    setSearchStateList={setStateBrands}
                    selectedItems={brandSelectedItems}
                    setSelectedItems={setBrandSelectedItems}
                />
                <View style={{ flex: 1, padding: 10, justifyContent: "flex-end" }}>
                    <Button title="Create Product" onPress={handleCreateProduct} />
                </View>
            </View>
        </>
    );

}
export default AddProductScreen;
