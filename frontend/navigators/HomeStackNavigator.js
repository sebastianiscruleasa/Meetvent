import HomeScreen from "../screens/HomeScreen";
import colors from "../constants/colors";
import LocationPicker from "../components/Location/LocationPicker";
import EventDetailScreen from "../screens/EventDetailScreen";
import { Stack } from "../constants/navigators";
import TabNavigator from "./TabNavigator";
import ChatScreen from "../screens/ChatScreen";
import ChatHeaderLeft from "../components/Chat/headerUi/ChatHeaderLeft";
import ChatHeaderTitle from "../components/Chat/headerUi/ChatHeaderTitle";
import ChatHeaderRight from "../components/Chat/headerUi/ChatHeaderRight";

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{
            headerShown: false
        }}/>
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
        <Stack.Screen
            name="EventDetailScreenHome"
            component={EventDetailScreen}
            options={{
                title: "Event Details",
            }}
        />
    </Stack.Navigator>
  );
}

// <Stack.Screen
//     name="Home"
//     component={HomeScreen}
//     options={{
//         headerStyle: {
//             backgroundColor: colors.primary500,
//         },
//         headerTitle: LocationPicker,
//         headerTintColor: "white",
//         headerShadowVisible: false,
//     }}
// />

export default HomeStackNavigator;
