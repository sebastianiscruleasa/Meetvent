import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import colors from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";

function ChatCard({user}) {
    const navigation = useNavigation();
    const onNavigate = () => {
        navigation.navigate("ChatScreen" ,{
            user: user
        });
    }

    return (
        <Pressable style={({pressed}) =>
            pressed
                ? [styles.container, styles.pressed]
                : [styles.container]
        } onPress={onNavigate}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: user.avatar}}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{user.name}</Text>
                <Text style={styles.date}>{user.email}</Text>
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
        borderRadius: "50%",
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