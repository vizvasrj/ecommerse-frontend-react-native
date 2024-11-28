import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import CreateAccountFromEmail from "../components/createAccountEmail";
import { Context as AuthContext } from "../context/authContext";
import EmailVerifyScreen from "./EmailVerifyScreen";
import { Button } from "@rneui/base";

const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext);
    console.log(state.signupSuccess)
    return (
        <>
            <View style={styles.container}>

                <CreateAccountFromEmail
                    onSubmit={signup}
                    signupSuccess={state.signupSuccess}
                />
                <Button
                    style={styles.button}
                    title={"go to email verify"}
                    onPress={() => {
                        navigation.navigate("EmailVerifyScreen", { email: "something@a.io" })
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Login")
                    }}
                    style={styles.link}>
                    <Text style={styles.linkText}>
                        Go to login screen
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        console.log(state.token)
                    }}
                    style={styles.link}>
                    <Text style={styles.linkText}>
                        get state
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    link: {
        alignItems: 'center',
        marginTop: 15,
    },
    linkText: {
        color: '#456789',
        fontWeight: '800',
        fontSize: 25,
    },
    container: {
        flex: 1,
        padding: 10
    }
});

export default SignupScreen;