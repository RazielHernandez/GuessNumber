import { Text, StyleSheet, Platform } from "react-native";

function Title ({children}) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
}
// Export the Title component
export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        //fontWeight: 'bold',
        marginBottom: 24,
        color: "white",
        textAlign: 'center',
        //borderWidth: Platform.OS === 'android' ? 2 : 0,
        //borderWidth: Platform.select({ios: 0, android: 2}),
        //borderColor: "white",
        padding: 12,
        maxWidth: '80%',
        width: 300,
        borderRadius: 8,
    }
});