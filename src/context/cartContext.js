import createDataContext from "./createDataContext";
import productApi from "../api/product";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add_to_cart':
            // const existingItem = state.cart_items.find(item => item.shopping_cart_item_id === action.payload.id);

            // if (existingItem) {
            //     return state.cart_items.map(item =>
            //         item.id === existingItem.shopping_cart_item_id ? { ...item, quantity: item.quantity + 1 } : item
            //     );
            // } else {
            //     return [...state, action.payload];
            // }
            // return { ...state, cart_items: [...state.cart_items, action.payload] };
            // return {
            //     ...state,
            //     cart_items: state.cart_items.map(item =>
            //         item.product_item_id === action.payload.product_item_id ? action.payload : item
            //     )
            // };
            // it will check if the product_item_id is already in the cart then it will update the quantity of that product in the cart
            return {
                ...state,
                cart_items: state.cart_items.some(item => item.product_item_id === action.payload.product_item_id)
                    ? state.cart_items.map(item =>
                        item.product_item_id === action.payload.product_item_id ? action.payload : item
                    )
                    : [...state.cart_items, action.payload]
            };

        case 'remove_from_cart':
            return { ...state, cart_items: state.cart_items.filter((item) => item.shopping_cart_item_id !== action.payload) };

        case 'clear_cart':
            return [];

        case 'get_all_cart_item':

            // return { ...state, cart_items: [...state.cart_items, ...action.payload] };
            return { ...state, cart_items: action.payload };

        case 'cart_count':
            return { ...state, cart_count: action.payload };

        case 'next_offset':
            return { ...state, next_offset: action.payload };

        case 'current_offset':
            return { ...state, current_offset: action.payload };


        case 'add_checkbox_item_fn':
            return { ...state, checkbox_items: [...state.checkbox_items, ...action.payload] };

        case 'remove_checkbox_item_fn':
            return { ...state, checkbox_items: state.checkbox_items.filter((item) => item.shopping_cart_item_id !== action.payload) };


        case 'total_product_price':
            return { ...state, total_product_price: action.payload };

        case 'total_discount':
            return { ...state, total_discount: action.payload };

        case 'total_discounted_price':
            return { ...state, total_discounted_price: action.payload };

        // case 'update_cart_quantity':
        //     console.log("State before update: ", state.cart_items);
        //     console.log("Action payload: ", action.payload);
        //     return {
        //         ...state,
        //         cart_items: state.cart_items.map(item => {
        //             // console.log("Current item: ", item);
        //             console.log(action.payload.shopping_cart_item_id, "|", item.shopping_cart_item_id)
        //             if (item.shopping_cart_item_id === action.payload.shopping_cart_item_id) {
        //                 console.log("Match found, updating quantity");
        //                 return { ...item, ...action.payload };
        //             } else {
        //                 console.log("No match found, returning item as is");
        //                 return item;
        //             }
        //         })
        //     };

        case 'update_cart_quantity':
            const itemIndex = state.cart_items.findIndex(
                item => item.shopping_cart_item_id === action.payload.shopping_cart_item_id
            );

            if (itemIndex !== -1) {
                // If the item exists, update its quantity
                let newCartItems = [...state.cart_items];
                newCartItems[itemIndex].quantity = action.payload.quantity;

                return {
                    ...state,
                    cart_items: newCartItems,
                };
            } else {
                // If the item doesn't exist, append it to the cart_items array
                return {
                    ...state,
                    cart_items: [...state.cart_items, action.payload],
                };
            }


        case 'update_total_price':
            return {
                ...state, totalPriceState: {
                    total_product_price: action.payload.total_product_price,
                    total_discount: action.payload.total_discount,
                    total_discounted_price: action.payload.total_discounted_price,
                }
            };
        
        case 'update_only_total_discounted_price':
            return {
                ...state, 
                totalPriceState: {
                    ...state.totalPriceState,
                    total_discounted_price: action.payload,
                }
            }

        case 'address_list':
            return { ...state, address_list: action.payload };

        case 'default_address':
            // set default address by finding it from address_list
            return { ...state, default_address: state.address_list.find(item => item.address_id === action.payload) };

        case 'update_address':
            return { ...state, address_list: state.address_list.map(item => item.address_id === action.payload.address_id ? { ...item, ...action.payload } : item) };

        case 'add_address':
            // first make every address is_default to false
            // add action.payload sinle object  to address_list 
            // return { ...state, address_list: [...state.address_list, action.payload] };
            // return { ...state, address_list: state.address_list.map(item => { return { ...item, is_default: false } }).concat(action.payload) };

            return {
                ...state,
                address_list: [action.payload, ...(state.address_list || []).map(item => { return { ...item, is_default: false } })]
            };

        case 'update_is_default':
            // make is_default to true for given address_id and false for others
            return { ...state, address_list: state.address_list.map(item => item.address_id === action.payload.address_id ? { ...item, is_default: action.payload.is_default } : { ...item, is_default: false }) };


        case 'success_redirect':
            return { ...state, success_redirect: action.payload };

        case 'delete_address':
            return { ...state, address_list: state.address_list.filter((item) => item.address_id !== action.payload) };


        case 'payment_method':
            return { ...state, payment_method: action.payload };

        case 'payment_data':
            return { ...state, payment_data: action.payload };


        case 'splash_screen_visible':
            return { ...state, splash_screen_visible: action.payload };

        case 'additional_data':
            const updatedAdditionalData = state.additional_data ? state.additional_data.slice() : []; // create a copy of the existing array or use an empty array if it's null

            action.payload.forEach(newItem => {
                const index = updatedAdditionalData.findIndex(item => item.shopping_cart_item_id === newItem.shopping_cart_item_id);

                if (index !== -1) {
                    // If the item exists, replace it
                    updatedAdditionalData[index] = newItem;
                } else {
                    // If the item does not exist, append it
                    updatedAdditionalData.push(newItem);
                }
            });
            return { ...state, additional_data: updatedAdditionalData };



        case 'remove_from_additional_data':
            return {
                ...state,
                additional_data: state.additional_data?.filter(item => item.shopping_cart_item_id !== action.payload.shopping_cart_item_id)
            };

        case 'calculate_total_delivery_cost':
            const updatedAdditionalData2 = state.additional_data ? state.additional_data.slice() : []; // create a copy of the existing array or use an empty array if it's null

            const { shopping_cart_item_id, quantity } = action.payload;

            const index = updatedAdditionalData2.findIndex(item => item.shopping_cart_item_id === shopping_cart_item_id);

            if (index !== -1) {
                // If the item exists, update its totalDeliveryCost
                const deliveryCost = updatedAdditionalData2[index].delivery_type.cost;
                updatedAdditionalData2[index].totalDeliveryCost = deliveryCost * quantity;
            }

            return { ...state, additional_data: updatedAdditionalData2 };


        case 'payment_method_id':
            return { ...state, user_payment_method_id: action.payload };
        default:
            return state;



    }
};

