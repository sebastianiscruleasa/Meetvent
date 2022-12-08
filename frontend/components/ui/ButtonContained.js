import {View, Text, Pressable, StyleSheet} from 'react-native';
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";

function ButtonContained({icon, iconSize, color, children, onPress}) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({pressed}) =>
                    pressed && styles.pressed
                }
                onPress={onPress}
            >
                <View style={[styles.buttonInnerContainer, {backgroundColor: color ? color : colors.primary500}]}>
                    <Ionicons name={icon} size={iconSize ? iconSize : 18} color="white"/>
                    <Text style={[styles.buttonText, {marginLeft: icon ? 4 : 0}]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default ButtonContained;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 16,
        margin: 5,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
});