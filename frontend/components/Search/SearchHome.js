import {StyleSheet, TextInput, View} from "react-native";
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import ButtonContained from "../ui/ButtonContained";

function SearchHome() {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.search}>
                    <Ionicons name="search" color="white" size={36}/>
                    <TextInput style={styles.input} selectionColor="white" placeholder="Search..."
                               placeholderTextColor="white"/>
                </View>
                <ButtonContained icon="filter" color={colors.primary600}>Filters</ButtonContained>
            </View>
        </View>
    )
}

export default SearchHome;

const styles = StyleSheet.create({
    container: {},
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.primary500,
        paddingHorizontal:12,
        borderBottomEndRadius: 36,
        borderBottomStartRadius: 36,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
        marginHorizontal:8
    },
    input: {
        marginLeft: 8,
        color: "white",
        fontSize: 24,
        borderLeftWidth:2,
        borderColor: "white",
        paddingLeft:8
    }
})