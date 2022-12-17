import {Image, StyleSheet, Text, View} from "react-native";
import RegisterForm from "../components/Auth/RegisterForm";

function RegisterScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./../assets/logo.png')}/>
            </View>
            <View style={styles.form}>
                <Text style={styles.title}>Register</Text>
                <RegisterForm/>
            </View>
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    logoContainer: {
        marginTop:36,
        height: "20%",
        justifyContent: "center"
    },
    logo: {
        alignSelf: "center",
        width: 200,
        height: 80
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16
    },
    form: {
        height: "80%",
        paddingHorizontal: 24,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
    }
})