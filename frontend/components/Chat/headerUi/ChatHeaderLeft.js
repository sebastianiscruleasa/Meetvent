import { StyleSheet, View, Text, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Badge } from "@rneui/base";
import { doRequest } from "../../../util/request";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../store/auth-context";
function ChatHeaderLeft({ navigation, tintColor, contactId }) {
  const authCtx = useContext(AuthContext);
  const handleUpdate = async () => {
    const requestPath = `http://localhost:8080/private-messages/update/${contactId}`;
    const requestObject = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };
    return await doRequest(requestPath, requestObject);
  };

  const handleBackNavigation = async () => {
    try {
      await handleUpdate();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleBackNavigation}>
        <Ionicons name="chevron-back-outline" size={35} color={tintColor} />
      </Pressable>
    </View>
  );
}

export default ChatHeaderLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    left: -18,
  },
});
