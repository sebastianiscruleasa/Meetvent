import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/colors";
import colors from "../../constants/colors";

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

function AdminEventCard({id, title, date, location, imageUri}) {

    const navigation = useNavigation();
    const handleNavigation = () => {
        navigation.navigate('AdminEventDetailScreen', {
            eventId: id
        });
    }

    let newDate = new Date(date);
    const updatedDate = newDate.toLocaleDateString("en-US", options)

    return (
        <Pressable style={({pressed}) =>
            pressed
                ? [styles.container, styles.pressed]
                : [styles.container]
        } onPress={handleNavigation}>
            <Image style={styles.image} source={{uri: imageUri}}/>
            <View style={styles.data}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
                <Text style={styles.date}>{updatedDate}</Text>
                <View style={styles.location}>
                    <Ionicons name="location" color={colors.grey800} size={15}/>
                    <Text style={styles.locationText}>{location}</Text>
                </View>
            </View>
            <View style={styles.icon}>
                <MaterialIcons name="navigate-next" size={24} color={Colors.primary600}/>
            </View>
        </Pressable>
    )
}

export default AdminEventCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 10,
        paddingTop: 10,
        borderColor: "gray",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: "8%"
    },
    data: {
        flex: 1,
        paddingLeft: 25
    },
    title: {
        fontSize: 15,
        color: Colors.primary600,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        color: colors.grey800
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
    locationText: {
        color: colors.grey800,
    },
    icon: {
      alignSelf: "center"
    },
    pressed: {
        opacity: 0.5
    }
})