import {Alert, FlatList} from "react-native";
import EventCard from "../components/Events/EventCard";
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {useCallback, useContext, useEffect, useState} from "react";

function EventsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);

    const authCtx = useContext(AuthContext);

    const fetchEvents = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/events/city/${authCtx.city}`, {
                headers: {
                    "Authorization": `Bearer ${authCtx.token}`
                },
            })
            const data = await response.json();
            setEvents(data);
            setIsLoading(false);
        } catch (error) {
            Alert.alert(
                'Something went wrong!',
                'Please try again later!'
            );
            setIsLoading(false);
        }
    },[])

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents])

    if (isLoading) {
        return <LoadingOverlay/>;
    }

    return (
        <FlatList data={events} keyExtractor={(event) => event.id} renderItem={(itemData) =>
            <EventCard id={itemData.item.id} image={itemData.item.image} title={itemData.item.title}
                       date={itemData.item.date}
                       location={itemData.item.location}/>
        }/>
    )
}

export default EventsScreen;