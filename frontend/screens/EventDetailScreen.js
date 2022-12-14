import {StyleSheet, Text} from "react-native";

function EventDetailScreen({route}) {
    const eventId = route.params.eventId;

    return (
        <Text>{eventId}</Text>
    )
}

export default EventDetailScreen;

const styles = StyleSheet.create({

})