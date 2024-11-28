import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import {useContext} from "react";
// import { Context as AuthContext } from "../context/authContext";
const instance = axios.create({
    baseURL: 'http://192.168.1.4:8001'
})

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            console.log("from AsyncStorage token is put here", token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        console.log("ERROR::", "err from axios", err)
        return Promise.reject(err)
    }
)

export default instance;