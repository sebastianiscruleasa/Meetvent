import {useCallback, useContext, useEffect, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import SockJs from "sockjs-client";
import MessageActions from "../constants/messageActions";
import {GiftedChat} from "react-native-gifted-chat";

let stompClient;
function useWebSocket() {

    const[isClientConnected, setIsClientConnected] = useState(false);

    useEffect(() => {
        const connect = () => {
            stompClient = Stomp.over(() => new SockJs('http://localhost:8080/ws'));
            stompClient.debug=()=>{};
            stompClient.onConnect = () => {
                setIsClientConnected(true);
            }
            stompClient.onDisconnect = () => {
                setIsClientConnected(false);
            }
            stompClient.activate();
        }
        connect();
        return () => {
            stompClient.deactivate();
        }
    }, [])

    return [isClientConnected, stompClient];
}

export default useWebSocket;