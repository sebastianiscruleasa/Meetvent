import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import {Badge} from "@rneui/base";

function FiltersButton({onPress, isActive, filtersNumber}) {
    const color = isActive ? "white" : Colors.primary500;
    const backgroundColor = isActive ? Colors.primary500 : "white";
    return (
        <View style={[styles.buttonOuterContainer, {backgroundColor: backgroundColor, borderColor: color}]}>
            {filtersNumber > 0 && <Badge
                status="error"
                value={filtersNumber}
                containerStyle={{ position: 'absolute', top: -2, right:-2, zIndex:1}}
            />}
            <Pressable onPress={onPress} style={({pressed}) =>
                pressed
                    ? [styles.buttonInnerContainer, styles.pressed]
                    : [styles.buttonInnerContainer]
            }>
                <Ionicons name="filter" color={color} size={24}/>
            </Pressable>
        </View>
    )
}

export default FiltersButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    buttonInnerContainer: {
        overflow: "hidden"
    },
    pressed: {
        opacity: 0.75,
    },
})