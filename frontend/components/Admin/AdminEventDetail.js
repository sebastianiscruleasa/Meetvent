import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import EventDetailRow from "../Events/EventDetailRow";
import interests from "../../constants/interests";
import ButtonIconContained from "../ui/ButtonIconContained";
import { Feather, AntDesign } from '@expo/vector-icons';
import Colors from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

function AdminEventDetail({id, title, organizer, date, time, address, location, interestKey, imageUri}) {

    let newDate = new Date(date);
    const updatedDate = newDate.toLocaleDateString("en-US", options);
    const interest = interests.find(
        (interest) => interest.key === interestKey
    );
    const addressString = `${address.street}, ${address.city}`;
    const navigation = useNavigation();
    const handleNavigation = () => {
        return navigation.navigate("CreateEvent", {
            eventId: id
        })
    }

    return (
        <View>
            <Image style={styles.image} source={{uri: imageUri}}/>
            <Text style={styles.title}>{title}</Text>
            <ScrollView style={styles.container}>
                <EventDetailRow
                    title={updatedDate}
                    details={time}
                    icon="calendar"
                />
                <EventDetailRow
                    title={location}
                    details={addressString}
                    icon="location"
                />
                {organizer && (
                    <EventDetailRow
                        title={organizer.username}
                        details="Organizer"
                        image={organizer.imageUri}
                    />
                )}
                {interest && (
                    <EventDetailRow
                        title={interest.name}
                        details="Category"
                        icon={interest.icon}
                        color={interest.color}
                        iconColor="white"
                    />
                )}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <ButtonIconContained innerContainer={{width: 150}}
                                     textStyle={{fontSize: 16,marginRight: 10}}
                                     iconOnTheRight={true}
                                     title={"Edit"}
                                     onPress={handleNavigation}
                >
                    <Feather name="edit" size={20} color="white" />
                </ButtonIconContained>
                <ButtonIconContained innerContainer={{width: 150, backgroundColor: Colors.error700}} textStyle={{fontSize: 16,marginRight: 10}} iconOnTheRight={true} title={"Delete"}>
                    <AntDesign name="delete" size={20} color="white" />
                </ButtonIconContained>
            </View>
        </View>
    );
}

export default AdminEventDetail;

const styles = StyleSheet.create({
    container: {
        height: "45%",
    },
    image: {
        width: "100%",
        height: "30%",
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        margin: 16,
        fontSize: 32,
    },
    about: {
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 8,
        marginHorizontal: 24,
        fontSize: 16,
    },
    description: {
        marginVertical: 8,
        marginHorizontal: 24,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});