const addToCart = (dispatch) => {
    return async ({ product_item_id, quantity }) => {
        console.log("from addToCart", product_item_id, quantity);
        try {
            const response = await productApi.post(`/v2/user/cart`, {
                product_item_id: `${product_item_id}`,
                quantity: quantity,
            });
            console.log("from addToCart", response.data);
            dispatch({ type: 'add_to_cart', payload: response.data.result.cart_item });
            cartCountfn(dispatch)();
            getTotalPrice(dispatch)();
            getAllCartItem(dispatch)(0);
            // store to async storage

            // const CART = {
            //     "product_and_quantity":
            //     {
            //         product_id: quantity
            //     },
            // };
            // let cart = await AsyncStorage.getItem('cart');
            // if (cart) {
            //     cart = JSON.parse(cart);
            //     cart.push(CART);
            // } else {
            //     cart = [];
            //     cart.push(CART);
            // }
            // await AsyncStorage.setItem('cart', JSON.stringify(cart));


        } catch (error) {
            // store data to 

            console.log("from addToCart", error);
        }
    }
};

const removeFromCart = (dispatch) => {
    return async (shopping_cart_item_id) => {
        try {
            const response = await productApi.delete(`/v2/user/cart/${shopping_cart_item_id}`,)
            console.log("from removeFromCart", response.data.result);
            dispatch({ type: 'remove_from_cart', payload: shopping_cart_item_id });
            cartCountfn(dispatch)("cart count function invoked");
            dispatch({ type: 'remove_from_additional_data', payload: { shopping_cart_item_id } });
            getTotalPrice(dispatch)();

        }
        catch (error) {
            console.error("from removeFromCart", error);
        }
        // remove it from asyncstorage
        // try {
        // let cart = await AsyncStorage.getItem('cart');
        // if (cart) {
        //     cart = JSON.parse(cart);
        //     cart = cart.filter((item) => item.product_id !== product_id);
        //     await AsyncStorage.setItem('cart', JSON.stringify(cart));
        // }

        // } catch (error) {
        //     console.log("from removeFromCart", error);
        // return
        // }

        // dispatch({ type: 'remove_from_cart', payload: product_id });
        // dispatch(cartCountfn());
    }
};


