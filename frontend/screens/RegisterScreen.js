import {Alert, Image, StyleSheet, Text, View} from "react-native";
import RegisterForm from "../components/Auth/RegisterForm";
import colors from "../constants/colors";
import ButtonOutlined from "../components/ui/ButtonOutlined";
import { useState} from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function RegisterScreen({navigation}) {
    function switchToLoginHandler() {
        navigation.replace('Login')
    }

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function signupHandler({username, email, password}) {
        setIsAuthenticating(true);
        const response = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            Alert.alert(
                'Authentication failed',
                'Username/Email Address already in use!'
            );
            setIsAuthenticating(false);
        } else {
            await response.json();
            navigation.replace('Login')
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..."/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./../assets/logo.png')}/>
            </View>
            <View>
                <RegisterForm onAuthenticate={signupHandler}/>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomTextContainer}>
                    <View style={styles.line}/>
                    <View>
                        <Text style={styles.bottomText}>Already have an account?</Text>
                    </View>
                    <View style={styles.line}/>
                </View>
                <View style={styles.loginButtonContainer}>
                    <ButtonOutlined onPress={switchToLoginHandler}>LOGIN</ButtonOutlined>
                </View>
            </View>
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        justifyContent: "space-evenly",
        paddingHorizontal: 24,
    },
    logoContainer: {
        marginTop: 36,
        justifyContent: "center"
    },
    logo: {
        alignSelf: "center",
        width: 200,
        height: 80
    },
    bottomContainer: {
        marginBottom: 36
    },
    bottomTextContainer: {
        marginVertical: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.primary600
    },
    bottomText: {
        width: 180,
        color: colors.primary600,
        textAlign: 'center'
    },
    loginButtonContainer: {
        width: 120,
        alignSelf: "center"
    }

})