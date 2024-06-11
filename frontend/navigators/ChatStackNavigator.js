import ContactList from "../screens/ContactList";
import ChatScreen from "../screens/ChatScreen";
import colors from "../constants/colors";
import ChatHeaderLeft from "../components/Chat/headerUi/ChatHeaderLeft";
import ChatHeaderTitle from "../components/Chat/headerUi/ChatHeaderTitle";
import ChatHeaderRight from "../components/Chat/headerUi/ChatHeaderRight";
import { Stack } from "../constants/navigators";
function ChatStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{
          title: "Contacts",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ navigation, route }) => {
          const routeParams = route.params ? route.params : null;
          return {
            headerTintColor: colors.primary500,
            headerLeft: (props) => (
              <ChatHeaderLeft
                navigation={navigation}
                contactId={routeParams?.user?._id}
                {...props}
              />
            ),
            headerTitle: () => <ChatHeaderTitle {...routeParams} />,
            headerRight: (props) => (
              <ChatHeaderRight {...props}></ChatHeaderRight>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

export default ChatStackNavigator;
