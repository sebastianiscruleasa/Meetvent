import colors from "../constants/colors";
import { Tab } from "../constants/navigators";
import { Ionicons } from "@expo/vector-icons";
import EventsStackNavigator from "./EventStackNavigator";
import ConnectScreen from "../screens/ConnectScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import LocationPicker from "../components/Location/LocationPicker";
import ContactList from "../screens/ContactList";
import TabBarIcon from "../components/Chat/tabBarUi/TabBarIcon";

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary500,
      }}
      id="BottomTabNavigator"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            headerStyle: {
                backgroundColor: colors.primary500,
            },
            headerTitle: LocationPicker,
            headerTintColor: "white",
            headerShadowVisible: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="ContactList"
        component={ContactList}
        options={{
            title: "Contacts",
            headerShadowVisible: false,
            tabBarIcon: ({ focused, color, size }) => (
                <TabBarIcon focused={focused} color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="EventsStack"
        component={EventsStackNavigator}
        options={{
          title: "Events",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="infinite" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
