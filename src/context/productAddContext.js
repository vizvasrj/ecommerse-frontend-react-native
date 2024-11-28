import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import productApi from "../api/product"

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_product':
            return { errorMessage: "" };

        case "add_error":
            return { ...state, errorMessage: action.payload };

        case "clear_error_message":
            return { ...state, errorMessage: "" };

        case "categories":
            return {...state, categories: action.payload};

        case "selected_category_item":
            return {...state, selectedCategoryItem: action.payload};

        case "set_shop_id":
            return {...state, shopId: action.payload};

        case "set_category_id":
            return {...state, categoryId: action.payload};

        case "set_name":
            return {...state, name: action.payload};

        case "set_total_stock":
            return {...state, totalStock: action.payload};

        case "set_price":
            return {...state, price: action.payload};

        case "set_price_unit":
            return {...state, priceUnit: action.payload};

        case "set_description":
            return {...state, description: action.payload};

        case "set_image1":
            return {...state, image1: action.payload};
        
        case "set_image2":
            return {...state, image2: action.payload};

        case "set_image3":
            return {...state, image3: action.payload};

        case "set_image4":
            return {...state, image4: action.payload};

        case "set_image5":
            return {...state, image5: action.payload};

        case "set_image6":
            return {...state, image6: action.payload};

        case "set_image7":
            return {...state, image7: action.payload};

        case "set_image8":
            return {...state, image8: action.payload};

        case "set_image9":
            return {...state, image9: action.payload};
        
        case "reset_state":
            return {errorMessage: ""};        


        case "saved_product":
            return {...state, saved_product: action.payload};


        case "images":
            return {...state, images: action.payload};

        case "products":
            if (action.filterChanged) {
                return {
                    ...state, 
                    products: action.payload, 
                    nextOffset: action.nextOffset, 
                    previousOffset: action.previousOffset,
                    filterChanged: false
                }
            }
            return {
                ...state, 
                products: [...state.products, ...action.payload], 
                nextOffset: action.nextOffset, 
                previousOffset: action.previousOffset,
                filterChanged: false
            }

        case "incomplete_products":
            return {...state, incompleteProductItems: [...state.incompleteProductItems, ...action.payload]};
        
        case "incomplete_products_offset":
            return {...state, incompleteProductItemsOffset: action.payload};

        default:
            return state;
    }
};

const reset_state = (dispatch) => () => {
    dispatch({type: "reset_state"})
}


const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: "clear_error_message" })
}

const setShopId = (dispatch) => (shop_id) => {
    dispatch({type: "set_shop_id", payload: shop_id})
}

const setCategoryId = (dispatch) => (category_id) => {
    dispatch({type: "set_category_id", payload: category_id})
}

const setName = (dispatch) => (name) => {
    dispatch({type: "set_name", payload: name})
}

const setTotalStock = (dispatch) => (total_stock) => {
    dispatch({type: "set_total_stock", payload: total_stock})
}

const setPrice = (dispatch) => (price) => {
    dispatch({type: "set_price", payload: price})
}

const setPriceUnit = (dispatch) => (price_unit) => {
    dispatch({type: "set_price_unit", payload: price_unit})
}

const setDescription = (dispatch) => (description) => {
    dispatch({type: "set_description", payload: description})
}

const add_product = (dispatch) => {
    return async ({ shopId, categoryId, name, totalStock, price, priceUnit, description }) => {
        try {
            console.log("product add data::", shopId, categoryId, name, totalStock, price, priceUnit, description)
            const response = await productApi.post("", {
                shop_id: shopId, 
                category_id: categoryId, 
                name: name, 
                total_stock: totalStock, price, 
                price_unit: priceUnit, 
                description: description
            });
            console.log("response product data::", response.data.result)
            dispatch({type: "saved_product", payload: response.data.result})

        } catch (err) {
            console.log("product add error::", err, response.data)
            dispatch({type: "add_error", payload: "something went wrong with add product"})
        }

    }

}

// const offlineAddProduct = (dispatch) => {
//     return
// }

const selectCategoryItem = (dispatch) => (item) => {
    dispatch({type: "selected_category_item", payload: item})
}

const getProductFromID = (dispatch) => {
    return async (id) => {
        try {
            const response = await productApi.get(`/${id}`);
            console.log("response product data::", response.data.result)
            dispatch({type: "saved_product", payload: response.data.result})

        } catch (err) {
            console.log("product add error::", err, response.data)
            dispatch({type: "add_error", payload: "something went wrong with add product"})
        }

    }
}

