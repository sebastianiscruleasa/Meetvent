import {View, Text, Pressable, StyleSheet} from 'react-native';
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";

function ButtonContained({icon, iconSize, iconOnTheRight, justIcon, color, children, onPress}) {
  return (
      <Pressable
          style={({pressed}) =>
              pressed
                  ? [styles.buttonOuterContainer, styles.pressed]
                  : [styles.buttonOuterContainer]
          }
          onPress={onPress}
      >
        <View style={[styles.buttonInnerContainer, {backgroundColor: color ? color : colors.primary500}]}>
          {!iconOnTheRight && <Ionicons name={icon} size={iconSize ? iconSize : 18} color="white"/>}
          <Text style={[styles.buttonText, {marginHorizontal: icon && !justIcon ? 4 : 0}]}>{children}</Text>
          {iconOnTheRight && <Ionicons name={icon} size={iconSize ? iconSize : 18} color="white"/>}
        </View>
      </Pressable>
  );
}

export default ButtonContained;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 16,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});