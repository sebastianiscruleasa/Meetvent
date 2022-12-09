import {FlatList, StyleSheet} from "react-native";
import EventsPreviewCard from "../components/Events/EventsPreviewCard";

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
        <FlatList horizontal={true} data={DUMMY_EVENTS} keyExtractor={(event) => event.id} renderItem={(itemData) =>
            <EventsPreviewCard id={itemData.item.id} image={itemData.item.image} title={itemData.item.title}
                               date={itemData.item.date.day}
                               location={itemData.item.location}/>
        }/>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})