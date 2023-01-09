import {Alert, StyleSheet, Text, View} from "react-native";
import EventPreviewList from "../components/Events/EventPreviewList";
import SearchHome from "../components/Search/SearchHome";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function HomeScreen({navigation}) {
    const [searchedText, setSearchedText] = useState();
    const [searchedData, setSearchedData] = useState([]);

    function searchHandler(searched) {
        setSearchedText(searched);
        if (!searched) {
            setSearchedData([])
        } else {
            const searchedTextLowerCase = searched.toLowerCase()
            const resultsList = events.filter(item => {
                const eventLowerCase = item.title.toLowerCase();
                if (eventLowerCase.match(searchedTextLowerCase))
                    return item;
            })
            setSearchedData(resultsList);
        }
    }

    useEffect(() => {
        navigation.addListener('transitionStart', (e) => {
            if(e.data.closing) {
                searchHandler("")
            }
        });
    }, [navigation]);

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

    if(events.length === 0){
        return <Text style={styles.noEventsText}>No events found in {authCtx.city}!</Text>;
    }


    return (
        <View style={styles.outerContainer}>
            <SearchHome searchedText={searchedText} searchHandler={searchHandler} data={searchedData}/>
            {searchedText && <View style={styles.searching}/>}
            <View style={styles.innerContainer}>
                <EventPreviewList title="Trending" list={events}/>
                <EventPreviewList title="Your Upcoming Events" list={events}/>
            </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
    innerContainer: {
        marginTop: 100
    },
    searching: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 2
    }
})