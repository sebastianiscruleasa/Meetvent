import {createContext, useState} from "react";

export const InterestsContext = createContext({
    interests: [],
    city: '',
    locateUser: (city) => {},
    setUsersInterests: (userInterests) => {}
})

function InterestsContextProvider({children}) {
    const [interests, setInterests] = useState([]);
    const [city, setCity] = useState('');

    function locateUser(city) {
        setCity(city);
    }

    function setUsersInterests(userInterests) {
        setInterests(userInterests);
    }

    const value = {
        interests: interests,
        city: city,
        locateUser: locateUser,
        setUsersInterests: setUsersInterests,
    };

    return <InterestsContext.Provider value={value}>{children}</InterestsContext.Provider>
}

export default InterestsContextProvider;