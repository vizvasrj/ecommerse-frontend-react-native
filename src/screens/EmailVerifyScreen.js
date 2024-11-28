import React, { useState, useContext } from 'react';
import { Button, Text } from '@rneui/base';
import { Input } from '@rneui/themed';
import { Context as AuthContext } from '../context/authContext';

const EmailVerifyScreen = (props) => {
    const {state, email_verify} = useContext(AuthContext);
    const [otp, setOtp] = useState("");
    const email = props.route.params.email

    return (
        <>
            <Text>Email verify screen</Text>
            <Input
                style={{paddingLeft: 20, paddingRight: 20}}
                label="Enter OTP"
                value={otp}
                onChangeText={(newOtp) => setOtp(newOtp)}
                maxLength={6}
                textContentType='oneTimeCode'
            />
            <Button title={"verify"}
                onPress={() => {
                    console.log(props.route.params)
                    email_verify({email, otp})
                }}
            ></Button>
        </>
    )
}

export default EmailVerifyScreen;