const getTotalPrice = (dispatch) => {
    return async () => {
        try {
            const response = await productApi.get(`/v2/user/cart/total_price`,)
            console.log("from removeFromCart", response.data.result);
            dispatch({ type: 'update_total_price', payload: response.data.result.total_price });

        }
        catch (error) {
            console.error("from getTotalPrice", error);
        }

    }
};


const clearCart = (dispatch) => {
    return () => {
        dispatch({ type: 'clear_cart' });
        dispatch({ type: 'cart_count', payload: 0 });
    }
};


const incrementDecrementQuantityFn = (dispatch) => {
    return async (shopping_cart_item_id, quantity) => {
        try {
            console.log("shopping_cart_item_id", shopping_cart_item_id, "quantity", quantity);
            const response = await productApi.post(`/v2/user/cart/quantity`, {
                shopping_cart_item_id: shopping_cart_item_id,
                quantity: quantity
            });
            console.log("from increment", response.data.result);
            // dispatch({ type: 'add_to_cart', payload: response.data.result });
            payload = {
                "shopping_cart_item_id": shopping_cart_item_id,
                "quantity": response.data.result.quantity,
            }
            console.log("payload from increment decremnt quantity function", payload);
            dispatch({
                type: 'update_cart_quantity',
                payload: {
                    "quantity": response.data.result.quantity,
                    "shopping_cart_item_id": shopping_cart_item_id,
                }
            });
            cartCountfn(dispatch)("cart count function invoked");
            getTotalPrice(dispatch)();
            dispatch({
                type: 'calculate_total_delivery_cost',
                payload: {
                    "quantity": response.data.result.quantity,
                    "shopping_cart_item_id": shopping_cart_item_id,
                }
            });

        } catch (error) {
            // store data to 

            console.log("from incrementDecrementQuantityFn", error);
        }
    }
};

const cartCountfn = (dispatch) => {
    return async (text) => {
        try {
            console.log(text);
            const response = await productApi.get(`/v2/user/cart/count`);
            console.log("from cartCountfn", response.data.result);
            dispatch({ type: 'cart_count', payload: response.data.result.total });

        }
        catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("from cartCountfn", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("from cartCountfn", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("from cartCountfn", error.message);
            }
        }
    }

}


