import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Interests from "../components/Profile/Interests";
import ButtonOutlined from "../components/ui/ButtonOutlined";
import colors from "../constants/colors";
import ButtonContainedLarge from "../components/ui/ButtonContainedLarge";
import {useContext} from "react";
import {AuthContext} from "../store/auth-context";

const DUMMY_PROFILE = {
    image: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px",
    name: "Marco Reus",
    about: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
    interests: ["Movies", "Football", "Art", "Concert", "Music", "Online Games"]
}

function ProfileScreen() {
    const {image, name, about, interests} = DUMMY_PROFILE;

    const authCtx = useContext(AuthContext);

    return (
        <ScrollView>
            <View style={styles.detailsContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                           source={{uri: image}}/>
                </View>
                <Text style={styles.name}>{name}</Text>
                <ButtonOutlined icon="create-outline">Edit Profile</ButtonOutlined>
            </View>
            <View style={styles.aboutContainer}>
                <View style={styles.aboutHeaderContainer}>
                    <Text style={styles.aboutHeaderText}>ABOUT</Text>
                </View>
                <Text>{about}</Text>
            </View>
            <Interests list={interests}/>
            <View style={styles.buttons}>
                <ButtonContainedLarge color={colors.error500} icon="exit" iconSize={28}
                                      iconOnTheRight={true} onPress={authCtx.logout}>LOGOUT</ButtonContainedLarge>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    detailsContainer: {
        alignItems: "center",
        marginVertical: 16
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    name: {
        fontWeight: "bold",
        fontSize: 22,
        margin: 16
    },
    aboutContainer: {
        marginBottom: 16,
        marginHorizontal: 24,
    },
    aboutHeaderContainer: {
        alignSelf: "center",
        borderBottomWidth: 2,
        borderColor: colors.primary600,
        marginBottom: 16
    },
    aboutHeaderText: {
        textAlign: "center",
        color: colors.primary500,
        fontWeight: "bold",
        fontSize: 14,
        paddingBottom: 2
    },
    buttons: {
        justifyContent: "center",
        alignSelf: "center",
    },
})