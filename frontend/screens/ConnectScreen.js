import React, {useState, useMemo} from 'react'
import {ImageBackground, Text, View} from 'react-native'
import TinderCard from 'react-tinder-card'
import ButtonContained from "../components/ui/ButtonContained";
import {LinearGradient} from 'expo-linear-gradient';

const db = [
    {
        name: 'Richard Hendricks',
        img: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
    },
    {
        name: 'Erlich Bachman',
        img: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
    },
    {
        name: 'Monica Hall',
        img: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
    },
    {
        name: 'Jared Dunn',
        img: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
    },
    {
        name: 'Dinesh Chugtai',
        img: "https://img.bundesliga.com/tachyon/sites/2/2022/11/2223_MD02_SCFBVB_CKB_136-1-scaled.jpg?crop=215px%2C0px%2C2129px%2C1703px"
    }
]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function ConnectScreen() {
    const [characters, setCharacters] = useState(db)
    const [lastDirection, setLastDirection] = useState()

    const childRefs = useMemo(() => Array(db.length).fill(0).map(() => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete + ' to the ' + direction)
        setLastDirection(direction)
        alreadyRemoved.push(nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        charactersState = charactersState.filter(character => character.name !== name)
        setCharacters(charactersState)
    }

    const swipeButtonHandler = (dir) => {
        const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
            const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                {characters.map((character, index) =>
                    <TinderCard ref={childRefs[index]} key={character.name}
                                onSwipe={(dir) => swiped(dir, character.name)}
                                onCardLeftScreen={() => outOfFrame(character.name)}>
                        <View style={styles.card}>
                            <ImageBackground style={styles.cardImage} source={{uri: character.img}}>
                                <LinearGradient start={{x: 1, y: 0}} end={{x: 0.3, y: 0}}
                                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={styles.cardTitle}>
                                    <Text style={styles.title}>{character.name}</Text>
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