// this function is used to get all cart item from server
// and save it to async storage every time apps reload
const getAllCartItem = (dispatch) => {
    return async (offset) => {
        try {
            const response = await productApi.get(`/v2/user/cart/?limit=10&offset=${offset}`);
            if (response.data.result.cart_items !== null) {
                dispatch({ type: 'get_all_cart_item', payload: response.data.result.cart_items });
                dispatch({ type: 'next_offset', payload: response.data.result.next_offset });
                dispatch({ type: 'current_offset', payload: offset });
                dispatch({ type: 'update_total_price', payload: response.data.result.total_price })

                response.data.result.cart_items.forEach(item => {
                    calculateDeliveryCostFn(dispatch)(item, item.delivery_type[0].id);
                });

                // store to async storage
                // return response.data.result; // Return the response data
            }
        } catch (error) {
            console.error("from getAllCartItem", error);
            // throw error; // Throw the error to handle it outside the function
        }
    }
}

const add_checkbox_item_fn = (dispatch) => {
    return async (item) => {
        try {
            console.log("add_checkbox_item_fn", item);
            dispatch({ type: 'add_checkbox_item_fn', payload: item });
        }
        catch (error) {
            console.error("from add_checkbox_item_fn", error);
        }
    }
}

const remove_checkbox_item_fn = (dispatch) => {
    return async (item) => {
        try {
            console.log("remove_checkbox_item_fn", item);
            dispatch({ type: 'remove_checkbox_item_fn', payload: item });
        }
        catch (error) {
            console.error("from remove_checkbox_item_fn", error);
        }
    }
}

// ! address context
const fetchAddressFn = (dispatch) => {
    return async () => {
        try {
            const response = await productApi.get(`/v2/user/address`);
            console.log("from fetchAddressFn", "response.data.result");
            dispatch({ type: 'address_list', payload: response.data.result.addresses });
            const address_list = response.data.result.addresses;
            // use find to get default_address from address_list
            const default_address = address_list?.find(item => item.is_default === true);
            if (default_address) {
                dispatch({ type: 'default_address', payload: default_address.address_id });
            }
            // return response.data.result; // Return the response data
        } catch (error) {
            console.error("from fetchAddressFn", error);
            // throw error; // Throw the error to handle it outside the function
        }
    }

}

// ! address context
const choseAddressFn = (dispatch) => {
    return async (address_id) => {
        try {
            const response = await productApi.get(`/v2/user/address/${address_id}/default`);
            // console.log("from choseAddressFn", response.data);
            if (response.data.success) {
                dispatch({ type: 'default_address', payload: address_id });
                dispatch({ type: 'update_is_default', payload: { address_id: address_id, is_default: true } })
            }
            // return response.data.result; // Return the response data
        } catch (error) {
            console.error("from choseAddressFn error", error);
            // throw error; // Throw the error to handle it outside the function
        }
    }

}

// ! address context
const updateAddress = (dispatch) => {
    return async (address_id, address) => {
        try {
            const response = await productApi.post(`/v2/user/address/${address_id}`, address);
            console.log("from updateAddress", response.data.result);
            dispatch({ type: 'update_address', payload: response.data.result.address });
            dispatch({ type: 'success_redirect', payload: true })
            // return response.data.result.address; // Return the response data
        } catch (error) {
            console.error("from updateAddress", error);
            // throw error; // Throw the error to handle it outside the function
        }
    }
}

// ! address context
const addAddress = (dispatch) => {
    return async (address) => {
        try {
            const response = await productApi.post(`/v2/user/address`, address);
            console.log("from addAddress", response.data.result.address);
            dispatch({ type: 'add_address', payload: response.data.result.address })
            // dispatch({ type: 'update_address', payload: response.data.result });
            dispatch({ type: 'success_redirect', payload: true })
            // return response.data.result.address; // Return the response data
        } catch (error) {
            console.error("from addAddress", error);
            // throw error; // Throw the error to handle it outside the function
        }
    }
}

