import {StyleSheet, Text, View} from "react-native";
import ButtonOutlined from "../ui/ButtonOutlined";
import ButtonContained from "../ui/ButtonContained";

import interests from "../../constants/interests";

function Interests({list}) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Interests</Text>
                <ButtonOutlined icon="grid-outline">Change</ButtonOutlined>
            </View>
            <View style={styles.interestsContainer}>
                {interests
                    .filter((interest) => list.includes(interest.name))
                    .map((interest) => <ButtonContained key={interest.key}
                                                        color={interest.color}>{interest.name}</ButtonContained>)}
            </View>
        </View>
    )
}

export default Interests;

const styles = StyleSheet.create({
    container: {
        margin: 24,
    },
    headerContainer: {
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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