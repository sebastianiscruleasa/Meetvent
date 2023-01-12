import React, {useState, useMemo, useCallback, useEffect, useContext} from 'react'
import {Alert, ImageBackground, Text, View} from 'react-native'
import TinderCard from 'react-tinder-card'
import ButtonContained from "../components/ui/ButtonContained";
import {LinearGradient} from 'expo-linear-gradient';
import {AuthContext} from "../store/auth-context";

const img = "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px";

function ConnectScreen() {
    const [characters, setCharacters] = useState([])
    let charactersState = characters;
    console.log(characters)

    const childRefs = useMemo(() => Array(characters.length).fill(0).map(() => React.createRef()), [characters])

    const authCtx = useContext(AuthContext);

    const fetchUsers = useCallback(async () => {
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
        } else {
            const data = await response.json();
            console.log(data)
            setCharacters(data);
        }
    }, [])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    async function swipeRequest(id, direction) {
        const dir = direction === "right" ? "YES" : "NO";
        console.log(dir)
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
        console.log(name + ' left the screen!')
        charactersState = charactersState.filter(character => character.name !== name)
        setCharacters(charactersState)
    }

    const swipeButtonHandler = (dir) => {
        const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.username))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
            const index = characters.map(person => person.username).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                {characters.map((character, index) =>
                    <TinderCard ref={childRefs[index]} key={index}
                                onSwipe={async (dir) => await swipeRequest(character.id, dir)}
                                onCardLeftScreen={() => outOfFrame(character.username)}>
                        <View style={styles.card}>
                            <ImageBackground style={styles.cardImage} source={{uri: img}}>
                                <LinearGradient start={{x: 1, y: 0}} end={{x: 0.3, y: 0}}
                                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={styles.cardTitle}>
                                    <Text style={styles.title}>{character.username}</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </View>
                    </TinderCard>
                )}
            </View>
            <View style={styles.buttons}>
                <ButtonContained icon="close" iconSize={24} color="red" justIcon={true}
                                 onPress={() => swipeButtonHandler('left')}/>
                <ButtonContained icon="heart" iconSize={24} color="green" justIcon={true}
                                 onPress={() => swipeButtonHandler('right')}/>
            </View>
        </View>
    )
}

export default ConnectScreen;

const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
}