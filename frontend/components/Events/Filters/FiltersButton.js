import {Pressable, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import colors from "../../../constants/colors";

function FiltersButton({onPress}) {
    return (
        <Pressable
            style={({pressed}) =>
                pressed
                    ? [styles.container, styles.pressed]
                    : [styles.container]
            }
            onPress={onPress}
        >
            <Ionicons name="filter" color="white" size={20}/>
        </Pressable>
    )
}

export default FiltersButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary600,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 20
    },
    pressed: {
        opacity: 0.75,
    },
})