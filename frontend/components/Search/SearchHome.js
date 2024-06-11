import {
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import ButtonContained from "../ui/ButtonContained";

import interests from "../../constants/interests";
import SearchDropdown from "./SearchDropdown";
import {useNavigation} from "@react-navigation/native";

function SearchHome({searchedText, searchHandler, data}) {
    const navigation = useNavigation();

    function onSearchHandler(text) {
        searchHandler(text);
    }

    function onNavigateHandler(id) {
        onSearchHandler();
        navigation.navigate("EventDetailScreenHome", {
            eventId: id,
        });
    }

    function onPressFilterHandler(id) {
        navigation.navigate("EventsStack", {
            interestId: id,
        });
    }

    return (
        <View style={styles.absoluteContainer}>
            <View style={styles.container}/>
            <View style={styles.searchContainer}>
                <View style={styles.search}>
                    <Ionicons name="search" color="white" size={24}/>
                    <TextInput
                        style={styles.input}
                        selectionColor="white"
                        placeholder="Search..."
                        placeholderTextColor="white"
                        value={searchedText}
                        onChangeText={(text) => {
                            onSearchHandler(text);
                        }}
                    />
                </View>
                {searchedText && (
                    <Pressable
                        style={({pressed}) =>
                            pressed
                                ? [styles.closeButtonContainer, styles.pressed]
                                : [styles.closeButtonContainer]
                        }
                        onPress={() => onSearchHandler()}
                    >
                        <Ionicons name="close" color="white" size={20}/>
                    </Pressable>
                )}
            </View>
            {searchedText && (
                <SearchDropdown data={data} onNavigateHandler={onNavigateHandler}/>
            )}
            {!searchedText && (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles.filtersContainer}
                >
                    {interests.map((interest) => (
                        <ButtonContained
                            key={interest.key}
                            onPress={() => onPressFilterHandler(interest.key)}
                            color={interest.color}
                            icon={interest.icon}
                        >
                            {interest.name}
                        </ButtonContained>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

export default SearchHome;

const styles = StyleSheet.create({
    absoluteContainer: {
        position: "absolute",
        width: "100%",
        zIndex: 3,
    },
    container: {
        height: 80,
        width: "100%",
        position: "absolute",
        backgroundColor: colors.primary500,
        borderBottomEndRadius: 36,
        borderBottomStartRadius: 36,
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        paddingHorizontal: 16,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        marginLeft: 8,
        color: "white",
        fontSize: 20,
        borderLeftWidth: 2,
        borderColor: "white",
        paddingLeft: 8,
    },
    filtersContainer: {
        marginTop: 8,
    },
    closeButtonContainer: {
        backgroundColor: colors.primary600,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 16,
    },
    pressed: {
        opacity: 0.75,
    },
});
