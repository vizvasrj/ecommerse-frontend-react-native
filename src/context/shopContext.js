import createDataContext from "./createDataContext";
import shopApi from '../api/shop';
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'list_my_shops':
            return { 
                ...state, 
                errorMessage: "", 
                myShops: action.payload,
            };

        case 'default_shop':
            return {
                ...state,
                errorMessage: "",
                defaultShop: action.payload
            }


        default:
            return state;
    }
}


const setDefaultShopFn = (dispatch) => {
    return async (shop) => {
        console.log("inside setDefaultShopFn")
        try {
            await AsyncStorage.setItem("defaultShop", JSON.stringify(shop));
        } catch (err) {
            console.log("error in setDefaultShopFn", err);
        }
        
        dispatch({ type: 'default_shop', payload: shop });
    }

} 

const getDefaultShopLocalFn = (dispatch) => {
    return async () => {
        try {
            const shop = await AsyncStorage.getItem("defaultShop");
            if (shop !== null) {
                dispatch({ type: 'default_shop', payload: JSON.parse(shop) });
            }
        } catch (err) {
            console.log("error in getDefaultShopLocalFn", err);
        }
    
    }
}

const listMyShops = dispatch => async () => {
    console.log("inside listMyShops||")
    try {
        console.log("inside listMyShops")
        const response = await shopApi.get('/my');
        console.log("response.data::", response.data.shops)
        dispatch({ type: 'list_my_shops', payload: response.data.shops });
        if (response.data.shops.length > 0) {
            dispatch({ type: 'default_shop', payload: response.data.shops[0] });
        }

    } catch (err) {
        console.log(err);
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { 
        listMyShops,
        setDefaultShopFn,
        getDefaultShopLocalFn,
    },
    { 
        myShops: [], 
        singularShop: null, 
        errorMessage: "",
        defaultShop: null
    }
)