import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {Ionicons} from "@expo/vector-icons";
import colors from "../../constants/colors";
import {Avatar, Badge} from "@rneui/base";
import AvatarCardList from "./AvatarCardList";
import Colors from "../../constants/colors";

function EventsPreviewCard({id, imageUri, date, title, location, attendees}) {
    const navigation = useNavigation();

    function pressHandler() {
        navigation.navigate("EventDetailScreenHome", {
            eventId: id
        })
    }

    let newFormatDate = new Date(date);
    const optionsDay = {
        day: "numeric",
    };
    const day = newFormatDate.toLocaleDateString("en-US", optionsDay);

    const optionsMonth = {
        month: "short",
    };
    const month = newFormatDate.toLocaleDateString("en-US", optionsMonth).toUpperCase();

    return (
        <Pressable onPress={pressHandler} style={({pressed}) =>
            pressed
                ? [styles.container, styles.pressed]
                : [styles.container]
        }>
            <View style={styles.imageContainer}>
                <View style={styles.onImage}>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>{day}</Text>
                        <Text style={styles.dateText}>{month}</Text>
                    </View>
                    {/*{going === true &&*/}
                    {/*    (<Pressable style={styles.goingContainer}>*/}
                    {/*        <Ionicons name="checkmark-circle" color="#34b233" size={16} style={styles.favorite}/>*/}
                    {/*    </Pressable>)*/}
                    {/*}*/}
                </View>
                <Image style={styles.image} source={{uri: imageUri}}/>
            </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
                    <View style={styles.location}>
                        <Ionicons name="location" color={colors.grey800}/>
                        <Text style={styles.locationText}>{location}</Text>
                    </View>
                </View>
                <AvatarCardList attendees={attendees}/>
        </Pressable>
    )
}

export default EventsPreviewCard;

const styles = StyleSheet.create({
    container:{
        width:220,
        height:200,
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
        position: "absolute",
        zIndex: 1,
    },
    date:{
        backgroundColor: 'rgba(256, 256, 256, 0.85)',
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
    detailsContainer:{
        alignItems: "flex-start",
        width:"100%",
        marginLeft: 40,
        marginTop: 10,
        marginBottom: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    location: {
        marginTop: 3,
        flexDirection: "row",
        alignItems: "center"
    },
    locationText: {
        color: colors.grey800,
        marginLeft: 4
    },
    pressed: {
        opacity: 0.5
    },

    footerContainer: {
        flexDirection: "row",
        width: "100%"
    }
    // goingContainer:{
    //     alignItems: "center",
    //     justifyContent: "center",
    //     top: 8,
    //     left: 132,
    // },
    // favorite:{
    //     backgroundColor: 'rgba(256, 256, 256, 0.85)',
    //     borderRadius: 8,
    //     overflow:'hidden',
    //     padding:4
    // },
})