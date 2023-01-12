import {createContext, useState} from "react";

export const InterestsContext = createContext({
    interests: [],
    city: '',
    locateUser: (city) => {},
    updateInterests: (id) => {
    }
})

function InterestsContextProvider({children}) {
    const [interests, setInterests] = useState([]);
    const [city, setCity] = useState('');

    function locateUser(city) {
        setCity(city);
    }

    function updateInterests(id) {
        setInterests((prevState) => {
            for (let key in prevState ){
                if(key === id){
                    prevState[key]++;
                } else {
                    prevState = [...prevState, {id:1}]
                }
            }
            return prevState
        })
    }

    const value = {
        interests: interests,
        city: city,
        locateUser: locateUser,
        updateInterests: updateInterests
    };

    return <InterestsContext.Provider value={value}>{children}</InterestsContext.Provider>
}

export default InterestsContextProvider;