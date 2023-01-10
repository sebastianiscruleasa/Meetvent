import {StyleSheet, View} from "react-native";
import interests from "../../../constants/interests";
import colors from "../../../constants/colors";
import FiltersDropdownCard from "./FiltersDropdownCard";

function FiltersDropdown({activeFilters, onPressFilter}) {
    return (
        <View style={styles.container}>
            {interests
                .map((interest) => <FiltersDropdownCard key={interest.key} id={interest.key} interest={interest} active={activeFilters.includes(interest.key)} onPress={onPressFilter}/>

                )}

        </View>
    )
}

export default FiltersDropdown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary100,
        borderRadius: 20,
        padding: 8,
        margin: 8,
        position:"absolute",
        width: "100%",
        zIndex: 2
    }
})