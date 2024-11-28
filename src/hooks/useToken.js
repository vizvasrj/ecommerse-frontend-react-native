import { useContext } from 'react';
import { Context as AuthContext } from "../context/authContext";

export default function useToken() {
    const { state } = useContext(AuthContext);
    return state.token;
}