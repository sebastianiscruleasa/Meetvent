import {StyleSheet, Text, TextInput, View} from "react-native";
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";

function Input({label, icon, keyboardType, secure, onUpdateValue, value, isInvalid}) {
    const [inputBorderColor, setInputBorderColor] = useState(colors.grey800);

    function customOnFocus() {
        setInputBorderColor(colors.primary500);
    }

    function customOnBlur() {
        setInputBorderColor(colors.grey800);
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, {color:inputBorderColor}, isInvalid && styles.labelInvalid]}>{label}</Text>
            <View style={[styles.input, {borderColor: inputBorderColor}, isInvalid && styles.inputInvalid]}
                  onFocus={customOnFocus} onBlur={customOnBlur}>
                <Ionicons name={icon} size={24} color={isInvalid ? colors.error500 : inputBorderColor}/>
                <TextInput
                    style={{marginHorizontal: icon ? 8 : 0, flex: 1}}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType={keyboardType}
                    secureTextEntry={secure}
                    onChangeText={onUpdateValue}
                    value={value}
                />
            </View>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        marginBottom: 4,
        marginLeft: 8,
        fontWeight: "bold"
    },
    labelInvalid: {
        color: colors.error500,
        fontWeight: "bold"
    },
    input: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "white",
        borderRadius: 16,
        borderWidth: 1
    },
    inputInvalid: {
        borderWidth: 2,
        borderColor: colors.error500
    },
})