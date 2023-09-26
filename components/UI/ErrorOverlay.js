import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import Button from "./Button";

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>A ocurrido un Error!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Continuar</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
