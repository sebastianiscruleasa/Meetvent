import AsyncStorage from '@react-native-async-storage/async-storage';

import {createContext, useState} from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    city: '',
    locateUser: (city) => {},
    authenticate: (token) => {
    },
    logout: () => {
    }
})

function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState('');
    const [city, setCity] = useState('');

    function locateUser(city) {
        setCity(city);
    }

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        city: city,
        locateUser: locateUser,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;