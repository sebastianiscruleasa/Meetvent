import {StyleSheet, Text, View} from "react-native";
import ButtonContained from "../ui/ButtonContained";

import interests from "../../constants/interests";

function Interests({list}) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Interests</Text>
            </View>
            <View style={styles.interestsContainer}>
                {interests
                    .filter((interest) => list.includes(interest.key))
                    .map((interest) => <ButtonContained key={interest.key} icon={interest.icon}
                                                        color={interest.color}>{interest.name}</ButtonContained>)}
            </View>
        </View>
    )
}

export default Interests;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        marginHorizontal: 24,
    },
    headerContainer: {
        marginBottom: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 18
    },
    interestsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    }
})