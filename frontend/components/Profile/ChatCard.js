import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import colors from "../../constants/colors";

const img = "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px";

function ChatCard({email, username}) {
    return (
        <Pressable style={({pressed}) =>
            pressed
                ? [styles.container, styles.pressed]
                : [styles.container]
        }>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: img}}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{username}</Text>
                <Text style={styles.date}>{email}</Text>
            </View>
        </Pressable>
    )
}

export default ChatCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 4
    },
    imageContainer: {
        width: 50,
        height: 50,
        margin: 8,
        borderRadius: 8,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    detailsContainer: {
        justifyContent: "space-evenly",
        marginVertical: 8,
        marginHorizontal: 4,
        flex: 1,
    },
    date: {
        color: colors.primary500
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    pressed: {
        opacity: 0.5
    }
})