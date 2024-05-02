import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SplashScreen = ({ onStartGame }) => {
  return (
    <ImageBackground
      source={require("./assets/FTAPPGAME (4).png")}
      style={styles.background}
    >
      <View style={[styles.container, styles.startButtonContainer]}>
        <TouchableOpacity
          onPress={onStartGame}
          style={[styles.startButton, { backgroundColor: "transparent" }]}
        >
          <Text style={styles.startButtonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const StatsScreen = ({ onGoBack, playerScores }) => {
  return (
    <ImageBackground
      source={require("./assets/FTAPPGAME (5).png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onGoBack}
          style={[styles.backButton, styles.topRightButton]}
        >
          <Text style={[styles.backButtonText, { color: "white" }]}>
            Volver
          </Text>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <Text style={[styles.statsText, { color: "white" }]}>
            Puntaje de Mauricio:{" "}
            <Text style={styles.score}>{playerScores["Mauricio"]}</Text>
          </Text>
          <Text style={[styles.statsText, { color: "white" }]}>
            Ganancia de Mauricio:{" "}
            <Text style={styles.score}>{playerScores["MauricioGain"]}</Text>
          </Text>
          <Text style={[styles.statsText, { color: "white" }]}>
            Pérdida de Mauricio:{" "}
            <Text style={styles.score}>{playerScores["MauricioLoss"]}</Text>
          </Text>
          <Text style={[styles.statsText, { color: "white" }]}>
            Puntaje de Juan:{" "}
            <Text style={styles.score}>{playerScores["Juan"]}</Text>
          </Text>
          <Text style={[styles.statsText, { color: "white" }]}>
            Ganancia de Juan:{" "}
            <Text style={styles.score}>{playerScores["JuanGain"]}</Text>
          </Text>
          <Text style={[styles.statsText, { color: "white" }]}>
            Pérdida de Juan:{" "}
            <Text style={styles.score}>{playerScores["JuanLoss"]}</Text>
          </Text>
          {/* Agrega aquí más líneas de texto para otros jugadores si es necesario */}
        </View>
      </View>
    </ImageBackground>
  );
};

const HomePage = ({ onGoToMesa, onGoToSplashScreen, onGoToStatsScreen }) => {
  const handleGoToMesa = () => {
    onGoToMesa();
  };

  const handleGoToSplashScreen = () => {
    onGoToSplashScreen();
  };
  const handleGoToStatsScreen = () => {
    onGoToStatsScreen();
  };

  return (
    <ImageBackground
      source={require("./assets/FTAPPGAME (7).png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.banner}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>📋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleGoToMesa}>
            <Text style={styles.menuText}>🎲</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleGoToStatsScreen}
          >
            <Text style={styles.menuText}>📊</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleGoToSplashScreen}
          >
            <Text style={styles.menuText}>🚪</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={handleGoToMesa}
          >
            <Text style={styles.bottomButtonText}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>YouTube</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const GameTable = ({ onExitTable }) => {
  const handleExitTable = () => {
    onExitTable();
  };

  // Código de la mesa de juego
  const handlePassTurn = () => {
    if (currentPlayer === "Mauricio") {
      setCurrentPlayer("Juan");
      setTimeLeft(10);
      setDisableBoard(true);
      setJuanIsPlaying(true);
    } else {
      setCurrentPlayer("Mauricio");
      setTimeLeft(10);
      setDisableBoard(false);
      setTurnCount(turnCount + 1);
      setJuanIsPlaying(false);
    }
    // Detener la animación del reloj cuando se pasa el turno
    clockAnimation.stopAnimation();
  };
  const [currentPlayer, setCurrentPlayer] = useState("Mauricio");
  const [score, setScore] = useState({ Mauricio: 0, Juan: 0 });
  const [turnCount, setTurnCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [disableBoard, setDisableBoard] = useState(false);
  const [juanIsPlaying, setJuanIsPlaying] = useState(false);
  const [diamondStates, setDiamondStates] = useState([
    { available: true, emoji: "💎" },
    { available: true, emoji: "💎" },
    { available: true, emoji: "☀️" },
    { available: true, emoji: "☀️" },
  ]);
  const [goldBarStates, setGoldBarStates] = useState([
    { available: true, emoji: "💰" },
    { available: true, emoji: "💰" },
    { available: true, emoji: "🥇" },
    { available: true, emoji: "🥇" },
  ]);
  const [rubyStates, setRubyStates] = useState([
    { available: true, emoji: "🔴" },
    { available: true, emoji: "🔴" },
    { available: true, emoji: "🍀" },
    { available: true, emoji: "🍀" },
  ]);
  const [trophyStates, setTrophyStates] = useState([
    { available: true, emoji: "💚" },
    { available: true, emoji: "💚" },
    { available: true, emoji: "🏆" },
    { available: true, emoji: "🏆" },
  ]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [takenRowsByPlayer, setTakenRowsByPlayer] = useState({
    Mauricio: [],
    Juan: [],
  });
  const [clockAnimation] = useState(new Animated.Value(0)); // Animación del reloj

  useEffect(() => {
    // Función para iniciar el temporizador
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      // Limpiar el temporizador al desmontar el componente o cuando el juego termina
      return () => clearInterval(timer);
    } else {
      handleTimeOut(); // Cuando el tiempo llega a cero, se termina el turno automáticamente
    }
  }, [timeLeft]);

  useEffect(() => {
    if (currentPlayer === "Juan" && !disableBoard) {
      setJuanIsPlaying(true);
      handleJuanTurn();
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (currentPlayer === "Mauricio" && !disableBoard) {
      startClockAnimation();
    }
  }, [currentPlayer]);

  const startClockAnimation = () => {
    clockAnimation.setValue(0);
    Animated.timing(clockAnimation, {
      toValue: 1,
      duration: timeLeft * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(handleTimeOut);
  };

  const handleTimeOut = () => {
    if (currentPlayer === "Mauricio") {
      setCurrentPlayer("Juan");
      setTimeLeft(10);
      setDisableBoard(true);
      setJuanIsPlaying(true);
    } else {
      setCurrentPlayer("Mauricio");
      setTimeLeft(10);
      setDisableBoard(false);
      setTurnCount(turnCount + 1);
      setJuanIsPlaying(false);
    }
  };

  const handlePress = (item, index, array) => {
    if (
      !array[index].available ||
      disableBoard ||
      (currentPlayer === "Juan" && array === diamondStates)
    )
      return;

    // Verificar si Mauricio ya tomó 8 fichas
    if (
      currentPlayer === "Mauricio" &&
      takenRowsByPlayer.Mauricio.length >= 8
    ) {
      setAlertMessage("Mauricio ya ha tomado 8 fichas.");
      setAlertColor("red");
      showTopAlert();
      return;
    }

    const newScore = { ...score };

    let change = 0;
    let message = "";

    if (Math.random() < 0.5) {
      change = 20000;
      message = `${currentPlayer} ganó 20,000 puntos.`;
    } else {
      change = -23000;
      message = `${currentPlayer} perdió 23,000 puntos.`;
    }

    newScore[currentPlayer] += change;

    setScore(newScore);

    array[index].available = false;
    array[index].emoji =
      currentPlayer === "Juan" ? "" : change > 0 ? "😀" : "😡";

    switch (item) {
      case "💎":
        setDiamondStates([...array]);
        break;
      case "💰":
        setGoldBarStates([...array]);
        break;
      case "🔴":
        setRubyStates([...array]);
        break;
      case "🏆":
        setTrophyStates([...array]);
        break;
      default:
        break;
    }

    setTakenRowsByPlayer((prevRows) => ({
      ...prevRows,
      [currentPlayer]: [...prevRows[currentPlayer], array],
    }));

    const allRowsTaken =
      Object.keys(takenRowsByPlayer[currentPlayer]).length === 15;

    if (allRowsTaken) {
      resetRowsForPlayer(currentPlayer);
    }

    setAlertMessage(message);
    setAlertColor(change > 0 ? "green" : "red");
    showTopAlert();
  };

  const resetRowsForPlayer = (player) => {
    switch (player) {
      case "Mauricio":
        setDiamondStates([
          { available: true, emoji: "💎" },
          { available: true, emoji: "💎" },
          { available: true, emoji: "☀️" },
          { available: true, emoji: "☀️" },
        ]);
        setGoldBarStates([
          { available: true, emoji: "💰" },
          { available: true, emoji: "💰" },
          { available: true, emoji: "🥇" },
          { available: true, emoji: "🥇" },
        ]);
        setRubyStates([
          { available: true, emoji: "🔴" },
          { available: true, emoji: "🔴" },
          { available: true, emoji: "🍀" },
          { available: true, emoji: "🍀" },
        ]);
        setTrophyStates([
          { available: true, emoji: "💚" },
          { available: true, emoji: "💚" },
          { available: true, emoji: "🏆" },
          { available: true, emoji: "🏆" },
        ]);
        setTakenRowsByPlayer((prevRows) => ({ ...prevRows, Mauricio: [] }));
        break;
      case "Juan":
        setDiamondStates([
          { available: true, emoji: "💎" },
          { available: true, emoji: "💎" },
          { available: true, emoji: "☀️" },
          { available: true, emoji: "☀️" },
        ]);
        setGoldBarStates([
          { available: true, emoji: "💰" },
          { available: true, emoji: "💰" },
          { available: true, emoji: "🥇" },
          { available: true, emoji: "🥇" },
        ]);
        setRubyStates([
          { available: true, emoji: "🔴" },
          { available: true, emoji: "🔴" },
          { available: true, emoji: "🍀" },
          { available: true, emoji: "🍀" },
        ]);
        setTrophyStates([
          { available: true, emoji: "💚" },
          { available: true, emoji: "💚" },
          { available: true, emoji: "🏆" },
          { available: true, emoji: "🏆" },
        ]);
        setTakenRowsByPlayer((prevRows) => ({ ...prevRows, Juan: [] }));
        break;
      default:
        break;
    }
  };

  const handleJuanTurn = () => {
    setTimeout(() => {
      const availableItems = [];
      diamondStates.forEach((diamond, index) => {
        if (diamond.available) availableItems.push({ item: "💎", index });
      });
      goldBarStates.forEach((goldBar, index) => {
        if (goldBar.available) availableItems.push({ item: "💰", index });
      });
      rubyStates.forEach((ruby, index) => {
        if (ruby.available) availableItems.push({ item: "🔴", index });
      });
      trophyStates.forEach((trophy, index) => {
        if (trophy.available) availableItems.push({ item: "🏆", index });
      });
      if (availableItems.length > 1) {
        const randomIndexes = [];
        for (let i = 0; i < 2; i++) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * availableItems.length);
          } while (randomIndexes.includes(randomIndex));
          randomIndexes.push(randomIndex);
        }
        randomIndexes.forEach((randomIndex) => {
          const { item, index } = availableItems[randomIndex];
          handlePress(
            item,
            index,
            item === "💎"
              ? diamondStates
              : item === "💰"
              ? goldBarStates
              : item === "🔴"
              ? rubyStates
              : trophyStates
          );
          setAlertMessage("Juan tomó una ficha.");
          setAlertColor("blue");
          showTopAlert();
        });
      }
    }, 1000);
  };

  const handleAlertOk = () => {
    // No se necesita ninguna acción especial después de cerrar la alerta
  };

  const showTopAlert = () => {
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const clockRotation = clockAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const getCellStyle = (available, isJuan) => {
    const baseStyle = {
      width: "22%",
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#111",
    };

    return {
      ...baseStyle,
      ...(currentPlayer === "Mauricio" &&
        !isJuan && { borderColor: "#44F814", elevation: 5 }),
      ...(available ? {} : { backgroundColor: "#888" }),
      ...(isJuan ? { borderColor: "#FF1493" } : {}),
    };
  };

  return (
    <ImageBackground
      source={require("./assets/FTAPPGAME (5).png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={handleExitTable} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>Salir</Text>
        </TouchableOpacity>
        <View style={styles.gameTable}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                { color: currentPlayer === "Mauricio" ? "#44F814" : "red" },
              ]}
            >
              FTAPPGAME
            </Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.row}>
            {diamondStates.map((diamond, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  getCellStyle(diamond.available, currentPlayer === "Juan"),
                  {
                    backgroundColor:
                      diamond.emoji === "☀️"
                        ? "green"
                        : diamond.available
                        ? "#00F"
                        : "#888",
                  },
                ]}
                onPress={() => handlePress("💎", index, diamondStates)}
                disabled={
                  !diamond.available || disableBoard || currentPlayer === "Juan"
                }
              >
                <Text style={styles.emoji}>{diamond.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {goldBarStates.map((goldBar, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  getCellStyle(goldBar.available, currentPlayer === "Juan"),
                  {
                    backgroundColor:
                      goldBar.emoji === "🥇"
                        ? "red"
                        : goldBar.available
                        ? "#FFD700"
                        : "#888",
                  },
                ]}
                onPress={() => handlePress("💰", index, goldBarStates)}
                disabled={
                  !goldBar.available || disableBoard || currentPlayer === "Juan"
                }
              >
                <Text style={styles.emoji}>{goldBar.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {rubyStates.map((ruby, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  getCellStyle(ruby.available, currentPlayer === "Juan"),
                  {
                    backgroundColor:
                      ruby.emoji === "🍀"
                        ? "yellow"
                        : ruby.available
                        ? "red"
                        : "#888",
                  },
                ]}
                onPress={() => handlePress("🔴", index, rubyStates)}
                disabled={
                  !ruby.available || disableBoard || currentPlayer === "Juan"
                }
              >
                <Text style={styles.emoji}>{ruby.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {trophyStates.map((trophy, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  getCellStyle(trophy.available, currentPlayer === "Juan"),
                  {
                    backgroundColor:
                      trophy.emoji === "🏆"
                        ? "blue"
                        : trophy.available
                        ? "green"
                        : "#888",
                  },
                ]}
                onPress={() => handlePress("🏆", index, trophyStates)}
                disabled={
                  !trophy.available || disableBoard || currentPlayer === "Juan"
                }
              >
                <Text style={styles.emoji}>{trophy.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.line} />
        </View>
      </View>
      {alertMessage ? (
        <View style={[styles.topAlert, { backgroundColor: alertColor }]}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      ) : null}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={{ fontWeight: "bold", color: "red", fontSize: 23 }}>
            Puntaje de Mauricio:
          </Text>{" "}
          {score["Mauricio"]}
        </Text>
        <Text style={styles.infoText}>
          <Text style={{ fontWeight: "bold", color: "red", fontSize: 20 }}>
            Turno:
          </Text>{" "}
          {turnCount}
        </Text>
        {juanIsPlaying && (
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: "bold", color: "blue", fontSize: 20 }}>
              Juan está jugando...
            </Text>
          </Text>
        )}
        <Text style={styles.infoText}>
          <Text style={{ fontWeight: "bold", color: "blue", fontSize: 27 }}>
            Tiempo restante:
          </Text>{" "}
          {timeLeft}
        </Text>
        <TouchableOpacity
          onPress={handlePassTurn}
          style={[
            styles.passTurnButton,
            { opacity: currentPlayer === "Juan" ? 0.5 : 1 }, // Cambia la opacidad del botón según el turno
          ]}
          disabled={currentPlayer === "Juan"} // Deshabilita el botón si es el turno de Juan
        >
          <Text style={styles.passTurnButtonText}>Pasar Turno</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [atGameTable, setAtGameTable] = useState(false);
  const [atStatsScreen, setAtStatsScreen] = useState(false);
  const [mauricioScore, setMauricioScore] = useState(0);
  const [juanScore, setJuanScore] = useState(0);
  const [mauricioLoss, setMauricioLoss] = useState(0);
  const [juanLoss, setJuanLoss] = useState(0);
  const [mauricioGain, setMauricioGain] = useState(0);
  const [juanGain, setJuanGain] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleGoToMesa = () => {
    setAtGameTable(true);
  };

  const handleExitTable = () => {
    setAtGameTable(false);
  };

  const handleGoToSplashScreen = () => {
    setGameStarted(false);
    setAtGameTable(false);
  };

  const handleGoToStatsScreen = () => {
    setAtStatsScreen(true);
    const mauricioGain = Math.floor(Math.random() * 100000);
    const juanGain = Math.floor(Math.random() * 100000);
    const mauricioLoss = Math.floor(Math.random() * 100000);
    const juanLoss = Math.floor(Math.random() * 100000);
    setMauricioGain(mauricioGain);
    setJuanGain(juanGain);
    setMauricioLoss(mauricioLoss);
    setJuanLoss(juanLoss);
  };

  const handleGoBackFromStatsScreen = () => {
    setAtStatsScreen(false);
  };

  return (
    <>
      {!gameStarted ? (
        <SplashScreen onStartGame={handleStartGame} />
      ) : atGameTable ? (
        <GameTable onExitTable={handleExitTable} />
      ) : atStatsScreen ? (
        <StatsScreen
          onGoBack={handleGoBackFromStatsScreen}
          playerScores={{
            Mauricio: mauricioScore,
            Juan: juanScore,
            MauricioGain: mauricioGain,
            JuanGain: juanGain,
            MauricioLoss: mauricioLoss,
            JuanLoss: juanLoss,
          }}
        />
      ) : (
        <HomePage
          onGoToMesa={handleGoToMesa}
          onGoToSplashScreen={handleGoToSplashScreen}
          onGoToStatsScreen={handleGoToStatsScreen}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 500,
    width: "90%",
  },
  startButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 150,
  },
  startButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 250,
    alignItems: "center",
    marginBottom: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuItem: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 15,
  },
  menuText: {
    fontSize: 24,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50,
    width: "100%",
    paddingHorizontal: 20,
  },
  bottomButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 150,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
    top: -50,
  },
  exitButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  exitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  gameTable: {
    marginTop: -10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  emoji: {
    fontSize: 24,
  },

  titleContainer: {
    marginBottom: 10,
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  topAlert: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  alertText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  score: {
    fontWeight: "bold",
    color: "white", // Puedes cambiar el color del puntaje aquí
    fontSize: 20,
    backgroundColor: "green",
  },

  topRightButton: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  passTurnButton: {
    position: "absolute",
    bottom: -20,
    right: 75,
    backgroundColor: "#ffcc00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  passTurnButtonText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
});

export default App;
