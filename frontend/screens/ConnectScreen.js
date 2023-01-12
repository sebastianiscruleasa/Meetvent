import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Alert, ImageBackground, Text, View} from 'react-native'
import TinderCard from 'react-tinder-card'
import {LinearGradient} from 'expo-linear-gradient';
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function ConnectScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [characters, setCharacters] = useState([])
    let charactersState = characters;

    const authCtx = useContext(AuthContext);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/tinder/users`, {
            headers: {
                "Authorization": `Bearer ${authCtx.token}`
            },
        })
        if (!response.ok) {
            Alert.alert(
                'Something went wrong!',
                'Please try again later!'
            );
            setIsLoading(false);
        } else {
            const data = await response.json();
            setCharacters(data);
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    async function swipeRequest(id, direction) {
        const dir = direction === "right" ? "YES" : "NO";
        const response = await fetch(`http://localhost:8080/tinder/response/user/${id}`, {
            method: "POST",
            body: JSON.stringify({
                response: dir
            }),
            headers: {
                "Authorization": `Bearer ${authCtx.token}`,
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            console.log(response)
            Alert.alert('Something went wrong!', 'Please try again later!');
        } else {
            const data = await response.json();
            console.log(data)
        }
    }

    const outOfFrame = (name) => {
        charactersState = charactersState.filter(character => character.name !== name)
        setCharacters(charactersState)
    }

    if (isLoading) {
        return <LoadingOverlay/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                {characters.length !== 0 && characters.map((character, index) =>
                    <TinderCard key={index}
                                onSwipe={async (dir) => await swipeRequest(character.id, dir)}
                                onCardLeftScreen={() => outOfFrame(character.username)}>
                        <View style={styles.card}>
                            <ImageBackground style={styles.cardImage} source={{uri: character.imageUri}}>
                                <LinearGradient start={{x: 1, y: 0}} end={{x: 0.3, y: 0}}
                                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={styles.cardTitle}>
                                    <Text style={styles.title}>{character.username}</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </View>
                    </TinderCard>
                )}
                {characters.length === 0 &&
                    <Text style={styles.noConnections}>No connections to be made!</Text>
                }
            </View>
        </View>
    )
}

export default ConnectScreen;

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 40
    },
    cardContainer: {
        alignSelf: 'center',
        width: '90%',
        maxWidth: 350,
        height: 500,
    },
    card: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 350,
        height: 500,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 20,
    },
    cardTitle: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    title: {
        margin: 12,
        fontWeight: "bold",
        fontSize: 24,
        color: '#fff'
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        zIndex: -100,
    },
    noConnections: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
    }
}