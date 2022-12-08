import {StyleSheet} from 'react-native';

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

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#8C3EF1'
                }}
            >
                <Tab.Screen name="Stack" component={StackNavigator} options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size}/>
                    ),
                }}/>
                <Tab.Screen name="Events" component={EventsScreen} options={{
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
