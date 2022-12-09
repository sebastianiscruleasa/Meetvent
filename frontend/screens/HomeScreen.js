import {StyleSheet, View} from "react-native";
import EventPreviewList from "../components/Events/EventPreviewList";

const DUMMY_EVENTS = [
    {
        id: 1,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 2,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 3,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 4,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 5,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 6,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 7,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 8,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: {day: 10, month: "JUNE"},
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
]

function HomeScreen() {
    return (
        <View>
            <EventPreviewList title="Trending" list={DUMMY_EVENTS}/>
            <EventPreviewList title="Your Upcoming Events" list={DUMMY_EVENTS}/>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})