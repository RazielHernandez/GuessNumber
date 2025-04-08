import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Title from "../components/TitleText";
import NumberCotainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import InstructionText from "../components/InstructionText";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }
    , [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
        setCurrentGuess(generateRandomBetween(1, 100, userNumber));
    }, []);

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) || 
            (direction === 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        }
        else {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsLength = guessRounds.length;
    let content = <>
        <NumberCotainer>{currentGuess}</NumberCotainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="remove" size={24} color="white" />
                    </PrimaryButton> 
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Ionicons name="add" size={24} color="white" />
                    </PrimaryButton>
                </View>
                
            </View>
        </Card>
    </>

    if (deviceWidth > 500) {
        content = <>

            <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="remove" size={24} color="white" />
                    </PrimaryButton> 
                </View>
                <NumberCotainer>{currentGuess}</NumberCotainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Ionicons name="add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            
            {content}

            <View style={styles.listContainer}>
                {/*guessRounds.map((guessRound) => (
                    <Text key={guessRound}>{guessRound}</Text>
                ))*/}

                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData) => (
                        <GuessLogItem guess={itemData.item} index={guessRoundsLength - itemData.index} />
                        
                        
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}
// Export the GameScreen component
export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    instructionText: {
        paddingBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    
});