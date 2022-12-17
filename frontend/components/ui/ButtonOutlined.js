import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import colors from "../../constants/colors";

function ButtonOutlined({iconSize, iconOnTheRight, color, icon, children, onPress}) {
    return (
        <Pressable
            style={({pressed}) =>
                pressed
                    ? [styles.buttonOuterContainer, {borderColor: color ? color : colors.primary600}, styles.pressed]
                    : [styles.buttonOuterContainer, {borderColor: color ? color : colors.primary600}]
            }
            onPress={onPress}>
            <View style={styles.buttonInnerContainer}>
                { !iconOnTheRight && <Ionicons name={icon} size={iconSize ? iconSize : 18} color={color ? color : colors.primary500}/>}
                <Text style={[styles.buttonText, {marginHorizontal: icon ? 8 : 0, color:color ? color : colors.primary500}]}>{children}</Text>
                { iconOnTheRight && <Ionicons name={icon} size={iconSize ? iconSize : 18} color={color ? color : colors.primary500}/>}
            </View>
        </Pressable>
    )
}

export default ButtonOutlined;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 16,
        margin: 4,
        borderWidth: 1
    },
    buttonInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    buttonText: {
        color: colors.primary500,
    },
    pressed: {
        opacity: 0.5,
    },
})