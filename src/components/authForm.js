import React, {useState} from "react";
import { Button, View, Text, TextInput as Input, StyleSheet } from "react-native";
import { ToastAndroid } from "react-native";

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    return (
        <View style={styles.container}>

            <Input 
                style={styles.input}
                autoCapitalize="none"
                cursorColor={"grey"}
                autoCorrect={false}
                placeholder="Email"
                value={email}
                onChangeText={(newEmail) => setEmail(newEmail)}
            />

            <Input 
                style={styles.input}
                autoCapitalize="none"
                cursorColor={"grey"}
                autoCorrect={false}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(newPassword) => setPassword(newPassword)}
            />

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <Button 
                style={styles.button}
                title={"Login"} 
                onPress={() => {
                    console.log(email, password);
                    onSubmit({email, password})
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
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
    errorMessage: {
        color: "red",
        marginBottom: 5,
    }
});

export default AuthForm;