import { StyleSheet, View } from "react-native";
import interests from "../../../constants/interests";
import colors from "../../../constants/colors";
import FiltersDropdownCard from "./FiltersDropdownCard";

function FiltersDropdown({ activeFilters, onPressFilter }) {
  return (
    <View style={styles.container}>
      {interests.map((interest) => (
        <FiltersDropdownCard
          key={interest.key}
          id={interest.key}
          interest={interest}
          active={activeFilters.includes(interest.key)}
          onPress={onPressFilter}
        />
      ))}
    </View>
  );
}

export default FiltersDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: colors.primary100,
    borderWidth: 2,
    marginHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
