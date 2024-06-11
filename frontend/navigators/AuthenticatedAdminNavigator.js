import {Stack} from "../constants/navigators";
import HomeScreen from "../screens/admin/HomeScreen";
import EventDetailScreen from "../screens/admin/EventDetailScreen";
import CreateEventScreen from "../screens/admin/CreateEventScreen";
import HeaderLogOutButton from "../components/Auth/HeaderLogOutButton";
import Colors from "../constants/colors";

function AuthenticatedAdminNavigator() {
    return(
        <Stack.Navigator screenOptions={{headerTitleStyle: {color:'black'}, headerTintColor: Colors.primary600}}>
            <Stack.Screen name="Event List" component={HomeScreen} options={{headerRight: HeaderLogOutButton}}/>
            <Stack.Screen name="AdminEventDetailScreen" component={EventDetailScreen} options={{title: "Event Details"}}/>
            <Stack.Screen name={"CreateEvent"} component={CreateEventScreen} options={{title: "Add Event"}}/>
        </Stack.Navigator>
    )
}

export default AuthenticatedAdminNavigator;