import { View, Text, Pressable, StyleSheet } from 'react-native';
import colors from "../../constants/colors";

function ButtonContained({ children, onPress }) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer
                }
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{children}</Text>
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