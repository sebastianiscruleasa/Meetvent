import {Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../store/auth-context";
import {doRequest} from "../../util/request";
import {authorizationHeader} from "../../constants/requestObjects";
import AdminEventDetail from "../../components/Admin/AdminEventDetail";

function EventDetailScreen({route}) {

    const [event, setEvent] = useState();
    const authCtx = useContext(AuthContext);
    const eventId = route.params.eventId;

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await doRequest(`http://localhost:8080/events/${eventId}`, authorizationHeader(authCtx.token));
            setEvent(data);
        }
        fetchEvent().catch(error => console.log(error));
    }, [eventId])

    return (
        <View>
            {event && <AdminEventDetail {...event}/>}
        </View>
    )
}

export default EventDetailScreen;