import {View, Text, Pressable, StyleSheet} from 'react-native';
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";

function ButtonContainedLarge({icon, iconSize, iconOnTheRight, color, children, onPress}) {
    return (
        <Pressable
            style={({pressed}) =>
                pressed
                    ? [styles.buttonOuterContainer, styles.pressed]
                    : [styles.buttonOuterContainer]
            }
            onPress={onPress}
        >
            <View style={[styles.buttonInnerContainer, {backgroundColor: color ? color : colors.primary500}]}>
                {!iconOnTheRight && <Ionicons name={icon} size={iconSize ? iconSize : 24} color="white"/>}
                <Text style={[styles.buttonText, {marginHorizontal: icon ? 4 : 0}]}>{children}</Text>
                {iconOnTheRight && <Ionicons name={icon} size={iconSize ? iconSize : 24} color="white"/>}
            </View>
        </Pressable>
    );
}

export default ButtonContainedLarge;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 16,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary500,
        paddingVertical: 12,
        width: 280
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold",
        fontSize:18
    },
    pressed: {
        opacity: 0.75,
    },
});