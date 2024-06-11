import {useContext} from "react";
import {AuthContext} from "../../store/auth-context";
import {Pressable, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Colors from "../../constants/colors";

function HeaderLogOutButton() {
    const authCtx = useContext(AuthContext);
    const handleLogOut = () => {
        authCtx.logout();
    }
    return(
        <Pressable onPress={handleLogOut} style={({pressed}) =>
            pressed
                ? [styles.container, styles.pressed]
                : [styles.container]
        }>
            <MaterialIcons name="logout" size={27} color={Colors.error500} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
    },
    pressed: {
        opacity: 0.75,
    },
})

export default HeaderLogOutButton;