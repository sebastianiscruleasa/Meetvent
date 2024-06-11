import {Avatar} from "@rneui/base";
import {View, StyleSheet, FlatList} from "react-native";
import React, {useContext} from "react";
import {AuthContext} from "../../store/auth-context";
import useFetch from "../../customHooks/useFetch";
import {authorizationHeader} from "../../constants/requestObjects";

function AvatarCardList({attendees, numberOfAvatars=3, size=24, alignSelf="flex-end"}) {
    return (
        <View style={[styles.avatarContainer, {alignSelf: alignSelf}]}>
            {attendees && attendees.slice(0,numberOfAvatars).map(user => <Avatar key={user.id} size={size} rounded source={{uri: user.imageUri}}/>)}
            {attendees && (attendees.length>numberOfAvatars) && <Avatar
                size={size}
                rounded
                title={`+${attendees.length - numberOfAvatars}`}
                containerStyle={{backgroundColor: "#888888"}}
            />}
        </View>
    );
}

export default AvatarCardList;

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: "row",
        marginRight: 20,
    },
});
