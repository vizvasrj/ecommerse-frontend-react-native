import React, { useState } from 'react';

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { Context as MerchantContext } from '../../../context/merchantOrdersContext';
import MerchantOrderItem from '../../../components/merchant/orderListItem';
const OwnerOrdersScreen = ({ navigation }) => {

    const [usedOffset, setUsedOffset] = useState([]);
    const [isEndReached, setIsEndReached] = useState(false);

    const { state, getMerchantOrderListFn, state: {nextOffset} } = React.useContext(MerchantContext);

    const handleEndReached = () => {
        // console.log("!isEndReached", !isEndReached)
        if (!isEndReached) {
            if (nextOffset !== null) {
                if (usedOffset.includes(nextOffset)) {
                    return;
                }
                // console.log("from screen next offset", nextOffset, state.year, state.month);
                getMerchantOrderListFn(nextOffset, state.year, state.month);
            } else {
                setIsEndReached(true);
            }
        }
    }



    React.useEffect(() => {
        // console.log("USE")
        getMerchantOrderListFn(0, state.year, state.month);
    }, [])

    return (
        <View>
            <FlatList
                data={state.orderList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <MerchantOrderItem orderItem={item} />
                }}
                onEndReached={handleEndReached}

            />
            {/* <Button title="next offset" onPress={() => console.log("next offset", nextOffset)} /> */}
        </View>
    );
}

export default OwnerOrdersScreen;
