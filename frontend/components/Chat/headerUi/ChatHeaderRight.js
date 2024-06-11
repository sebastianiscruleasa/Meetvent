import { StyleSheet, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Badge } from "@rneui/base";

function ChatHeaderRight({ tintColor }) {
  return (
    <View style={styles.container}>
      <View style={styles.call}>
        <Ionicons name="call" size={24} color={tintColor} />
      </View>
      <View style={styles.video}>
        <FontAwesome name="video-camera" size={24} color={tintColor} />
      </View>
      <View style={styles.badgeContainer}>
        <Badge status="success" badgeStyle={styles.badgeDimensions} />
      </View>
    </View>
  );
}

export default ChatHeaderRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  call: {
    marginRight: 10,
  },
  video: {
    marginLeft: 10,
  },
  badgeContainer: {
    marginLeft: 3,
  },
  badgeDimensions: {
    width: 10,
    height: 10,
    borderRadius: "50%",
  },
});
