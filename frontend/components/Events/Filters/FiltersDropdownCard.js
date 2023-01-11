import ButtonContained from "../../ui/ButtonContained";
import ButtonOutlined from "../../ui/ButtonOutlined";
import {StyleSheet, View} from "react-native";

function FiltersDropdownCard({active, id, interest, onPress}) {
    return (
        <View style={styles.container}>
            {active &&
                <ButtonContained onPress={() => onPress(id)}
                                 color={interest.color}>{interest.name}</ButtonContained>
            }
            {!active &&
                <ButtonOutlined onPress={() => onPress(id)}
                                color={interest.color}>{interest.name}</ButtonOutlined>}
        </View>
    )

}

export default FiltersDropdownCard;

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: 150
    }
})