import {FlatList, StyleSheet, Text, View} from "react-native";
import SearchDropdownCard from "./SearchDropdownCard";
import colors from "../../constants/colors";

function SearchDropdown({data}) {
    if (data.length) {
        return (
            <View style={styles.container}>
            <FlatList data={data} keyExtractor={(event) => event.id} renderItem={(itemData) =>
                <SearchDropdownCard id={itemData.item.id} image={itemData.item.image} title={itemData.item.title}
                                    date={`${itemData.item.date.day} ${itemData.item.date.month}`}/>
            }/>
            </View>
        )
    } else {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.title}>No result found!</Text>
            </View>
        )
    }
}

export default SearchDropdown;

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.primary100,
        borderRadius:20,
        padding:8,
        margin:8,
    },
    emptyContainer: {
        backgroundColor: "#FFFFFF",
        height:66,
        width:358,
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 16,
        justifyContent:"center",
        alignItems:"center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20
    }
})