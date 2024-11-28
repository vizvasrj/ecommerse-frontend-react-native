// import React from "react"
// import createDataContext from "./createDataContext"

// const brandReducer = (state, action) => {
//     switch (action.type) {
//         case 'add_brand':
//             return {...state, brand: action.payload}
//         default:
//             return state;
//     }
// }

// const addBrand = (dispatch) => async (brand) => {
//     console.log("addBrand", brand);
//     dispatch({type: 'add_brand', payload: brand})
// }

// export const {Provider, Context} = createDataContext(
//     brandReducer,
//     {addBrand},
//     {brand: null}
// )