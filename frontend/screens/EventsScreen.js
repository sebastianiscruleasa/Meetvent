import {FlatList} from "react-native";
import EventCard from "../components/Events/EventCard";

const DUMMY_EVENTS = [
    {
        id: 1,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 2,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 3,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 4,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 5,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 6,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 7,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
    {
        id: 8,
        image: "https://media.resources.festicket.com/www/photos/3694-artwork.jpg",
        date: "Sun, Apr 25 - 10:15 AM",
        title: "International Gala Music Festival",
        location: "36 Guild Street London, UK"
    },
]


function EventsScreen() {
    return (
        <FlatList data={DUMMY_EVENTS} keyExtractor={(event) => event.id} renderItem={(itemData) =>
            <EventCard id={itemData.item.id} image={itemData.item.image} title={itemData.item.title}
                       date={itemData.item.date}
                       location={itemData.item.location}/>
        }/>
    )
}

export default EventsScreen;