const getProductImages = (dispatch) => {
    return async (id) => {
        try {
            const response = await productApi.get(`/product_images/${id}`);
            console.log("response product data::", response.data.result)
            dispatch({type: "images", payload: response.data.result})

        } catch (err) {
            console.log("product add error::", err, response.data)
            dispatch({type: "add_error", payload: "something went wrong with add product"})
        }
    }
}

const search_categories = (dispatch) => {
    return async ({name}) => {
        try {
            const response = await productApi.post("/product_category/search", {"name": name});
            console.log("search categories::", response.data.result)
            if (response.data.result !== null) {
                dispatch({type: "categories", payload: response.data.result})

            } else {
                console.log("search categories::", "response.data.result is null")
                dispatch({type: "categories", payload: []})
            }   

        } catch (err) {
            console.log("search categories error::", err)
            dispatch({type: "add_error", payload: "something went wrong with search categories"})
        }

    }
}

const productList = (dispatch) => {
    return async ({offset, filterChanged, priceSort, name}) => {
        try {
            const response = await productApi.get("/", {
                params: {
                    offset: offset,
                    pageSize: 10,
                    priceSort: priceSort,
                    name: name,
                }
            });
            if (response.data.result !== null) {
                dispatch({
                    type: "products", 
                    payload: response.data.result.result, 
                    nextOffset: response.data.result.next_offset, 
                    previousOffset: response.data.result.previous_offset,
                    filterChanged: filterChanged,
                })

            } else {
                console.log("product list::", "response.data.result is null")
                // dispatch({type: "products", payload: []})
                dispatch({type: "add_error", payload: "something went wrong with product list"})
            }   

        } catch (err) {
            console.log("product list error::", err)
            dispatch({type: "add_error", payload: "something went wrong with product list"})
        }
    }
}

const setImage1 = (dispatch) => (image1) => {
    dispatch({type: "set_image1", payload: image1})
}

const setImage2 = (dispatch) => (image2) => {
    dispatch({type: "set_image2", payload: image2})
}

const setImage3 = (dispatch) => (image3) => {
    dispatch({type: "set_image3", payload: image3})
}

const setImage4 = (dispatch) => (image4) => {
    dispatch({type: "set_image4", payload: image4})
}

const setImage5 = (dispatch) => (image5) => {
    dispatch({type: "set_image5", payload: image5})
}

const setImage6 = (dispatch) => (image6) => {
    dispatch({type: "set_image6", payload: image6})
}

const setImage7 = (dispatch) => (image7) => {
    dispatch({type: "set_image7", payload: image7})
}

const setImage8 = (dispatch) => (image8) => {
    dispatch({type: "set_image8", payload: image8})
}

const setImage9 = (dispatch) => (image9) => {
    dispatch({type: "set_image9", payload: image9})
}

const productFilterPriceSort = (dispatch) => (priceSort) => {
    if( priceSort === 'price_high_to_low' || priceSort === 'price_low_to_high') {
        dispatch({type: "product_filter_price_sort", payload: priceSort})
    }
}

const listIncompleteProducts = (dispatch) => {
    return async(offset) => {
        try {
            console.log("here comes the offset ",offset)
            const response = await productApi.get(`/v2/user/merchant/incomplete_products?offset=${offset}`, {
                params: {
                    offset: offset,
                }
            });
            // console.log("response incomplete products::", response.data.result)
            if (response.data.result.products !== null) {
                dispatch({
                    type: "incomplete_products", 
                    payload: response.data.result.products, 
                })
    
            } else {
                // console.log("product list::", "response.data.result is null")
                // dispatch({type: "products", payload: []})
                dispatch({type: "add_error", payload: "something went wrong with product list"})
            }
            dispatch({
                type: "incomplete_products_offset", 
                payload: response.data.result.offset, 
            })

        } catch (err) {
            // console.log("product list error::", err)
            dispatch({type: "add_error", payload: "something went wrong with product list"})
        
        }
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { 
        add_product, clearErrorMessage, search_categories, 
        selectCategoryItem, setShopId, setCategoryId, setName, 
        setTotalStock, setPrice, setPriceUnit, setDescription,
        setImage1, setImage2, setImage3, setImage4, setImage5,
        setImage6, setImage7, setImage8, setImage9,
        reset_state, getProductFromID, getProductImages, productList,
        listIncompleteProducts,

    },
    { 
        errorMessage: "", categories: [], selectedCategoryItem: null, 
        shopId: '', categoryId: '', name: '', totalStock: '', 
        price: '', priceUnit: '', description: '', 
        saved_product: null, images: [], products: [],
        nextOffset: null, previousOffset: null, filterChanged: false,
        image1: null, image2: null, image3: null, image4: null, image5: null,
        image6: null, image7: null, image8: null, image9: null,
        incompleteProductItems: [], incompleteProductItemsOffset: 0,
    }
);

