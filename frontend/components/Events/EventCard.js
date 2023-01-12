import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import { useNavigation } from '@react-navigation/native';

import {Ionicons} from "@expo/vector-icons";
import colors from "../../constants/colors";

function EventCard({id, image, date, title, location}) {
    const navigation = useNavigation();

    function pressHandler() {
        navigation.navigate("EventDetailScreenEvents", {
            eventId: id
        })
    }

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    let newDate = new Date(date);
    const updatedDate = newDate.toLocaleDateString("en-US", options)

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
                <Text style={styles.date}>{updatedDate}</Text>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.location}>
                    <Ionicons name="location" color={colors.grey800}/>
                    <Text style={styles.locationText}>{location}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default EventCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16
    },
    imageContainer: {
        width: 100,
        height: 100,
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
    location: {
        flexDirection: "row",
        alignItems: "center"
    },
    locationText: {
        color: colors.grey800,
        marginLeft: 4
    },
    pressed: {
        opacity: 0.5
    }
})