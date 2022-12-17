import {Image, StyleSheet, Text, View} from "react-native";
import RegisterForm from "../components/Auth/RegisterForm";
import colors from "../constants/colors";
import ButtonOutlined from "../components/ui/ButtonOutlined";

function RegisterScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./../assets/logo.png')}/>
            </View>
            <View style={styles.form}>
                <RegisterForm/>
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
                    <ButtonOutlined>LOGIN</ButtonOutlined>
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
        paddingHorizontal:24,
    },
    logoContainer: {
        marginTop: 36,
        // height: "20%",
        justifyContent: "center"
    },
    logo: {
        alignSelf: "center",
        width: 200,
        height: 80
    },
    form: {
        // height: "50%",
        // paddingHorizontal: 24,
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