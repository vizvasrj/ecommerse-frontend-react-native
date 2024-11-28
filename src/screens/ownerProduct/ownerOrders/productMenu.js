import { ToastAndroid, Text, Button, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useContext } from "react";
import { backgroundColor, fontColor, secondaryColor } from '../../../theme/color';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Context as MerchantActiveContext } from '../../../context/activateMerchantTabContext';
const ProductMenu = ({ }) => {
    const { activateMerchantTab } = useContext(MerchantActiveContext);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                    navigation.navigate('MerchantProducts');
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="home" size={24} style={styles.icon} />
                    <Text style={styles.menuTitle}>My Products</Text>
                </View>
                <Text style={styles.menuText}>See all your products.</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                    navigation.navigate('IncompleteProducts');
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="list-alt" size={24} style={styles.icon}/>
                    <Text style={styles.menuTitle}>Incomplete Products</Text>
                </View>
                <Text style={styles.menuText}>See incomplete products</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                    navigation.navigate('AllProductScreen');
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="list-alt" size={24} style={styles.icon}/>
                    <Text style={styles.menuTitle}>All Products</Text>
                </View>
                <Text style={styles.menuText}>See all products</Text>
            </TouchableOpacity>
            


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    menuButton: {
        backgroundColor: secondaryColor,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: fontColor,
    },
    menuText: {
        fontSize: 14,
    },
    icon: {
        marginRight: 5,
        // color: fontColor,
    }
});
export default ProductMenu;