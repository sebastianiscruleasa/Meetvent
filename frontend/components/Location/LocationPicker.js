import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {
    getCurrentPositionAsync,
    requestForegroundPermissionsAsync,
} from "expo-location";
import {useCallback, useContext, useEffect, useState} from "react";
import {getAddress} from "../../util/location";
import {InterestsContext} from "../../store/interests-context";

function LocationPicker() {
    const [currentLocation, setCurrentLocation] = useState();
    const interestsCtx = useContext(InterestsContext);

    async function verifyPermissions() {
        let {status} = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }
        return true;
    }

    const getLocationHandler = useCallback(async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        // const location = await getCurrentPositionAsync();
        // const address = await getAddress(location.coords.latitude, location.coords.longitude);
        const address = {
            city: "Cluj",
            country: "Romania"
        }
        interestsCtx.locateUser(address.city);
        const displayedAddress = `${address.city}, ${address.country}`;
        setCurrentLocation(displayedAddress);
    }, [])

    useEffect(() => {
        getLocationHandler().catch(console.error);
    }, [getLocationHandler])


    return (
        <View style={styles.container}>

            <View style={styles.currentLocation}>
                <Text style={styles.currentLocationText}>Current Location</Text>
                <Ionicons name="location-sharp" color="'rgba(256,256,256,0.7)'" size={16}/>
            </View>


            {!currentLocation && <ActivityIndicator size="small" color="white"/>}
            {currentLocation && <Text style={styles.location}>{currentLocation}</Text>}
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    currentLocation: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2
    },
    currentLocationText: {
        color: 'rgba(256,256,256,0.7)'
    },
    location: {
        color: "white",
        fontSize: 16,
    }
})