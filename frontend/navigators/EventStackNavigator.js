import { useEffect, useState } from "react";
import FiltersButton from "../components/Events/Filters/FiltersButton";
import EventsScreen from "../screens/EventsScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import { Stack } from "../constants/navigators";
function EventsStackNavigator({ navigation, route }) {
  const [filtersDropdownActive, setFilterDropdownActive] = useState(false);
  const [activeFiltersArray, setActiveFiltersArray] = useState([]);
  useEffect(() => {
    if (route.params?.interestId >= 0) {
      setActiveFiltersArray([route.params.interestId]);
    }
  }, [route.params?.interestId]);
  useEffect(() => {
    const unsubscribeBlur = navigation.addListener("blur", (e) => {
      setActiveFiltersArray([]);
      setFilterDropdownActive(false);
    });
    return () => unsubscribeBlur();
  }, [navigation]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        options={{
          headerRight: () => {
            return (
              <FiltersButton
                isActive={filtersDropdownActive}
                filtersNumber={activeFiltersArray.length}
                onPress={() =>
                  setFilterDropdownActive((prevState) => !prevState)
                }
              />
            );
          },
        }}
      >
        {() => {
          return (
            <EventsScreen
              activeFilters={activeFiltersArray}
              setActiveFilters={setActiveFiltersArray}
              filtersDropdown={filtersDropdownActive}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen
        name="EventDetailScreenEvents"
        component={EventDetailScreen}
        options={{
          title: "Event details",
        }}
      />
    </Stack.Navigator>
  );
}

export default EventsStackNavigator;
