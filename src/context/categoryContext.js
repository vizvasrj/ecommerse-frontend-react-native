import createDataContext from "./createDataContext";
import productApi from "../api/product"

const categoryReducer = (state, action) => {
    switch (action.type) {
        case "selected_category_item":
            return { ...state, selectedCategoryItem: action.payload };
        case "set_category_id":
            return { ...state, categoryId: action.payload };

    }
}

const search_categories = dispatch => async (searchQuery) => {
    try {
        const response = await productApi.get("/categories", {
            params: {
                name: searchQuery
            }
        });
        console.log("from search_categories", response.data)
        dispatch({ type: "search_categories", payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "add_error", payload: "Something went wrong with search_categories" });
    }
}

export const { Provider, Context } = createDataContext(
    categoryReducer,
    { search_categories },
    { categories: [], selectedCategoryItem: {}, categoryId: null }
);