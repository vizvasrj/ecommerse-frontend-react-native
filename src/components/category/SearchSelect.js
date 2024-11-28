import React, { Fragment, useEffect, useState, useContext } from "react";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Text } from "react-native";
import { Button } from "@rneui/base";

const SearchSelect = ({
    searchFunction, setSearchItem, 
    setSearchItemId, navigation, 
    searchStateList, setSearchStateList,
    selectedItems, setSelectedItems,
}) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        console.log("from useEffect", searchStateList)
        // if searchStateList is null, setItems to empty array
        if (searchStateList === null) {
            setItems([])
        } else {
            setItems(searchStateList)
        }
    }, [searchStateList])

    const demoBrand = {id: 1, name: "demo brand"}
    return (

        <>
            <Fragment>
                <SearchableDropdown
                    selectedItems={selectedItems}
            
                    onItemSelect={(item) => {
                        console.log("onItemSelect::", item);
                        setSearchItem(item);
                        setSelectedItems(item);
                        setSearchItemId(item.id);
                        // console.log("from category search shopID::", state.shopId);
                        // navigation.goBack();
                    }}
                    containerStyle={{ padding: 5 }}
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
                                searchFunction({ name: text })
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

export default SearchSelect;