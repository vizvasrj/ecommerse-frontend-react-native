import createDataContext from "./createDataContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const activateMerchantTabReducer = (state, action) => {
    switch (action.type) {
        case "activate_merchant_tab":
        return { ...state, merchantTab: action.payload };
    
        default:
        return state;
    }
}

// b is bool: True, False
const activateMerchantTab = (dispatch) => {
    return async (b) => {
        console.log("from activateMerchantTab", b)
        // check b is boolean or not
        if (typeof b !== "boolean") {
            return;
        }
        await AsyncStorage.setItem("merchantTab", JSON.stringify(b));
        dispatch({ type: "activate_merchant_tab", payload: b });
    }
}

const tryLocalMerchantTab = (dispatch) => {
    return async () => {
        const tab = await AsyncStorage.getItem("merchantTab");
        if (tab !== null) {
            dispatch({ type: "activate_merchant_tab", payload: JSON.parse(tab) });
        }
    }
}

export const { Provider, Context } = createDataContext(
    activateMerchantTabReducer,
    { activateMerchantTab, tryLocalMerchantTab },
    { merchantTab: false }
);