import {Ionicons} from "@expo/vector-icons";
import {memo, useCallback, useContext, useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Badge} from "@rneui/base";
import {doRequest} from "../../../util/request";
import {authorizationHeader} from "../../../constants/requestObjects";
import {AuthContext} from "../../../store/auth-context";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {ChatContext} from "../../../store/chat/chatContext";

let request = false;
let renderNumber = 0;
function TabBarIcon({focused, size, color}) {
    const navigation = useNavigation();
    const [conversations, setConversations] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const stateRef = useRef({
        conversations: [],
        listenToMessage: true,
    });
    const authCtx = useContext(AuthContext);
    const chatCtx = useContext(ChatContext);

    stateRef.current.conversations = conversations;

    const handleMessage = (payload) => {
        if(stateRef.current.listenToMessage) {
            const receivedMessage = JSON.parse(payload.body);
            const conversations = stateRef.current.conversations;
            if(!conversations.includes(receivedMessage.user._id)) {
                setConversations(prevConversations => [...prevConversations, receivedMessage.user._id])
                setUnreadMessages(prevState => prevState + 1);
            }
        }
    }


    const fetchConversations =  useCallback(async () => {
        const data = await doRequest(`http://localhost:8080/tinder/conversations`, authorizationHeader(authCtx.token));
        const unreadMessages = await data.filter(conversation => {
            return (conversation.message && conversation.message.read === false && (parseInt(conversation.message?.senderId, 10)!==authCtx.userId))
        }).map((conversation) => parseInt(conversation.message?.senderId,10));
        setConversations(prevConversations => [...unreadMessages]);
        setUnreadMessages(unreadMessages.length);
    }, [])

    useEffect(() => {
        let subscription;
        if(focused === false) {
            if(chatCtx.isClientConnected) {
                subscription = chatCtx.stompClient.subscribe(`/user/${authCtx.userId}/private`, handleMessage, (e)=>console.log(e))
            }
            if(subscription) {
                return () => subscription.unsubscribe();
            }
        }
    }, [chatCtx.isClientConnected])

    useEffect(() => {
        if(focused === false) {
            fetchConversations().catch(error => console.log(error));
        }
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur',() => {
            if(focused === false) {
                stateRef.current.listenToMessage = true;
                fetchConversations().catch(error => console.log(error));
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus',() => {
            if(focused === false) {
                setUnreadMessages(0);
                stateRef.current.listenToMessage = false;
            }
        });
        return unsubscribe;
    }, [navigation]);

    // console.log(renderNumber = renderNumber + 1);

    const styleCondition = unreadMessages < 9;

    return(
        <View>
            {unreadMessages>0 && !focused && stateRef.current.listenToMessage && <Badge
                status="error"
                value={unreadMessages}
                badgeStyle={[styles.badgeDimensions, {width: styleCondition ? 10:17}]}
                textStyle={{marginLeft: styleCondition ? 0:-1}}
                containerStyle={{ position: 'absolute', top: -3, right:-4, zIndex:1}}
            />}
            <Ionicons name="chatbubble-ellipses" size={size} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    badgeDimensions: {
        height: 15
    },
})

export default memo(TabBarIcon);