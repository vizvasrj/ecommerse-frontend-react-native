import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const instance = axios.create({
    baseURL: 'http://192.168.1.4:8003'
})


instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            console.log("from product image token this requires to run once and save token to state", token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        console.log("ERROR::", "err from axios", err)
        return Promise.reject(err)
    }
)

export default instance