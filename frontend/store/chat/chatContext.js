import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth-context";
import useWebSocket from "../../customHooks/useWebSocket";
import MessageActions from "../../constants/messageActions";
export const ChatContext = createContext({
    isClientConnected: undefined,
    stompClient: undefined,
})

function ChatContextProvider({children}) {
    const [isClientConnected, stompClient] = useWebSocket();

    const value = {
        isClientConnected: isClientConnected,
        stompClient: stompClient,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatContextProvider;