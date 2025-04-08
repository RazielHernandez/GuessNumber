import {View, Text, StyleSheet, Dimensions} from "react-native";
import Colors from "../constants/colors";

function NumberCotainer ({ children }) {
  return (
    <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}
// Export the NumberContainer component
export default NumberCotainer;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accentColor500,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        margin: deviceWidth < 380 ? 12 : 24,
    },
    numberText: {
      fontFamily: 'open-sans-bold',
        color: Colors.accentColor500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        textAlign: "center",
    },
});