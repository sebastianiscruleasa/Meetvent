import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {Ionicons} from "@expo/vector-icons";
import colors from "../../constants/colors";

function EventsPreviewCard({id, image, date, title, location}) {
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
                <View style={styles.onImage}>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>{date}</Text>
                        <Text style={styles.dateText}>JUNE</Text>
                    </View>
                    <Pressable style={styles.favoriteContainer}>
                        <Ionicons name="bookmark" color="red" size={16} style={styles.favorite}/>
                    </Pressable>
                </View>
                <Image style={styles.image} source={{uri: image}}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
                <View style={styles.location}>
                    <Ionicons name="location" color={colors.grey800}/>
                    <Text style={styles.locationText}>{location}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default EventsPreviewCard;

const styles = StyleSheet.create({
    container:{
        width:220,
        height:180,
        backgroundColor: "white",
        marginVertical: 12,
        marginHorizontal: 8,
        borderRadius: 8,
        alignItems: "center"
    },
    imageContainer:{
        width: 200,
        height:100,
        marginTop: 10,
        borderRadius: 8,
        overflow: "hidden",
    },
    image:{
        width: "100%",
        height: "100%",
    },
    onImage:{
        flexDirection: "row",
        position: "absolute",
        zIndex: 1,
    },
    date:{
        backgroundColor: 'rgba(256, 256, 256, 0.7)',
        borderRadius: 8,
        alignItems: "center",
        padding:2,
        top: 8,
        left: 8
    },
    dateText:{
        color: "red",
        fontWeight: "bold",
        fontSize: 12,
    },
    favoriteContainer:{
        alignItems: "center",
        justifyContent: "center",
        top: 8,
        left: 132,
    },
    favorite:{
        backgroundColor: 'rgba(256, 256, 256, 0.7)',
        borderRadius: 8,
        overflow:'hidden',
        padding:4
    },
    detailsContainer:{
        justifyContent: "space-between",
        marginVertical: 12,
        marginHorizontal: 4,
        flex: 1
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