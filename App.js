import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar} from 'expo-status-bar';

import {useState} from 'react';
import { useFonts} from "expo-font";

import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) { 
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setRoundsNumber(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setRoundsNumber(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen roundsNumber={roundsNumber} userNumber={userNumber} onRestart={startNewGameHandler} />;
  }


  return (
    <>
      <StatusBar style='light' />
        <LinearGradient colors={[Colors.primary700, Colors.accentColor500]} style={styles.rootScreen}>
        <ImageBackground 
          style={styles.rootScreen} 
          source={require('./assets/images/background.png')} 
          resizeMode='cover'
          imageStyle={styles.backgroundImage}>

            <SafeAreaView style={styles.rootScreen}>
              {screen}
            </SafeAreaView>
          
        </ImageBackground>
      </LinearGradient>
    </>
    
    
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    //backgroundColor: '#ddb52f',
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
