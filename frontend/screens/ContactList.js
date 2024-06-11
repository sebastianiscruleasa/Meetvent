import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/auth-context";
import ContactListItem from "../components/Chat/ChatList/ContactListItem";
import {ChatContext} from "../store/chat/chatContext";
import getUpdatedConversationList from "../util/chat/updateConversationList";
import {useFocusEffect} from "@react-navigation/native";
import {doRequest} from "../util/request";
import {authorizationHeader} from "../constants/requestObjects";

let renderNumber = 0;
function ContactList() {
    const [conversations, setConversations] = useState([]);

    const authCtx = useContext(AuthContext);
    const chatCtx = useContext(ChatContext);

    useFocusEffect(
        useCallback(() => {
           const fetchConversations = async ()=> {
               const data = await doRequest(`http://localhost:8080/tinder/conversations`, authorizationHeader(authCtx.token));
               setConversations(data);
           }
           fetchConversations().catch(error => console.log(error));
        }, [])
    );

    const handleNewMessage = (payload) => {
        const receivedMessage = JSON.parse(payload.body);
        if(receivedMessage) {
            setConversations(prevConversations => getUpdatedConversationList(prevConversations, receivedMessage, authCtx.userId));
        }
    }

    useFocusEffect(useCallback(() => {
        let subscription;
        if(chatCtx.isClientConnected) {
            subscription = chatCtx.stompClient.subscribe(`/user/${authCtx.userId}/private`, handleNewMessage, (e)=>console.log(e))
        }
        return () => subscription.unsubscribe();
    }, [chatCtx.isClientConnected]))

    // renderNumber = renderNumber + 1
    // console.log("Render number " + renderNumber);
    return (
        <View style={styles.container}>
            {conversations.length !== 0 && (
                <FlatList
                    data={conversations}
                    keyExtractor={({contact}) => contact._id}
                    renderItem={(itemData) => (
                        <ContactListItem {...itemData.item} />
                    )}
                />
            )}
            {conversations.length === 0 &&
                <View style={styles.emptyContainer}>
                    <Text style={styles.title}>No connections found!</Text>
                </View>
            }
        </View>
    );
}

export default ContactList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    emptyContainer: {
        backgroundColor: "#FFFFFF",
        height: 66,
        width: 350,
        margin: 4,
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
});
