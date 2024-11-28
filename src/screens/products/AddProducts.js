import React from "react";
import { Text } from "@rneui/base";
import AddProductForm from "../../components/addProductForm";
import { Context as ShopContext } from "../../context/shopContext";


const AddProducts = () => {
    // const {state} = React.useContext(ShopContext);

    // console.log("from AddProducts", state.defaultShop);

    return (
        <>
            <AddProductForm />
        </>
    )
}

export default AddProducts;