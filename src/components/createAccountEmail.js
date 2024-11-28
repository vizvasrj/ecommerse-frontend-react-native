import React, { useState, useEffect } from "react";
import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import ValidateEmail from "./validateEmail";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateAccountFromEmail = ({ onSubmit }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const [validateName, setValidateName] = useState(false)
    const [validateEmail, setValidateEmail] = useState(false)
    const [validatePassword2, setValidatePassword2] = useState(false)


    const validatePassword = (password, confirmPassword) => {
        if (password.length >= 8) {
            if (password === confirmPassword) {
                // matched
                setValidatePassword2(true)
                setError("")
            } else {
                setError("password did not matched")
                // do not matched
            }
        } else {
            setError("password is small")
            // short password
        }
    }

    useEffect(() => {
        validatePassword(password, confirmPassword)
    }, [confirmPassword, password])


    useEffect(() => {
        if (name != "") {
            setValidateName(true)
            setError("")
        } else {
            setError("Name is empty")
        }
    }, [name])

    return (
        <>
            <TextInput
                style={styles.TextInput}

                autoCapitalize="none"
                cursorColor={"grey"}
                autoCorrect={false}
                placeholder="Name"
                value={name}
                onChangeText={(newName) => {
                    console.log("setNmae", newName)
                    setName(newName)
                }}
            />
            <TextInput
                style={styles.TextInput}

                autoCapitalize="none"
                cursorColor={"grey"}
                autoCorrect={false}
                placeholder="Email"
                value={email}
                onChangeText={(newEmail) => {
                    setEmail(newEmail);
                }}
                onBlur={() => {
                    if (ValidateEmail(email)) {
                        setValidateEmail(true)
                    } else {
                        setValidateEmail(false)
                    }
                }}
            />

            <TextInput
                style={styles.TextInput}

                autoCapitalize="none"
                cursorColor={"grey"}
                autoCorrect={false}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(newPassword) => setPassword(newPassword)}
            />

            <TextInput
                style={styles.TextInput}

                autoCapitalize="none"
                cursorColor={"grey"}
                autoCorrect={false}
                placeholder="Confirm Password"
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={(newConfirmPassword) => setConfirmPassword(newConfirmPassword)}
            />

            <Text style={{ padding: 10, color: "red" }}>{error}</Text>


            <Button title={"Signup"}
                onPress={async () => {
                    console.log(email, password);
                    ToastAndroid.show("Login as x@a.io", ToastAndroid.SHORT);
                    if (validateName && validateEmail && validatePassword2) {
                        const bool = await onSubmit({
                            name: name,
                            email: email,
                            password: password,
                            confirmPassword: confirmPassword,
                        })
                        if (bool) {
                            navigation.navigate("EmailVerifyScreen", { email: email })
                        }
                    } else {
                        setError("some error")
                    }
                }}
            />
        </>
    )

}

export default CreateAccountFromEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    TextInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    button: {
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    errorText: {
        padding: 10, 
        color: "red",
    },
});
