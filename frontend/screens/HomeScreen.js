import {Alert, StyleSheet, Text, View} from "react-native";
import EventPreviewList from "../components/Events/EventPreviewList";
import SearchHome from "../components/Search/SearchHome";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {InterestsContext} from "../store/interests-context";

function HomeScreen({navigation}) {
    const [searchedText, setSearchedText] = useState();
    const [searchedData, setSearchedData] = useState([]);

    const [events, setEvents] = useState([]);

    function searchHandler(searched) {
        setSearchedText(searched);
        if (!searched) {
            setSearchedData([])
        } else {
            const searchedTextLowerCase = searched.toLowerCase()
            const resultsList = events.filter(item => {
                const eventLowerCase = item.title.toLowerCase();
                if (eventLowerCase.match(searchedTextLowerCase)) return item;
            })
            setSearchedData(resultsList);
        }
    }

    useEffect(() => {
        navigation.addListener('transitionStart', (e) => {
            if (e.data.closing) {
                searchHandler("")
            }
        });
    }, [navigation]);

    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const interestsCtx = useContext(InterestsContext);

    const fetchEvents = useCallback(async () => {
        setIsLoading(true);
        if (interestsCtx.city) {
            const response = await fetch(`http://localhost:8080/events/city/${interestsCtx.city}`, {
                headers: {
                    "Authorization": `Bearer ${authCtx.token}`
                },
            })
            if (!response.ok) {
                Alert.alert('Something went wrong!', 'Please try again later!');
                setIsLoading(false);
            } else {
                const data = await response.json();
                setEvents(data);
                setIsLoading(false);
            }
        }
    }, [interestsCtx.city])

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents])

    if (isLoading || events.length === 0) {
        return (
            <View style={styles.outerContainer}>
                <SearchHome searchedText={searchedText} searchHandler={searchHandler} data={searchedData}/>
                {isLoading && <LoadingOverlay/>}
                {(events.length === 0 && !isLoading) &&
                    <Text style={styles.noEventsText}>No events found in {interestsCtx.city}!</Text>}
            </View>
        )
    }
    const newEvents = events.slice().reverse();
    return (
        <View style={styles.outerContainer}>
            <SearchHome searchedText={searchedText} searchHandler={searchHandler} data={searchedData}/>
            {searchedText && <View style={styles.searching}/>}
            <View style={styles.innerContainer}>
                <EventPreviewList title="Trending" list={newEvents}/>
                <EventPreviewList title="New Events" list={events}/>
            </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    }, innerContainer: {
        marginTop: 100
    }, searching: {
        backgroundColor: 'rgba(0,0,0,0.5)', position: "absolute", height: "100%", width: "100%", zIndex: 2
    },
    noEventsText: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 150,
        fontSize: 24,
    }
})