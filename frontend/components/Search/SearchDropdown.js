import {FlatList, StyleSheet, Text, View} from "react-native";
import SearchDropdownCard from "./SearchDropdownCard";
import colors from "../../constants/colors";

function SearchDropdown({data, onNavigateHandler}) {
    return (
        <View style={styles.container}>
            {data.length !== 0 &&
                <FlatList data={data} keyExtractor={(event) => event.id} renderItem={(itemData) =>
                    <SearchDropdownCard {...itemData.item} onPressHandler={onNavigateHandler}/>
                }/>}
            {data.length === 0 &&
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No result found!</Text>
                </View>
            }
        </View>
    )
}

export default SearchDropdown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary100,
        borderRadius: 20,
        padding: 8,
        margin: 8,
    },
    emptyContainer: {
        backgroundColor: "#FFFFFF",
        height: 60,
        width: 350,
        margin: 4,
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    emptyTitle: {
        fontWeight: "bold",
        fontSize: 20
    }
})