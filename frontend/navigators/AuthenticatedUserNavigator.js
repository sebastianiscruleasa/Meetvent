import ChatContextProvider from "../store/chat/chatContext";
import TabNavigator from "./TabNavigator";
import HomeStackNavigator from "./HomeStackNavigator";

function AuthenticatedUserNavigator() {
  return (
    <ChatContextProvider>
      <HomeStackNavigator />
    </ChatContextProvider>
  );
}

export default AuthenticatedUserNavigator;
