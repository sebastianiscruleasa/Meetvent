import {Alert, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Interests from "../components/Profile/Interests";
import ButtonOutlined from "../components/ui/ButtonOutlined";
import colors from "../constants/colors";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/auth-context";
import * as ImagePicker from 'expo-image-picker';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {InterestsContext} from "../store/interests-context";

const DUMMY_PROFILE = {
    image: "https://media.istockphoto.com/id/1208175274/vector/avatar-vector-icon-simple-element-illustrationavatar-vector-icon-material-concept-vector.jpg?s=612x612&w=0&k=20&c=t4aK_TKnYaGQcPAC5Zyh46qqAtuoPcb-mjtQax3_9Xc=",
    name: "Marco Reus",
    about: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
}

function ProfileScreen() {
    const {image, about} = DUMMY_PROFILE;

    const authCtx = useContext(AuthContext);
    const interestsCtx = useContext(InterestsContext);

    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchUser = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/users`, {
            headers: {
                "Authorization": `Bearer ${authCtx.token}`
            },
        })
        if (!response.ok) {
            Alert.alert(
                'Something went wrong!',
                'Please try again later!'
            );
            setIsLoading(false);
        } else {
            const data = await response.json();
            setUser(data);
            setIsLoading(false);
        }
    }, [authCtx])

    useEffect(() => {
        fetchUser();
    }, [fetchUser])

    if (isLoading) {
        return <LoadingOverlay/>;
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const interests = interestsCtx.interests.filter((interest) => interest.counterEvents >= 3).map(interest => interest.interestKey);

    return (
        <ScrollView>
            <View style={styles.detailsContainer}>
                <View style={styles.imageContainer}>

                        <Image style={styles.image}
                               source={{uri: selectedImage !== null ? selectedImage : (user.imageUri ? user.imageUri : image)}}/>

                </View>
                <Text style={styles.name}>{user.username}</Text>
                <ButtonOutlined icon="image-outline" onPress={pickImage}>Change Photo</ButtonOutlined>
            </View>
            <View style={styles.aboutContainer}>
                <View style={styles.aboutHeaderContainer}>
                    <Text style={styles.aboutHeaderText}>ABOUT</Text>
                </View>
                <Text>{about}</Text>
            </View>
            {interests.length !== 0 && (<Interests list={interests}/>)}
            <View style={styles.buttons}>
                <ButtonOutlined color={colors.error500} icon="log-out-outline" iconSize={22}
                                iconOnTheRight={true} onPress={authCtx.logout}>LOGOUT</ButtonOutlined>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    detailsContainer: {
        alignItems: "center",
        marginVertical: 16
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    name: {
        fontWeight: "bold",
        fontSize: 22,
        margin: 16
    },
    aboutContainer: {
        marginBottom: 16,
        marginHorizontal: 24,
    },
    aboutHeaderContainer: {
        alignSelf: "center",
        borderBottomWidth: 2,
        borderColor: colors.primary600,
        marginBottom: 16
    },
    aboutHeaderText: {
        textAlign: "center",
        color: colors.primary500,
        fontWeight: "bold",
        fontSize: 14,
        paddingBottom: 2
    },
    buttons: {
        justifyContent: "center",
        alignSelf: "center",
    },
})