import {FlatList, StyleSheet, Text, View} from "react-native";
import EventsPreviewCard from "./EventsPreviewCard";

function EventPreviewList({title, list}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={list}
                      keyExtractor={(event) => event.id} renderItem={(itemData) =>
                <EventsPreviewCard id={itemData.item.id} image={itemData.item.image} title={itemData.item.title}
                                   date={itemData.item.date.day}
                                   location={itemData.item.location}/>
            }/>
        </View>
    )
}

export default EventPreviewList;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginTop: 16
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        marginHorizontal: 8
    }
})