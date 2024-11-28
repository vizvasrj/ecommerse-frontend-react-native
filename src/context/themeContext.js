import createDataContext from "./createDataContext";
import { Appearance } from "react-native";

const themeReducer = (state, action) => {
    switch (action.type) {
        
        case 'change_theme':
            return { ...state, theme: action.payload };


        default:
            return state;
    }
}

const changeTheme = dispatch => async (theme) => {
    if (theme === 'dark' || theme === 'light') {
        await Appearance.set('colorScheme', theme);
        dispatch({ typex: 'change_theme', payload: theme });
        console.log("theme from changeTheme", theme);
    }
}



export const { Provider, Context } = createDataContext(
    themeReducer,
    { 
        changeTheme
    },
    { 
        theme: Appearance.getColorScheme()
    }
)