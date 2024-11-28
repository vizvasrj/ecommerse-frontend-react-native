import React from "react";

// this takes productId and setShowMoreMap useState setting fnction as arguments
const toggleShowMoreFn = (productId, setShowMoreMap) => {
    console.log('toggleShowMoreFn called');
    setShowMoreMap((prevMap) => ({
        ...prevMap,
        [productId]: !prevMap[productId],
    }));
};

export default toggleShowMoreFn;