// ! address context
const deleteAddressFn = (dispatch) => {
    return async (address_id) => {
        try {
            const response = await productApi.delete(`/v2/user/address/${address_id}`);
            console.log("from deleteAddress", response.data);
            if (response.data.success) {
                dispatch({ type: 'delete_address', payload: address_id });
            }
            // return response.data.result.address; // Return the response data
        } catch (error) {
            console.error("from deleteAddress", error);
            // throw error; // Throw the error to handle it outside the function
        }
    }
}

const setSuccessRedirect = (dispatch) => {
    return async (value) => {
        console.log("explectly make it success redirect to", value)
        dispatch({ type: 'success_redirect', payload: value })
    }
}

// TODO make dynamic payment ID so i can save it as ID
const selectPaymentMethodFn = (dispatch) => {
    return async (payment_method, payment_data) => {
        console.log("payment_method", payment_method)
        switch (payment_method) {
            case "cod":
                console.log("switch case cod")
                try {
                    const response = await productApi.post(`/v2/user/payment`, {
                        payment_type: "Cash on Delivery"
                    });
                    const result = response.data.result;
                    // console.log("from selectPaymentMethodFn cod", );
                    dispatch({ type: 'payment_method', payload: result.payment_method.payment_type })
                    dispatch({ type: 'payment_method_id', payload: result.payment_method.id })

                } catch (error) {
                    console.error("from selectPaymentMethodFn cod", error);
                }
            case "upi":
                try {
                    const response = productApi.post(`/v2/user/payment`, {
                        payment_type: "UPI",
                        upi_id: payment_data.upi_id
                    });
                    // console.log("from selectPaymentMethodFn", response.data);
                    // dispatch({ type: 'payment_method', payload: response.data.result.payment_method.payment_type })
                    // dispatch({ type: 'payment_method_id', payload: response.data.result.payment_method.id })

                } catch (error) {
                    console.error("from selectPaymentMethodFn upi", error);
                }
                

            case "card":
            case "netbanking":
            case "wallet":
                console.log("switch case Ohers")

                dispatch({ type: 'payment_method', payload: payment_method })
                dispatch({ type: 'payment_data', payload: payment_data })
            default:
                break;

        }
    }
}

// {
//     "payment_method_id": "2",
//     "shipping_address_id": "2",
//     "shipping_method_id": "1",
//     "products": [
//         {
//             "product_item_id": "63",
//             "quantity": 2
//         },
//         {
//             "product_item_id": "64",
//             "quantity": 3
//         }
//     ]

// }

const placeOrderFn = (dispatch) => {
    return async ({
        payment_method_id,
        shipping_address_id,
        shipping_method_id,
        products,
        // delivery_type,
    }) => {

        try {
            const data = {
                "payment_method_id": payment_method_id,
                "shipping_address_id": shipping_address_id,
                "shipping_method_id": shipping_method_id,
                "products": products,
                // "delivery_type": delivery_type,
            }
            console.log(JSON.stringify(data, null, 2));
            const response = await productApi.post(`/v2/user/order`, data);

            console.log("SUCCESS from placeOrderFn RESPONSE is ", response.data);
            dispatch({ type: 'splash_screen_visible', payload: true })
            cartCountfn(dispatch)();
        } catch (error) {
            console.error("ERROR from placeOrderFn", error);
        }
    }
}


const setSplashScreenVisibleFn = (dispatch) => {
    return async (value) => {
        dispatch({ type: 'splash_screen_visible', payload: value })
    }
}


