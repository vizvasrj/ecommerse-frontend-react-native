import React, {useState} from 'react';
import { Text, Button, FlatList, View, Modal, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/base';

const MyFilterModel = ({filter, modalVisible, setModalVisible}) => {
    const [checkedState, setCheckedState] = useState({});
    const handleCheckChange = (id) => {
        setCheckedState(prevState => ({ ...prevState, [id]: !prevState[id] }));
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                console.log("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{ flex: 1, backgroundColor: '#ccc' }}>
                <View

                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        borderRadius: 10,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ccc',
                        zIndex: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text>Close Model</Text>

                    </TouchableOpacity>
                </View>
                <View

                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 80,
                        borderRadius: 10,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ccc',
                        zIndex: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setCheckedState({});
                        }}
                    >
                        <Text>Clear Filter</Text>

                    </TouchableOpacity>
                </View>


                <FlatList
                    data={filter}
                    keyExtractor={(item) => item.variation_id}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    padding: 10,
                                    margin: 10,
                                }}>
                                    <Text style={{ fontSize: 24, paddingLeft: 10 }}>{item.variation_name}</Text>
                                    <FlatList
                                        data={item.variation_option}
                                        keyExtractor={(item) => item.variation_option_id}
                                        renderItem={({ item }) => {
                                            return (
                                                <>
                                                    <CheckBox
                                                        title={item.name}
                                                        checked={checkedState[item.variation_option_id] || false}

                                                        value={item.variation_option_id}
                                                        onPress={() => handleCheckChange(item.variation_option_id)}
                                                    />
                                                </>
                                            )
                                        }}
                                    />
                                </View>

                            </>
                        )
                    }}
                />

            </View>
        </Modal>

    )
}

export default MyFilterModel;