import { 
    StyleSheet,
    TextInput, 
    View, 
    Alert, 
    useWindowDimensions, 
    KeyboardAvoidingView, 
    ScrollView
 } 
from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/TitleText";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";

function StartGameScreen({onPickNumber}) {

    const [enteredNumber, setEnteredNumber] = useState('');

    const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.',
            [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        
        onPickNumber(chosenNumber);
        
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    const marginTop = deviceHeight < 450 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>

        
        <KeyboardAvoidingView style={styles.screen} behavior="position" keyboardVerticalOffset={marginTop}>
        <View style={[styles.rootContainer, {marginTop: marginTop}]}>
            <Title>Guess My Number</Title>
            <Card>
                <InstructionText>Enter a Number</InstructionText>
                <TextInput 
                    style={styles.textInput} 
                    maxLength={2} 
                    keyboardType="number-pad" 
                    autoCapitalize="none" 
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}/>

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
                
            </Card>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        //marginTop: deviceHeight < 450 ? 30 : 100,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accentColor500,
        borderBottomWidth: 2,
        color: Colors.accentColor500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
});
