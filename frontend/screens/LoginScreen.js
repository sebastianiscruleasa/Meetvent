import {Image, StyleSheet, Text, View} from "react-native";
import ButtonOutlined from "../components/ui/ButtonOutlined";
import colors from "../constants/colors";
import LoginForm from "../components/Auth/LoginForm";

function LoginScreen({navigation}) {
    function switchToRegisterHandler(){
        navigation.replace('Register')
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./../assets/logo.png')}/>
            </View>
            <View>
                <LoginForm/>
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
                    <ButtonOutlined onPress={switchToRegisterHandler}>REGISTER</ButtonOutlined>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        justifyContent: "space-evenly",
        paddingHorizontal:24,
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
    bottomContainer:{
        marginBottom:36
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