import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import { useNavigation } from '@react-navigation/native';
import colors from "../../constants/colors";

function SearchDropdownCard({id, image, date, title}) {
    const navigation = useNavigation();

    function pressHandler() {
        navigation.navigate("EventDetailScreenHome", {
            eventId: id
        })
    }

    return (
        <Pressable onPress={pressHandler} style={({pressed}) =>
            pressed
                ? [styles.container, styles.pressed]
                : [styles.container]
        }>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image}}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </Pressable>
    )
}

export default SearchDropdownCard;

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