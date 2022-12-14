import {ScrollView, StyleSheet, TextInput, View} from "react-native";
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import ButtonContained from "../ui/ButtonContained";

import interests from "../../constants/interests";

function SearchHome() {
    return (
        <View>
            <View style={styles.container}/>
            <View style={styles.searchContainer}>
                <View style={styles.search}>
                    <Ionicons name="search" color="white" size={36}/>
                    <TextInput style={styles.input} selectionColor="white" placeholder="Search..."
                               placeholderTextColor="white"/>
                </View>
                <ButtonContained icon="filter" color={colors.primary600}>Filters</ButtonContained>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.filtersContainer}>
                {interests
                    .map((interest) => <ButtonContained key={interest.key}
                                                        color={interest.color}
                                                        icon={interest.icon}>{interest.name}</ButtonContained>)}
            </ScrollView>
        </View>
    )
}

export default SearchHome;

const styles = StyleSheet.create({
    container: {
        height: 90,
        width: "100%",
        position: "absolute",
        backgroundColor: colors.primary500,
        borderBottomEndRadius: 36,
        borderBottomStartRadius: 36,
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        paddingHorizontal: 16
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        marginLeft: 8,
        color: "white",
        fontSize: 24,
        borderLeftWidth: 2,
        borderColor: "white",
        paddingLeft: 8
    },
    filtersContainer: {
        marginTop: 8
    }
})