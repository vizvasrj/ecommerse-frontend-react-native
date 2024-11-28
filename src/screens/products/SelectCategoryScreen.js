import React, { Fragment, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CategoryFilterForm from '../../components/categoryFilter';

const SelectCategoryScreen = ({ navigation, route }) => {
    const [selectedItems, setSelectedItems] = useState(route.params.selectedItems);
    const [items, setItems] = useState(route.params.items);
    
    const categories_state = route.params.categories_state;
    const search_categories = route.params.search_categories;
    const handleSave = () => {
        route.params.setItems(items);
        route.params.setSelectedItems(selectedItems);
        navigation.goBack();
    };

    // const handleCancel = () => {
    //     navigation.goBack();
    // };

    // const handleCategoryPress = (category) => {
    //     const index = selectedItems.indexOf(category.id);
    //     if (index === -1) {
    //         setSelectedItems([...selectedItems, category.id]);
    //     } else {
    //         setSelectedItems(selectedItems.filter((id) => id !== category.id));
    //     }
    // };

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity onPress={() => handleCategoryPress(item)}>
    //         <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
    //             <Text style={{ marginRight: 10 }}>{item.name}</Text>
    //             {selectedItems.includes(item.id) && <Text>✓</Text>}
    //         </View>
    //     </TouchableOpacity>
    // );

    return (
        <View>
            <Fragment>

            <CategoryFilterForm
                categories_state={categories_state}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                items={items}
                setItems={setItems}
                search_categories={search_categories}
            />
            </Fragment>
            {/* <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <TouchableOpacity onPress={handleCancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

export default SelectCategoryScreen;
