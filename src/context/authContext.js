import createDataContext from "./createDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from "../api/auth";
import logisticsApi from "../api/logistics";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };

        case "clear_error_message":
            return { ...state, errorMessage: "" };

        case "login":
            return { errorMessage: "", token: action.payload };

        case "signup":
            return { errorMessage: "" };

        case "signout":
            return { token: null, errorMessage: "" }

        case "email_verify":
            return { errorMessage: "", token: action.payload };

        // logistics part
        case "login_logistics":
            return { logisticsToken: action.payload, errorMessage: "" }

        case "signout_logistics":
            return { logisticsToken: null, errorMessage: "" }

        case "token_alive":
            return { tokenAlive: action.payload }

        default:
            return state;
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: "clear_error_message" })
}

const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {

        try {
            const response = await authApi.get("/profile/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("from tryLocalSignin", response.data)
            dispatch({ type: "login", payload: token });
            return

        } catch (error) {
            console.log("error why i cannot get profile.me", error);
            dispatch({ type: "add_error", payload: "expired token" })
            await AsyncStorage.removeItem("token")
            return
        }
    }
}



const login = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await authApi.post("/login", { email, password });
            console.log("00", response.data.result.access_token)
            // console.log("00", response)
            await AsyncStorage.setItem('token', response.data.result.access_token);
            dispatch({ type: "login", payload: response.data.result.access_token });
        } catch (err) {
            console.log("aaa", err);
            if (err.response) {
                dispatch({ type: "add_error", payload: err.response.data.message })
            } else {
                dispatch({ type: "add_error", payload: "something went wrong with sign in" })
            }
        }
    };
}

const email_verify = (dispatch) => {
    return async ({ email, otp }) => {
        console.log("----", email, otp)
        try {
            const response = await authApi.post("/verify", {
                "email": email,
                "otp": otp,
            });
            console.log("from email_verify in authcontext", response.data);
            await AsyncStorage.setItem("token", response.data.result.access_token)
            dispatch({ type: "email_verify", payload: response.data.result.access_token });

        } catch (err) {
            console.log("error from email verify", err)
            dispatch({ type: "add_error", payload: "something went wrong with verify" })
        }
    }
}

const signup = (dispatch) => {
    return async ({ name, email, password, confirmPassword }) => {
        try {
            const response = await authApi.post("/register", {
                "name": name,
                "email": email,
                "password": password,
                "confirm_password": confirmPassword,
            });
            console.log("from Signup", response.data)
            dispatch({ type: "signup" },)
            return true
        } catch (err) {
            console.log("error in signup", err)
            dispatch({ type: "add_error", payload: "something went wrong with sign up" })
            return false
        }
    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem("token")
        dispatch({ type: "signout" })
    }
}

const tryLocalSigninLogistics = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("logistics_access_token");
    if (token) {
        dispatch({ type: "login_logistics", payload: token });
    }
}

// logistic part
const loginLogistics = (dispatch) => {
    return async (user) => {
        try {
            const response = await logisticsApi.post("/verify_firebase_phone_auth", user);
            console.log("authContext.loginLogistics response", response.data);
            await AsyncStorage.setItem('logistics_access_token', response.data.result.user.access_token);
            console.log("access_token", response.data.result.user.access_token)
            await AsyncStorage.setItem('logistics_refresh_token', response.data.result.user.refresh_token);

            dispatch({ type: "login_logistics", payload: response.data.result.user.access_token });
        } catch (err) {
            console.log("error in login logistics", err)
            dispatch({ type: "add_error", payload: "something went wrong with logistics login" })
        }
    }
}

const logisticsSignout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem("logistics_access_token")
        await AsyncStorage.removeItem("logistics_refresh_token")
        dispatch({ type: "signout_logistics" })
    }
}

const logisticsMe = (dispatch) => {
    return async (setFunc) => {
        try {
            const response = await logisticsApi.get("/logistics_user/me");
            setFunc(response.data.result)
            console.log("from logisticsMe", response.data)
        } catch (err) {
            console.log("error in logisticsMe", err)
        }
    }

}

const authMeFn = (dispatch) => {
    return async (token) => {
        try {

            const response = await authApi.get("/profile/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("from authMeFn", response.data);
            // setFunc(response.data.result)
            dispatch({ type: "token_alive", payload: true })
            return
        } catch (error) {
            console.log("error why i cannot get profile.me", error);
        }
        dispatch({ type: "token_alive", payload: false })
    }
}


export const { Provider, Context } = createDataContext(
    authReducer,
    {
        signout, login, clearErrorMessage, tryLocalSignin, signup, email_verify,
        loginLogistics, tryLocalSigninLogistics, logisticsSignout, logisticsMe,
        authMeFn,
    },
    {
        token: null, errorMessage: '', some: "any some",
        logisticsToken: null,
        tokenAlive: false,
    }
);