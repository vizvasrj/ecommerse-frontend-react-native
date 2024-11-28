import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {primaryColor} from '../../../../theme/color';
import { Input, Button } from '@rneui/base';
import { Context as LogisticsContext } from '../../../../context/logistics/logisticsContext';
const EditProfile = ({navigation, route}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState('');

    const {state, getLogisticsAvailabilityStatusFn, getLogisticsMeFn} = React.useContext(LogisticsContext);
    useEffect(() => {
        console.log('EditProfile.js');
        getLogisticsMeFn();
        getLogisticsAvailabilityStatusFn();
        
    }, [])
    useEffect(() => {
        console.log('EditProfile.js state.me', state.me);
        if (state.me) {
            setName(state.me.name);
            setEmail(state.me.email);
            setAvailabilityStatus(state.me.availability_status);
        }
    }, [state.me])

    const [selectedId, setSelectedId] = useState(null);


  

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity id={item} onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.title}>{item}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        const backgroundColor = item === availabilityStatus ? "#6e3b6e" : "#f9c2ff";
        console.log("item", item, "availabilityStatus", availabilityStatus)
        return (
            <Item
                item={item}
                onPress={() => setAvailabilityStatus(item)}
                style={{ backgroundColor }}
            />
        );
    };
    return (
        <>
            <View style={{flex: 1}}>
                <Input placeholder="Name" 
                    value={name}
                    onChangeText={setName}
                />
                <Input placeholder="Email" 
                    value={email}
                    onChangeText={setEmail}
                />
                <FlatList 
                    data={state.availabilityStatus}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    extraData={availabilityStatus}
                />
            </View>
            <Button title={"Save"} onPress={() => {
                console.log("Save", name, email, availabilityStatus)
            }} />
        </>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    description: {
        fontSize: 16,
    },
});