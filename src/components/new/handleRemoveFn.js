import React from 'react';

// this takes shopping_cart_item_id and removeFromCart useState setting fnction as arguments
const HandleRemoveFn = (shopping_cart_item_id, removeFromCart) => {
    removeFromCart(shopping_cart_item_id);
}

export default HandleRemoveFn;