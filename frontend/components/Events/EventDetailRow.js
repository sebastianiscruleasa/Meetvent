import {Image, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import colors from "../../constants/colors";

function EventDetailRow({image, color, iconColor,  icon, title, details}) {
    return(
        <View style={styles.container}>
            <View style={color ? [styles.imageContainer, {backgroundColor: color}] : styles.imageContainer}>
                {image &&
                    <Image style={styles.image} source={{uri:image}}/>}
                {icon && <Ionicons name={icon} color={iconColor ? iconColor : colors.primary500} size={24} />}
            </View>
            <View style={styles.textDetails}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.details}>{details}</Text>
            </View>
        </View>
    )
}

export default EventDetailRow;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 24
    },
    imageContainer:{
        marginRight: 16,
        height:50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(140, 62, 241, 0.3)',
        borderRadius: 16
    },
    image: {
        width:"100%",
        height:"100%",
        borderRadius: 16
    },
    textDetails: {
        justifyContent: "space-evenly"
    },
    title:{
        fontWeight: "bold"
    },
    details: {
        color: colors.grey800
    }
})
