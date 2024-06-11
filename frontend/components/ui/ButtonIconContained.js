import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from "../../constants/colors";

function ButtonIconContained({ children, title, onPress, outerContainer, innerContainer, textStyle, iconOnTheRight}) {
    return (
        <Pressable
            style={({pressed}) =>
                pressed
                    ? [styles.buttonOuterContainer, outerContainer, styles.pressed]
                    : [styles.buttonOuterContainer, outerContainer]
            }
            onPress={onPress}
        >
            <View style={[styles.buttonInnerContainer, innerContainer]}>
                {!iconOnTheRight && children}
                <Text style={[styles.text, textStyle]}>{title}</Text>
                {iconOnTheRight && children}
            </View>
        </Pressable>
    );
}

export default ButtonIconContained;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 16,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary600,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
});