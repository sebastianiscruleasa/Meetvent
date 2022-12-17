import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import EventDetailRow from "../components/Events/EventDetailRow";
import colors from "../constants/colors";
import ButtonContainedLarge from "../components/ui/ButtonContainedLarge";

const DUMMY_EVENTS = [
    {
        id: 1,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai1",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
    {
        id: 2,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai2",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
    {
        id: 3,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai3",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
    {
        id: 4,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai4",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
    {
        id: 5,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai5",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
    {
        id: 6,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai6",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
    {
        id: 7,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai7",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
    {
        id: 8,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "14 December 2023",
        time: "Sun, 12:15 PM - 14:30 PM",
        title: "International Gala Music Festival",
        location: "Gala Convention Center",
        address: "36 Guild Street London, UK",
        organizer: {
            name: "Jurj Mihai8",
            photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
        },
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia."
    },
]

function EventDetailScreen({route}) {
    const eventId = route.params.eventId;

    const event = DUMMY_EVENTS.find((event) => event.id === eventId);

    const {image, title, date, time, location, address, organizer, description} = event

    return (
        <View>
            <Image style={styles.image} source={{uri: image}}/>
            <Text style={styles.title}>{title}</Text>
            <ScrollView style={styles.container}>
                <EventDetailRow title={date} details={time} icon="calendar"/>
                <EventDetailRow title={location} details={address} icon="location"/>
                <EventDetailRow title={organizer.name} details="Organizer" image={organizer.photo}/>
                <Text style={styles.about}>About Event</Text>
                <Text style={styles.description}>{description}</Text>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <ButtonContainedLarge color={colors.primary500} icon="arrow-forward-circle-outline" iconSize={24}
                                 iconOnTheRight={true}>GOING</ButtonContainedLarge>
            </View>
        </View>
    )
}

export default EventDetailScreen;

const styles = StyleSheet.create({
    container: {
        height: "45%"
    },
    image: {
        width: "100%",
        height: "30%"
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        margin: 16,
        fontSize: 32
    },
    about: {
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 8,
        marginHorizontal: 24,
        fontSize: 16
    },
    description: {
        marginVertical: 8,
        marginHorizontal: 24,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    }
})