const calculateDeliveryCostFn = (dispatch) => {
    return async (
        cartItem, selectedDeliveryType, 
        // total_discounted_price
    ) => {
        console.log("cartItem from calculateDeliveryCostFn in cartContext.js", cartItem)
        const selectedDelivery = cartItem.delivery_type.find(dt => dt.id === selectedDeliveryType);
        const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
        const totalDeliveryCost = deliveryCost * cartItem.quantity;
        const additionalData = [{
            product_item_id: cartItem.product_item_id,
            shopping_cart_item_id: cartItem.shopping_cart_item_id,
            delivery_type: selectedDelivery,
            totalDeliveryCost,
        }];
        console.log("from calculateDeliveryCostFn", additionalData);

        dispatch({ type: 'additional_data', payload: additionalData });
        // console.log("BBBBBBBBBBBBB", total_discounted_price, totalDeliveryCost)
        // dispatch({
        //     type: 'update_only_total_discounted_price',
        //     payload: total_discounted_price + totalDeliveryCost
        // })
    }
}
const getGeocoding = (dispatch) => {
    return async (coords, {setStreet, setState, setCity, setPostalCode}) => {
        const mapApiKeyEnv = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; 
        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${mapApiKeyEnv}`;
            const response = await axios.get(url);
            // Dispatch an action to update the state with the geocoding data
            const street = response.data["results"][0]["formatted_address"]
            let parts = street.split(',');

            if (parts[0].includes('+')) {
                parts.shift();
            }

            address = parts.join(',').trimStart();

            console.log(response.data["results"][0]["formatted_address"])
            // console.log("825301 postal code", response.data["results"][0]["address_components"][7]["long_name"])
            const addressComponents = response.data["results"][0].address_components;

            // Find components using a map and object creation
            const extractedData = addressComponents.reduce((acc, component) => {
                if (component.types.includes('political') && component.types.includes('administrative_area_level_3')) {
                    acc.administrativeAreaLevel3 = component;
                } else if (component.types.includes('political') && component.types.includes('administrative_area_level_1')) {
                    acc.administrativeAreaLevel1 = component;
                } else if (component.types.includes('political') && component.types.includes('country')) {
                    acc.country = component;
                } else if (component.types.includes('postal_code')) {
                    acc.postalCode = component;
                }
                return acc;
            }, {});

            const country = extractedData.country ? extractedData.country.long_name : null;
            const administrativeAreaLevel1 = extractedData.administrativeAreaLevel1 ? extractedData.administrativeAreaLevel1.long_name : null;
            const administrativeAreaLevel3 = extractedData.administrativeAreaLevel3 ? extractedData.administrativeAreaLevel3.long_name : null;
            const postalCode = extractedData.postalCode ? extractedData.postalCode.long_name : null;
            setStreet(address);
            // setCountry(country);
            setState(administrativeAreaLevel1);
            setCity(administrativeAreaLevel3);
            setPostalCode(postalCode);

        } catch (error) {
            console.error("from getGeocoding", error);
        }
    };
};

const sendPaymentDetail = (dispatch) => {
    return async (payment_method, payment_data) => {

    }
}



export const { Context, Provider } = createDataContext(
    cartReducer,
    {
        addToCart, removeFromCart, clearCart,
        getAllCartItem, incrementDecrementQuantityFn,
        cartCountfn,
        add_checkbox_item_fn,
        remove_checkbox_item_fn,
        getTotalPrice,
        fetchAddressFn,
        choseAddressFn,
        updateAddress,
        addAddress,
        setSuccessRedirect,
        deleteAddressFn,
        selectPaymentMethodFn,
        placeOrderFn,
        setSplashScreenVisibleFn,
        calculateDeliveryCostFn,
        getGeocoding,
    },
    {
        cart_items: [],
        cart_count: 0,
        next_offset: 0,
        demo_dispatch: null,
        current_offset: 0,
        checkbox_items: [],
        // total_product_price: 0.0,
        // total_discount: 0.0,
        // total_discounted_price: 0.0,
        totalPriceState: {
            total_product_price: 0.0,
            total_discount: 0.0,
            total_discounted_price: 0.0,
        },
        address_list: [],
        default_address: null,
        success_redirect: false,
        payment_method: null,
        payment_data: null,
        user_payment_method_id: null,
        splash_screen_visible: false,
        additional_data: null,
    
    },

);