import {StyleSheet} from "react-native";
import EventCard from "../components/Events/EventCard";

const DUMMY_EVENTS =
    {
        id: 1,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    }


function EventsScreen() {
    return (
        <EventCard id={DUMMY_EVENTS.id} image={DUMMY_EVENTS.image} title={DUMMY_EVENTS.title} date={DUMMY_EVENTS.date} location={DUMMY_EVENTS.location}/>
    )
}

export default EventsScreen;

const styles = StyleSheet.create({})