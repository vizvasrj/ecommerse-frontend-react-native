import createDataContext from "./createDataContext";
import productApi from "../api/product"; 


const merchantOrdersReducer = (state, action) => {
    switch (action.type) {
        case 'order_list':
            return { ...state, orderList: [...state.orderList, ...action.payload] };

        case 'next_offset':
            return { ...state, nextOffset: action.payload };

        case 'monthly_count':
            return { ...state, monthlyCount: action.payload };

        case 'clear_order_list':
            return { ...state, orderList: [] };

        case 'month':
            return { ...state, month: action.payload };

        case 'year':
            return { ...state, year: action.payload };

        default:
            return state;
    }
}


const getMerchantOrderListFn = (dispatch) => {
    return async (nextOffset, year, month) => {
        console.log("RUN next offset ", nextOffset, "year", year, "month", month)
        // console.log("getOrderListFn called from", new Error().stack);

        try {
            let url = `/v2/user/merchant/orders?offset=${nextOffset}`;
            if (year) url += `&year=${year}`;
            if (month) url += `&month=${month}`;

            const response = await productApi.get(url);
            console.log("from getOrderListFn response", response.data);
            console.log("from getOrderListFn next offset", response.data.result.offset);
            if (response.data.result.orders) {
                dispatch({ type: 'order_list', payload: response.data.result.orders });
            }

            dispatch({ type: 'next_offset', payload: response.data.result.offset });
            // if (year && month) {
            //     dispatch({ type: 'month', payload: month });
            //     dispatch({ type: 'year', payload: year });
            // }
        } catch (err) {
            console.log(err);
        }
    }
}

const monthYearSetterFn = (dispatch) => {
    return async (month, year) => {
        console.log("from monthYearSetterFn", month, year);
        dispatch({ type: 'month', payload: month });
        dispatch({ type: 'year', payload: year });

        
    }
}

const getOrderFilterByMonthFn = (dispatch) => {
    return async () => {
        try {
            const response = await productApi.get('/v2/user/merchant/monthly_filter_count');
            console.log("from getOrderFilterByMonth", response.data.result?.monthly_count);
            dispatch({ type: 'monthly_count', payload: response.data.result?.monthly_count });
        } catch (err) {
            console.log(err);
        }
    }
}

const clearOrderListFn = (dispatch) => {
    return () => {
        dispatch({ type: 'clear_order_list'});
    }
}

export const { Provider, Context } = createDataContext(
    merchantOrdersReducer,
    {
        getMerchantOrderListFn,
        // monthYearChoserFn,
        getOrderFilterByMonthFn,
        clearOrderListFn,
        monthYearSetterFn,
    },
    { 
        orderList: [], 
        nextOffset: null,
        month: null,
        year: null, 
        monthlyCount: [],
    }
);