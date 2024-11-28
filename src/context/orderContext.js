import createDataContext from "./createDataContext";
import productApi from "../api/product";

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'order_list':
            return { ...state, orderList: [...state.orderList, ...action.payload] };

        case 'next_offset':
            return { ...state, nextOffset: action.payload };

        case 'shipping_address':
            return { ...state, shipping_address: action.payload };
        
        case 'order_items':
            return { ...state, order_items: action.payload };

        case 'clear_order_list':
            return { ...state, orderList: [] };
        case 'is_loading':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}

const getOrderListFn = (dispatch) => {
    return async (nextOffset, isRefresh) => {
        try {
            dispatch({ type: 'is_loading', payload: true });
            const response = await productApi.get(`/v2/user/order/?offset=${nextOffset}`);
            console.log("getOrderListFn", response.data.result);
            if (isRefresh) {
                dispatch({ type: 'clear_order_list' });
            }
            if (response.data.result.orders) {
                dispatch({ type: 'order_list', payload: response.data.result.orders });
            }
            dispatch({ type: 'next_offset', payload: response.data.result.offset });
            dispatch({ type: 'is_loading', payload: false });
            // dispatch({ type: 'order_list', payload: response.data.result.orders });
        } catch (err) {
            console.log(err);
        }
    }
} 

const getOrderDetailFn = (dispatch) => {
    return async (orderId) => {
        
        try {
            console.log("orderID", orderId);    
            const response = await productApi.get(`/v2/user/order/${orderId}`);
            console.log(response.data);

            dispatch({ type: 'shipping_address', payload: response.data.result.shipping_address });
            dispatch({ type: 'order_items', payload: response.data.result.order_items });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

const clearOrderDetailFn = (dispatch) => {
    return () => {
        dispatch({ type: 'shipping_address', payload: {} });
        dispatch({ type: 'order_items', payload: [] });
    }
}


const cancelOrderFn = (dispatch) => {
    return async ({reason, orderLineId, orderId}) => {
        // console.log("from cancelOrderFn", "Reason::", reason, "orderLineId::", orderLineId, "orderId::", orderId);
        // return
        try {
            const body = {
                order_line: [
                    {
                        order_line_id: orderLineId,
                        reason: reason
                    }
                ],
                order_id: orderId
            };

            const response = await productApi.post(`/v2/user/order/${orderId}/cancel`, body);
            console.log("from cancelOrderFn",response.data);
            // dispatch({type: 'order_items', })
        }
        catch (err) {
            console.log(err);
            throw err;
    
        }
    }
}




export const { Provider, Context } = createDataContext(
    orderReducer,
    { 
        getOrderListFn, getOrderDetailFn, clearOrderDetailFn,
        cancelOrderFn,
    },
    { 
        orderList: [],
        nextOffset: 0,
        orderDetail: "",
        orderItems: [],
        isLoading: false,
    }
); 