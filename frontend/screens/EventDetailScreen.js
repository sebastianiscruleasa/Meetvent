import {Alert, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import EventDetailRow from "../components/Events/EventDetailRow";
import colors from "../constants/colors";
import ButtonContainedLarge from "../components/ui/ButtonContainedLarge";
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {useCallback, useContext, useEffect, useState} from "react";
import {InterestsContext} from "../store/interests-context";

function EventDetailScreen({route}) {
    const eventId = route.params.eventId;

    const [isLoading, setIsLoading] = useState(false);
    const [event, setEvent] = useState({});

    const authCtx = useContext(AuthContext);

    const fetchEvent = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/events/${eventId}`, {
            headers: {
                "Authorization": `Bearer ${authCtx.token}`
            },
        })
        if (!response.ok) {
            Alert.alert(
                'Something went wrong!',
                'Please try again later!'
            );
        } else {
            const data = await response.json();
            const address = `${data.address.street}, ${data.address.city}`;
            setEvent({...data, "address": address});
        }
        setIsLoading(false);
    }, [eventId])

    useEffect(() => {
        fetchEvent();
    }, [fetchEvent])

    const interestsCtx = useContext(InterestsContext);
    async function goingHandler() {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/events/${eventId}/join`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authCtx.token}`
            },
        })
        if (!response.ok) {
            Alert.alert('Something went wrong!', 'Please try again later!');
            setIsLoading(false);
        } else {
            const data = await response.json();
            setEvent((prevState) => {
                return {...prevState, ... {going: true}}
            })
            interestsCtx.setUsersInterests(data)
        }
        setIsLoading(false)
    }



    if (isLoading || !event) {
        return <LoadingOverlay/>;
    }

    const image = "https://media.resources.festicket.com/www/photos/3694-artwork.jpg"
    const organizer = {
        name: "Jurj Mihai8",
        photo: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
    }

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    let newDate = new Date(event.date);
    const updatedDate = newDate.toLocaleDateString("en-US", options)

    return (
        <View>
            <Image style={styles.image} source={{uri: image}}/>
            <Text style={styles.title}>{event.title}</Text>
            <ScrollView style={styles.container}>
                <EventDetailRow title={updatedDate} details={event.time} icon="calendar"/>
                <EventDetailRow title={event.location} details={event.address} icon="location"/>
                <EventDetailRow title={organizer.name} details="Organizer" image={organizer.photo}/>
                <Text style={styles.about}>About Event</Text>
                <Text style={styles.description}>{event.description}</Text>
            </ScrollView>
            <View style={styles.buttonContainer}>
                {!event.going &&
                <ButtonContainedLarge color={colors.primary500} icon="arrow-forward-circle-outline" iconSize={24}
                                      iconOnTheRight={true} onPress={goingHandler}>GOING</ButtonContainedLarge>
                }
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