import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.1.4:8000'
})

// instance.interceptors.request.use(
//     async (config) => {
//         console.log("config")
//         const token = await AsyncStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     },
//     (err) => {
//         console.log("ERROR::", "err from axios", err)
//         return Promise.reject(err)
//     }
    
// )

export default instance