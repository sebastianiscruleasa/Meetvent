import {Alert, StyleSheet, View} from "react-native";
import Input from "../ui/Input";
import ButtonContainedLarge from "../ui/ButtonContainedLarge";
import colors from "../../constants/colors";
import {useState} from "react";

function LoginForm({onAuthenticate}) {
  const [credentials, setCredentials] = useState({
    email: {
      value: '',
      isInvalid: false,
    },
    password: {
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
    const email = credentials.email.value.trim();
    const password = credentials.password.value.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;

    if (
        !emailIsValid ||
        !passwordIsValid
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentials((currentCredentials) => {
        return {
          email:{ value:currentCredentials.email.value , isInvalid: !emailIsValid},
          password:{ value:currentCredentials.password.value , isInvalid: !passwordIsValid},
        }
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
      <View style={styles.form}>
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
        <View style={styles.buttons}>
          <ButtonContainedLarge color={colors.primary500} icon="arrow-forward-circle-outline" iconSize={28}
                                iconOnTheRight={true} onPress={submitHandler}>LOGIN</ButtonContainedLarge>
        </View>
      </View>
  )
}

export default LoginForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 24,
    justifyContent: "center",
    alignSelf: "center",
  },
})