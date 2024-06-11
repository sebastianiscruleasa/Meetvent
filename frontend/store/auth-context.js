import AsyncStorage from '@react-native-async-storage/async-storage';

import {createContext, useState} from "react";

export const AuthContext = createContext({
    token: '',
    userId: undefined,
    isAuthenticated: false,
    role: undefined,
    authenticate: (token) => {
    },
    logout: () => {
    }
})

function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState('');
    const [userId, setUserId] = useState(0);
    const [userRole, setUserRole] = useState('');
    function authenticate({token, id, role}) {
        setAuthToken(token);
        setUserId(id);
        setUserRole(role);
        AsyncStorage.setItem('token', token).catch(error => console.log(error));
        AsyncStorage.setItem('userId', `${id}`).catch(error => console.log(error));
        AsyncStorage.setItem('role', role).catch(error => console.log(error));
    }

    function logout() {
        setAuthToken(null);
        setUserId(null);
        setUserRole(null);
        AsyncStorage.removeItem('token').catch(error => console.log(error));
        AsyncStorage.removeItem('userId').catch(error => console.log(error));
        AsyncStorage.removeItem('role').catch(error => console.log(error));
    }

    const value = {
        token: authToken,
        userId: userId,
        isAuthenticated: !!authToken,
        role: userRole,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;