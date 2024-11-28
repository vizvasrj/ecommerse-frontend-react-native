import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import firebaseSetup from "../../../setup";
import { Context as AuthContext } from "../../context/authContext";
const LogisticsLoginScreen = ({ navigation }) => {

    const { state, loginLogistics } = useContext(AuthContext);

    const { auth } = firebaseSetup();
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("+919999999999");
    const [code, setCode] = useState("112255");


    const [confirm, setConfirm] = useState(null);

    const signInWithPhoneNumber = async (phoneNumber) => {
        setIsLoading(true);
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log("Error from LogisticsLoginScreen.signInWithPhoneNumber", error);
        }
        setIsLoading(false);
    };


    const getIdToken = async () => {
        try {
            const idToken = await auth().currentUser.getIdToken();
            console.log(idToken);
            return idToken
        } catch (error) {
            console.log("Error from LogisticsLoginScreen.getIdToken", error);
        }
    }

    const confirmCode = async (code) => {
        try {
            const user = await confirm.confirm(code);
            console.log(user);
            idToken = await getIdToken();
            user.idToken = idToken;
            loginLogistics(user);
        } catch (error) {
            console.log("Error from LogisticsLoginScreen.confirmCode", error);
        }
    };

    return (
        confirm ? (

            <View>
                <TextInput
                    placeholder="Enter code"
                    value={code}
                    onChangeText={setCode}
                />
                <Button title="Confirm Code" onPress={() => confirmCode(code)} />
            </View>
        ) : (
            <View>
                <TextInput
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Button title="Sign In" onPress={() => signInWithPhoneNumber(phoneNumber)} />
            </View>
        )
    )
}

export default LogisticsLoginScreen;