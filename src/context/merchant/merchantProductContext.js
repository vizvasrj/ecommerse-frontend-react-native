import createDataContext from "../createDataContext";
import productApi from "../../api/product";
import productImageAPI from "../../api/productImage";

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'product_list':
            return { ...state, productList: [...state.productList, ...action.payload] }; // Fixed typo in productList

        case 'product_list_refresh':
            return { ...state, productList: [] };

        case 'next_offset':
            return { ...state, nextOffset: action.payload };

        case 'product_detail':
            return { ...state, productDetail: action.payload };

        case 'incomplete_products':
            return { ...state, incompleteProductItems: [...state.incompleteProductItems, ...action.payload] };

        case 'incomplete_products_refresh':
            return { ...state, incompleteProductItems: [] };

        case 'incomplete_products_offset':
            return { ...state, incompleteProductItemsOffset: action.payload };

        case 'change_header_name': {
            return { ...state, headerName: action.payload }
        }

        case 'product_item': 
            return { ...state, productItem: action.payload };

        case 'products':
            return { ...state, products: [...state.products, ...action.payload] };

        case 'products_offset':
            return { ...state, productsOffset: action.payload };

        case 'last_search_name':
            return { ...state, lastSearchName: action.payload };

        case 'clear_products': 
            return { ...state, products: [] };

        case 'error':
            return { ...state, errorMessage: action.payload };
        
        default:
            return state;
    }
}

const getProductListFn = (dispatch) => {
    return async (nextOffset, refresh) => {
        try {
            const response = await productApi.get(`/v2/user/merchant/product_item/?offset=${nextOffset}`);
            // console.log(response.data.result);
            if (response.data.result.products) {
                if (refresh) {
                    dispatch({ type: 'product_list_refresh' });
                }
                dispatch({ type: 'product_list', payload: response.data.result.products });
            }
            dispatch({ type: 'next_offset', payload: response.data.result.offset });
            // dispatch({ type: 'order_list', payload: response.data.result.orders });
        } catch (err) {
            console.log(err);
        }
    }
}

const getProductDetailFn = (dispatch) => {
    return async (productId, setFunc, setRequestStarted) => {
        setRequestStarted(true);
        try {
            console.log("productId", productId);
            const response = await productApi.get(`/v2/user/merchant/products/${productId}`);
            console.log("getProductDetailFn", response.data);
            dispatch({ type: 'product_detail', payload: response.data.result.products });
            setFunc(response.data.result.products);
        } catch (err) {
            console.log("getProductDetailFn" ,err.response.data);
            throw err;
        }
        setRequestStarted(false);
    }
}

const listIncompleteProducts = (dispatch) => {
    return async (offset, refresh) => {
        try {
            console.log("here comes the offset ", offset, "refresh", refresh)
            const response = await productApi.get(`/v2/user/merchant/incomplete_products?offset=${offset}`, {
                params: {
                    offset: offset,
                }
            });
            // console.log("response incomplete products::", response.data.result)
            if (response.data.result.products !== null) {
                if (refresh) {
                    console.log(refresh, "refresh");
                    dispatch({ type: "incomplete_products_refresh" })
                }
                dispatch({
                    type: "incomplete_products",
                    payload: response.data.result.products,
                })

            } else {
                // console.log("product list::", "response.data.result is null")
                // dispatch({type: "products", payload: []})
                dispatch({ type: "add_error", payload: "something went wrong with product list" })
            }
            dispatch({
                type: "incomplete_products_offset",
                payload: response.data.result.offset,
            })

        } catch (err) {
            // console.log("product list error::", err)
            dispatch({ type: "add_error", payload: "something went wrong with product list" })

        }
    }
}

