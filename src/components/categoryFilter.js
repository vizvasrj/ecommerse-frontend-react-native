import React, { Component, Fragment, useEffect, useState, useContext } from "react";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Button, Text } from "@rneui/base";


const CategoryFilterForm = ({categories_state, selectedItems, setSelectedItems, items, setItems, search_categories}) => {

    useEffect(() => {
        console.log("from useEffect", categories_state)
        setItems(categories_state)
    }, [categories_state])


    return (
        <>
            <Button title={"Add product"} onPress={() => {
                console.log("selected items::", selectedItems)
            }} />
            <Text >Category picker?</Text>
            <Fragment>
                <SearchableDropdown
                    selectedItems={selectedItems}
                    onItemSelect={(item) => {
                        // const items = selectedItems;
                        // items.push(item)
                        console.log("onItemSelect::", item)
                        setSelectedItems(item)
                        // this.setState({ selectedItems: items });
                    }}
                    containerStyle={{ padding: 5 }}
                    // onRemoveItem={(item, index) => {
                    //     const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    //     this.setState({ selectedItems: items });
                    // }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={items}
                    // defaultIndex={0}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: "placeholder",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            },
                            onTextChange: text => {
                                console.log("log grom catery search", text);
                                search_categories({ name: text })
                            }
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />
            </Fragment>
        </>
    )
}

export default CategoryFilterForm;