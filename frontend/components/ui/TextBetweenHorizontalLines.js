import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const TextBetweenHorizontalLines = ({text}) => {
  return (
    <View style={styles.bottomTextContainer}>
      <View style={styles.line} />
      <View>
        <Text style={styles.bottomText}>{text}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default TextBetweenHorizontalLines;

const styles = StyleSheet.create({
    bottomTextContainer: {
        marginVertical: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        flex:1,
        height: 1,
        backgroundColor: Colors.primary600
    },
    bottomText: {
        width: 180,
        color: Colors.primary600,
        textAlign: 'center'
    }
})