const uploadProductItemImage = (dispatch) => {
    return async ({ image, ProductId, ImageOrder, token }) => {
        const data = new FormData();
        data.append('file', {
            name: "someImage.jpg",
            type: 'image/jpeg',
            uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        });
        data.append('product_item_id', ProductId)
        data.append('image_order', ImageOrder)
        try {
            const response = await productImageAPI.post("/product_item_image", data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Correct header name
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            console.log("res::1", response.data);
            // dispatch({type: "image_upload_remove_from_incomplete_products", payload: ProductId});
            return response.data;
        } catch (err) {
            console.log("err:: from imageUploader.js err.response,data", err.response.data, err.response.status);
            throw err;
        }
    }
}

const removeProductItemImage = (dispatch) => {
    return async ({ setFunc, productItemId, ImageOrder }) => {
        try {
            const response = await productImageAPI.delete(`/product_item_image?product_item_id=${productItemId}&display_order=${ImageOrder}`);
            console.log("res::", response.data);
            if (response.data.result.remaining_count === 0) {
                console.log("its zero now need to remove from products")
                // dispatch({type: "image_upload_remove_from_products", payload: productItemId});
            }
            setFunc(null);
        } catch (err) {
            console.log("err::removeProductItemImage", err);
        }

    }
}

const addProductItemFn = (dispatch) => {
    return async ({ price, qty_in_stock, variation_option_value, product_id, setError, setSuccess } ) => {
        try {
            const response = await productApi.post("/v2/user/merchant/product_item", {
                "product_id": parseInt(product_id),
                "price": parseFloat(price),
                "qty_in_stock": parseInt(qty_in_stock),
                "variation_option_value": variation_option_value,
            });
            console.log("from createProductItem", response.data.result);
            setSuccess(response.data.result.product_item);
        } catch (err) {
            console.log("Error addProductItemFn", err.response.data);
            setError(err.response.data.message);
        }

    }
}


const changeHeaderNameFn = (dispatch) => {
    return async (headerName) => {
        dispatch({ type: 'change_header_name', payload: headerName });
    }
}

const getProductItemFn = (dispatch) => {
    return async (productItemId, setError) => {
        try {
            const response = await productApi.get(`/v2/user/merchant/product_item/${productItemId}`);
            console.log("from getProductItemFn", response.data.result);
            dispatch({ type: 'product_item', payload: response.data.result.product_item });
            return response.data.result;
        } catch (err) {
            console.log("Error getProductItemFn", err.response.data);
            setError(err.response?.data?.message);
        }
    
    } 
}

const variationGetFromProductId = (dispatch) => {
    return async (productId) => {
        try {
            const response = await productApi.get(`/v2/user/merchant/products/variation/${productId}`);
            console.log("from variationGetFromProductId", response.data);
            return response.data.result;
        } catch (err) {
            console.log(err);
        }
    }
    
}

const updateProductItemFn = (dispatch) => {
    return async ({ product_item_id, price, qty_in_stock, specifications, setError }) => {
        // console.log("productItemId", productItemId);
        try {
            const response = await productApi.put(`/v2/user/merchant/product_item/${product_item_id}`, {
                "price": price,
                "qty_in_stock": qty_in_stock,
                "specifications": specifications,
            });
            console.log("from updateProductItemFn", response.data.result);
            // setSuccess(response.data.result.product_item);
        } catch (err) {
            console.log("Error updateProductItemFn", err.response.data);
            setError(err.response.data.message);
        }
    }
}

const getAllProductsFn = (dispatch) => {
    return async (offset, name, scroll, searchClick) => {
        dispatch({ type: 'error', payload: "" });

        if (offset !== null ){
            if (scroll === false) {
                // console.log("clearing products");
                dispatch({ type: 'clear_products', payload: [] });
            }
            
            if (searchClick) {
                dispatch({ type: 'products_offset', payload: 0 });
            }
            try {
                // console.log("here")
                const response = await productApi.get(`/v2/user/merchant/products?offset=${offset}&name=${name}`);
                // console.log("from getAllProductsFn", response.data);
    
                if (response.data.result.products !== null) {
                    dispatch({ type: 'products', payload: response.data.result.products });
                } 
                dispatch({ type: 'products_offset', payload: response.data.result.offset });
                dispatch({ type: 'last_search_name', payload: name });
            } catch (err) {
                console.log("getAllProductsFn error", err);
                if (err.response) {
                    dispatch({ type: 'error', payload: err.response.data?.message });
                }
            }
        }
    }
}



export const { Provider, Context } = createDataContext(
    orderReducer,
    {
        getProductListFn,
        getProductDetailFn,
        listIncompleteProducts,
        uploadProductItemImage,
        removeProductItemImage,
        addProductItemFn,
        changeHeaderNameFn,
        getProductItemFn,
        updateProductItemFn,
        getAllProductsFn,
    },
    {
        productList: [],
        nextOffset: 0,
        productDetail: {},
        productItems: [],
        incompleteProductItems: [],
        incompleteProductItemsOffset: 0,
        headerName: "",
        productItem: {},
        products: [],
        productsOffset: 0,
        lastSearchName: "",
        errorMessage: "",
    }
);


