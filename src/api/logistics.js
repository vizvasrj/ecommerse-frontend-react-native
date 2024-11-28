import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const instance = axios.create({
    baseURL: 'http://192.168.1.4:8004'
})


instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("logistics_access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.cancelToken = new axios.CancelToken((cancel) => {

        });
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance;