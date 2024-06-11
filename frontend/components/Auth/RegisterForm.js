import {Alert, StyleSheet, View} from "react-native";
import Input from "../ui/Input";
import {useState} from "react";
import colors from "../../constants/colors";
import ButtonContainedLarge from "../ui/ButtonContainedLarge";

function RegisterForm({onAuthenticate}) {
    const [credentials, setCredentials] = useState({
        username: {
            value: '',
            isInvalid: false,
        },
        email: {
            value: '',
            isInvalid: false,
        },
        password: {
            value: '',
            isInvalid: false,
        },
        confirmPassword: {
            value: '',
            isInvalid: false,
        },
    });

    function credentialChangedHandler(credentialIdentifier, enteredValue) {
        setCredentials((currentCredentials) => {
            return {
                ...currentCredentials,
                [credentialIdentifier]: { value: enteredValue, isInvalid: false, },
            };
        });
    }

    function submitHandler() {
        const username = credentials.username.value.trim();
        const email = credentials.email.value.trim();
        const password = credentials.password.value.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const passwordsAreEqual = password === credentials.confirmPassword.value;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            !passwordsAreEqual
        ) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentials((currentCredentials) => {
                return {
                    username:{ value:currentCredentials.username.value , isInvalid: false},
                    email:{ value:currentCredentials.email.value , isInvalid: !emailIsValid},
                    password:{ value:currentCredentials.password.value , isInvalid: !passwordIsValid},
                    confirmPassword:{ value:currentCredentials.confirmPassword.value , isInvalid: !passwordIsValid || !passwordsAreEqual},
                }
            });
            return;
        }
        onAuthenticate({username, email, password });
    }

    return (
        <View style={styles.form}>
            <Input
                label="Username"
                icon="person-outline"
                onUpdateValue={credentialChangedHandler.bind(this, 'username')}
                value={credentials.username.value}
                isInvalid={credentials.username.isInvalid}
            />
            <Input
                label="Email Address"
                icon="mail-outline"
                onUpdateValue={credentialChangedHandler.bind(this, 'email')}
                value={credentials.email.value}
                keyboardType="email-address"
                isInvalid={credentials.email.isInvalid}
            />
            <Input
                label="Password"
                icon="lock-closed-outline"
                onUpdateValue={credentialChangedHandler.bind(this, 'password')}
                secure
                value={credentials.password.value}
                isInvalid={credentials.password.isInvalid}
            />
            <Input
                label="Confirm Password"
                icon="lock-closed-outline"
                onUpdateValue={credentialChangedHandler.bind(
                    this,
                    'confirmPassword'
                )}
                secure
                value={credentials.confirmPassword.value}
                isInvalid={credentials.confirmPassword.isInvalid}
            />
            <View style={styles.buttons}>
                <ButtonContainedLarge color={colors.primary500} icon="arrow-forward-circle-outline" iconSize={28}
                                      iconOnTheRight={true} onPress={submitHandler}>REGISTER</ButtonContainedLarge>
            </View>
        </View>
    )
}

export default RegisterForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 24,
        justifyContent: "center",
        alignSelf: "center",
    },
})