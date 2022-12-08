import {StyleSheet, Text, View} from "react-native";
import ButtonOutlined from "../ui/ButtonOutlined";
import ButtonContained from "../ui/ButtonContained";

import interests from "../../constants/interests";

const DUMMY_INTERESTS = ["Movies", "Football", "Art", "Concert", "Music", "Online Games"];

function Interests() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Interests</Text>
                <ButtonOutlined icon="grid-outline">Change</ButtonOutlined>
            </View>
            <View style={styles.interestsContainer}>
                {interests
                    .filter((interest) => DUMMY_INTERESTS.includes(interest.name))
                    .map((interest) => <ButtonContained key={interest.key}
                                                        color={interest.color}>{interest.name}</ButtonContained>)}
            </View>
        </View>
    )
}

export default Interests;

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    headerContainer: {
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