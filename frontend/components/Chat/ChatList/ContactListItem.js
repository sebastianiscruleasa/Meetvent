import {StyleSheet, View, Text, Image, Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {Badge} from "@rneui/base";
import {useContext} from "react";
import {AuthContext} from "../../../store/auth-context";
import {useNavigation} from "@react-navigation/native";
function ContactListItem({contact, message}) {
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const newConnectionMessage = "You are now connected! 👋";
    const isLastMessageMine = authCtx?.userId === parseInt(message?.senderId)
    const isMessageUnread = (!isLastMessageMine && message && (message.read===false)) ? "bold" : "normal"
    const onNavigate = () => {
        navigation.navigate("ChatScreen" ,{
            user: contact
        });
    }

    return(
        <Pressable style={styles.container} onPress={onNavigate}>
            <Image style={styles.image} source={{ uri: contact.avatar }} />
            <View style={styles.content}>
                <View style={styles.firstRow}>
                    <Text style={[styles.title, {fontWeight: isMessageUnread}]} numberOfLines={1} ellipsizeMode="tail">{contact.name}</Text>
                    {/*{message && message.createdAt}*/}
                    <Text style={[styles.subTitle, {fontWeight: isMessageUnread}]}>Today</Text>
                </View>
                <View style={styles.secondRow}>
                    {isLastMessageMine && <Text style={[styles.subTitle, {fontWeight: isMessageUnread}]}>You: </Text>}
                    <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.subTitle, {fontWeight: isMessageUnread}]}>{message ? message.text : newConnectionMessage}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ContactListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "lightgray",
        height: 70,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: "50%",
        marginRight: 15
    },
    content: {
        flex: 1,
        marginTop: 5
    },
    firstRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    secondRow: {
        flexDirection: "row",
        marginTop: 5,
    },
    title: {
        fontSize: 16,
    },
    subTitle: {
        color: "gray",
    }
});
