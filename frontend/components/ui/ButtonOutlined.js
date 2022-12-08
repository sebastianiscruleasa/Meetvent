import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import colors from "../../constants/colors";

function ButtonOutlined({iconSize, icon ,children, onPress}) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed && styles.pressed
                }
                onPress={onPress} >
                <View style={styles.buttonInnerContainer}>
                    <Ionicons name={icon} size={iconSize ? iconSize : 18} color="#8C3EF1"/>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default ButtonOutlined;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 16,
        margin: 4,
        borderColor: colors.primary600,
        borderWidth: 1
    },
    buttonInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: colors.primary500,
        marginLeft: 4
    },
    pressed: {
        opacity: 0.5,
    },
})