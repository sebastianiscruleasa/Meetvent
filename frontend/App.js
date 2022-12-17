import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from "./screens/HomeScreen";
import EventsScreen from "./screens/EventsScreen";
import ConnectScreen from "./screens/ConnectScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EventDetailScreen from "./screens/EventDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import colors from "./constants/colors";

function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerStyle: {
                    backgroundColor: colors.primary500,
            },
                headerTintColor: "white",
                headerShadowVisible: false
            }}/>
            <Stack.Screen name="EventDetailScreenHome" component={EventDetailScreen} />
        </Stack.Navigator>
    )
}

function EventsStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Events" component={EventsScreen}/>
            <Stack.Screen name="EventDetailScreenEvents" component={EventDetailScreen} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.primary500
                }}
            >
                <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size}/>
                    ),
                }}/>
                <Tab.Screen name="EventsStack" component={EventsStackNavigator} options={{
                    title: "Events",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="calendar" color={color} size={size}/>
                    ),
                }}/>
                <Tab.Screen name="Connect" component={ConnectScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="infinite" color={color} size={size}/>
                    ),
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person" color={color} size={size}/>
                    ),
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
