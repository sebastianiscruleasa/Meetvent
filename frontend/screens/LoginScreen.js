import {Alert, Image, StyleSheet, Text, View} from "react-native";
import ButtonOutlined from "../components/ui/ButtonOutlined";
import colors from "../constants/colors";
import LoginForm from "../components/Auth/LoginForm";
import {useContext, useState} from "react";
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {InterestsContext} from "../store/interests-context";

function LoginScreen({navigation}) {
    function switchToRegisterHandler() {
        navigation.replace("Register");
    }

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);
    const interestsCtx = useContext(InterestsContext);

    async function loginHandler({email, password}) {
        setIsAuthenticating(true);
        const response = await fetch("http://localhost:8080/auth/signin", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            Alert.alert(
                "Authentication failed!",
                "Could not log you in. Please check your credentials or try again later!"
            );
            setIsAuthenticating(false);
        } else {
            const data = await response.json();
            interestsCtx.setUsersInterests(data.userInterestCounters);
            authCtx.authenticate(data);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..."/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("./../assets/logo.png")}/>
            </View>
            <View>
                <LoginForm onAuthenticate={loginHandler}/>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomTextContainer}>
                    <View style={styles.line}/>
                    <View>
                        <Text style={styles.bottomText}>Don't have an account?</Text>
                    </View>
                    <View style={styles.line}/>
                </View>
                <View style={styles.loginButtonContainer}>
                    <ButtonOutlined onPress={switchToRegisterHandler}>
                        REGISTER
                    </ButtonOutlined>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        justifyContent: "space-evenly",
        paddingHorizontal: 24,
    },
    logoContainer: {
        marginTop: 36,
        justifyContent: "center",
    },
    logo: {
        alignSelf: "center",
        width: 200,
        height: 80,
    },
    bottomContainer: {
        marginBottom: 36,
    },
    bottomTextContainer: {
        marginVertical: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.primary600,
    },
    bottomText: {
        width: 180,
        color: colors.primary600,
        textAlign: "center",
    },
    loginButtonContainer: {
        width: 120,
        alignSelf: "center",
    },
});
