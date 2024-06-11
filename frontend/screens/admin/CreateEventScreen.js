import {FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../store/auth-context";
import Input from "../../components/ui/Input";
import Colors from "../../constants/colors";
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ButtonContainedLarge from "../../components/ui/ButtonContainedLarge";
import ButtonOutlined from "../../components/ui/ButtonOutlined";
import { Fontisto } from '@expo/vector-icons';
import {doRequest} from "../../util/request";
import {authorizationHeader} from "../../constants/requestObjects";

function CreateEventScreen({navigation, route}) {
    const [formData, setFormData] = useState({
        title: {
            value: '',
            isInvalid: false,
        },
        city: {
            value: '',
            isInvalid: false,
        },
        street: {
            value: '',
            isInvalid: false,
        },
        location: {
            value: '',
            isInvalid: false,
        },
        date: {
            value: '',
            isInvalid: false
        },
        time: {
            value: '',
            isInvalid: false
        }
    });

    const authCtx = useContext(AuthContext);
    let pageVariables = useRef({
        imageMessage: "Add image",
        buttonContainedText: "Submit Event",
    });

    useEffect(() => {
        if(route.params && route.params.eventId){
            const eventId = route.params.eventId;
            const fetchEvent = async () => {
                navigation.setOptions({
                    title: "Edit Event"
                })
                pageVariables.current = {
                    imageMessage: "Change image",
                    buttonContainedText: "Update Event",
                };
                const data = await doRequest(`http://localhost:8080/events/${eventId}`, authorizationHeader(authCtx.token));
                initFormData(data);
            }
            fetchEvent().catch(error => console.log(error))
        }
    }, [])

    function initFormData(data) {
        setFormData({
            imageUri: data.imageUri,
            title: {
                value: data.title,
                isInvalid: false,
            },
            city: {
                value: data.address.city,
                isInvalid: false,
            },
            street: {
                value: data.address.street,
                isInvalid: false,
            },
            location: {
                value: data.location,
                isInvalid: false,
            },
            date: {
                value: data.date,
                isInvalid: false
            },
            time: {
                value: data.time,
                isInvalid: false
            }
        })
    }

    function createPostObject() {
        return {
            title: formData.title.value,
            address: {
                city: formData.city.value,
                street: formData.street.value,
            },
            location: formData.location.value,
            date: formData.date.value,
            time: formData.time.value
        }
    }

    function credentialChangedHandler(credentialIdentifier, enteredValue) {
        setFormData((currentCredentials) => {
            return {
                ...currentCredentials,
                [credentialIdentifier]: { value: enteredValue, isInvalid: false, },
            };
        });
    }

    async function handleSubmit() {
        console.log(createPostObject());

        // await fetch("http://localhost:8080/events", {
        //     method: "POST",
        //     body: JSON.stringify(createPostObject()),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // }).catch(error => console.log(error))
    }

    let image = formData.imageUri ? <Image style={styles.image} source={{uri: formData.imageUri}}/> : null

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {image}
                <Input
                    label="Title"
                    onUpdateValue={credentialChangedHandler.bind(this, 'title')}
                    value={formData.title.value}
                    icon="text-outline"
                />
                <Input
                    label="City"
                    onUpdateValue={credentialChangedHandler.bind(this, 'city')}
                    value={formData.city.value}
                >
                    <MaterialCommunityIcons name="home-city-outline" size={24} color={Colors.grey800} />
                </Input>
                <Input
                    label="Street"
                    onUpdateValue={credentialChangedHandler.bind(this, 'street')}
                    value={formData.street.value}
                    icon="mail-outline"
                >
                    <FontAwesome name="street-view" size={24} color={Colors.grey800} />
                </Input>
                <Input
                    label="Location"
                    onUpdateValue={credentialChangedHandler.bind(this, 'location')}
                    value={formData.location.value}
                    icon="location-outline"
                />
                <Input
                    label="Date"
                    onUpdateValue={credentialChangedHandler.bind(this, 'date')}
                    value={formData.date.value}
                    icon="mail-outline"
                >
                    <Fontisto name="date" size={24} color={Colors.grey800} />
                </Input>
                <Input
                    label="Time"
                    onUpdateValue={credentialChangedHandler.bind(this, 'time')}
                    value={formData.time.value}
                    icon="time-outline"
                />
                <View style={styles.imageButton}>
                    <ButtonOutlined icon="image-outline">
                        {pageVariables.current.imageMessage}
                    </ButtonOutlined>
                </View>
                <View style={styles.button}>
                    <ButtonContainedLarge
                        onPress={() => {handleSubmit()}}
                        color={Colors.primary500}
                    >
                        {pageVariables.current.buttonContainedText}
                    </ButtonContainedLarge>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    image: {
      width: 120,
      height: 100,
      borderRadius: 10,
      alignSelf: "center"
    },
    scrollView: {
        marginTop: 10
    },
    button: {
        marginTop: 5,
        alignSelf: "center",
    },
    imageButton: {
        marginTop: 5,
        width: 155,
        height: 60,
        alignSelf: "center"
    }
})

export default CreateEventScreen;