import * as encoding from "text-encoding";
import {NavigationContainer} from "@react-navigation/native";
import {useContext, useEffect, useState} from "react";
import AuthContextProvider, {AuthContext} from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import InterestsContextProvider from "./store/interests-context";
import AuthenticatedNavigator from "./navigators/AuthenticatedUserNavigator";
import AuthNavigator from "./navigators/AuthNavigator";
import Roles from "./constants/roles";
import AuthenticatedUserNavigator from "./navigators/AuthenticatedUserNavigator";
import AuthenticatedAdminNavigator from "./navigators/AuthenticatedAdminNavigator";

function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthNavigator/>}
            {authCtx.isAuthenticated && authCtx.role===Roles.USER && <AuthenticatedUserNavigator/>}
            {authCtx.isAuthenticated && authCtx.role===Roles.ADMIN && <AuthenticatedAdminNavigator/>}
        </NavigationContainer>
    );
}

function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchToken() {
            const storedToken = await AsyncStorage.getItem("token");
            const storedUserId = await AsyncStorage.getItem("userId");
            const storedRole = await AsyncStorage.getItem("role");
            const loginObject = {
                token: storedToken,
                id: parseInt(storedUserId, 10),
                role: storedRole
            }
            if (storedToken && storedUserId && storedRole) {
                authCtx.authenticate(loginObject);
            }

            setIsTryingLogin(false);
        }

        fetchToken().catch(error => console.log(error));
    }, []);

    if (isTryingLogin) {
        return <LoadingOverlay/>;
    }

    return <Navigation/>;
}

export default function App() {
    return (
        <AuthContextProvider>
            <InterestsContextProvider>
                <Root/>
            </InterestsContextProvider>
        </AuthContextProvider>
    );
}
