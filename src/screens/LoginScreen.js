import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { Context as AuthContext } from "../context/authContext";
import AuthForm from "../components/authForm";
import NavLink from "../components/navLink";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
    const { state, login, tryLocalSignin, clearErrorMessage } = useContext(AuthContext);
    // const [error, setError] = React.useState("");
    // useEffect(() => {
    //     tryLocalSignin();
    // }, [])

    // const getRequest = async () => {
    //     try {

    //         await axios.get("http://192.168.1.4:8000/hi")
    //     } catch (err) {
    //         setError(err.response.data)
    //     }
    // }

    useEffect(() => {
        const clearmessage = navigation.addListener("blur", () => {
            clearErrorMessage()
        });
    }, [navigation]);

    return (
        <>
            <AuthForm
                errorMessage={state.errorMessage}
                onSubmit={login}
            // submitButtonText={"Login"}
            />
            <View style={{ padding: 10 }}>
                <NavLink
                    navigation={navigation}
                    path="Signup"
                    text="Do not have an account, Create here."
                />
            </View>
            <View style={{ flex:1, justifyContent: "flex-end", padding: 10  }}>
                <NavLink
                    navigation={navigation}
                    path="LogisticsLoginScreen"
                    text="Signup or login for logistics."
                />
            </View>
            {/* <TouchableOpacity onPress={getRequest}>
                <Text style={{ padding: 10, color: "tomato", backgroundColor: "gray" }}>press: {error}</Text>
            </TouchableOpacity> */}
        </>
    )
}

export default LoginScreen;