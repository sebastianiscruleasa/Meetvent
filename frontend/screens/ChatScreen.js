import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import colors from "../constants/colors";
import ChatCard from "../components/Profile/ChatCard";

function ChatScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [connections, setConnections] = useState(false);
    const authCtx = useContext(AuthContext);

    const fetchEvent = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/tinder/matches`, {
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
            console.log(data)
            setConnections(data)

        }
        setIsLoading(false);
    }, [])

    useEffect(() => {
        fetchEvent();
    }, [fetchEvent])

    if (isLoading) {
        return <LoadingOverlay/>;
    }

    return (
        <View style={styles.container}>
            {connections.length !== 0 &&
                <FlatList data={connections} keyExtractor={(connection) => connection.id} renderItem={(itemData) =>
                    <ChatCard email={itemData.item.email} username={itemData.item.username} image={itemData.item.imageUri}/>
                }/>}
            {connections.length === 0 &&
                <View style={styles.emptyContainer}>
                    <Text style={styles.title}>No connections found!</Text>
                </View>
            }
        </View>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary100,
        borderRadius: 20,
        padding: 8,
        margin: 8,
    },
    emptyContainer: {
        backgroundColor: "#FFFFFF",
        height: 66,
        width: 350,
        margin: 4,
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20
    }
})