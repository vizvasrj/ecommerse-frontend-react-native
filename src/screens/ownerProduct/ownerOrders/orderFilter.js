import React, { useEffect } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Button, ScrollView } from 'react-native';

import { Context as MerchantContext } from '../../../context/merchantOrdersContext';
import { secondaryColor } from '../../../theme/color';

const OrderFilter = ({ navigation }) => {
    const { 
        state, 
        getOrderListFn, 
        getOrderFilterByMonthFn,
        clearOrderListFn,
        monthYearSetterFn,
    } = React.useContext(MerchantContext);

    useEffect(() => {
        getOrderFilterByMonthFn();
    }, []);

    const groupByYear = (data) => {
        return data.reduce((result, item) => {
            result[item.year] = [...(result[item.year] || []), item];
            return result;
        }, {});
    };

    const groupedData = groupByYear(state.monthlyCount);

    return (
        <ScrollView style={styles.container}>
            {Object.entries(groupedData).map(([year, items]) => (
                <View key={year} style={styles.yearContainer}>
                    <Text style={styles.yearText}>{year}</Text>
                    {items.map(item => (
                        <TouchableOpacity
                            key={`${item.year}-${item.month}`}
                            onPress={() => {
                                clearOrderListFn();
                                monthYearSetterFn(item.month_num, item.year);
                                // getOrderListFn(0, item.year, item.month_num);
                                navigation.navigate('OwnerOrders');
                            }}
                            style={styles.monthButton}
                        >
                            <Text style={styles.monthText}>{item.month} {item.count}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </ScrollView>
    );

}

export default OrderFilter;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    yearContainer: {
        marginBottom: 20,
    },
    yearText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    monthButton: {
        backgroundColor: secondaryColor,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    monthText: {
        fontSize: 16,
    },
});