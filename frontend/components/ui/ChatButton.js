import {Pressable, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import colors from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";

function ChatButton() {
    const navigation = useNavigation();

    function onPress() {
        navigation.navigate('ChatScreen')
    }

    return (
        <Pressable
            style={({pressed}) =>
                pressed
                    ? [styles.container, styles.pressed]
                    : [styles.container]
            }
            onPress={onPress}
        >
                <Ionicons name="chatbubble-ellipses" color="white" size={20}/>
        </Pressable>
    )
}

export default ChatButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary600,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20
    },
    pressed: {
        opacity: 0.75,
    },
})