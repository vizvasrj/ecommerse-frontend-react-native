import createDataContext from "./../createDataContext";
import logisticsApi from "../../api/logistics";
const logisticsReducer = (state, action) => {
    switch (action.type) {
        case 'logistics_me':
            return { ...state, me: action.payload };

        case 'availability_status':
            return { ...state, availabilityStatus: action.payload };


        default:
            return state;
    }
}

const getLogisticsMeFn = (dispatch) => {
    return async () => {
        try {
            const response = await logisticsApi.get('/logistics_user/me');
            console.log(response.data)
            dispatch({ type: 'logistics_me', payload: response.data.result.logistics_user });
        } catch (err) {
            console.log(err);
        }
    }
}

const setLogisticsMeFn = (dispatch) => {
    return async (me) => {
        console.log("setLogisticsMeFn", me)
        dispatch({ type: 'logistics_me', payload: me });
    }
}

const getLogisticsAvailabilityStatusFn = (dispatch) => {
    return async () => {
        try {
            const response = await logisticsApi.get('/availability_status');
            console.log(response.data)
            dispatch({ type: 'availability_status', payload: response.data.result.availability_status });
        } catch (err) {
            console.log(err);
        }
    }
    
}

export const { Provider, Context } = createDataContext(
    logisticsReducer,
    { 
        getLogisticsMeFn,
        setLogisticsMeFn,
        getLogisticsAvailabilityStatusFn,
    },
    { 
        me: null,
        availabilityStatus: [],
    }
);