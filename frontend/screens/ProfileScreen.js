import {StyleSheet, View} from "react-native";
import Interests from "../components/ProfileScreen/Interests";

function ProfileScreen() {
    return (
        <View>
            <Interests/>
        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    }
})