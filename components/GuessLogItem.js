import { Text, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

function GuessLogItem({ guess, index }) {
  return (
    <View style={styles.item}>
        <Text style={styles.text}>Guess #{index}</Text>
        <Text style={styles.text}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
    item: {
        padding: 12,
        marginVertical: 8,
        borderRadius: 40,
        backgroundColor: Colors.primary800,
        borderWidth: 1,
        backgroundColor: Colors.accentColor500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
    },
    text: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 16,
    },
});