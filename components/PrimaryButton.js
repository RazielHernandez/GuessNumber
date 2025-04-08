import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function PrimaryButton({ children, onPress }) {
    function pressHandler() {
        onPress();
    }

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                style={({pressed}) => 
                    pressed 
                        ? [styles.buttonInnerContainer, styles.pressed] 
                        : styles.buttonInnerContainer} 
                onPress={pressHandler} 
                android_ripple={{color: Colors.primary600}}>
                    <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}
// Export the PrimaryButton component
export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.4,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    pressed: {
        opacity: 0.75,
    }
});