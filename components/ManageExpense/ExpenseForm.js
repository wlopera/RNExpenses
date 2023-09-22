import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/style";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

// ver> https://reactnative.dev/docs/textinput
const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [inputValue, setInputValue] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  //   useEffect(() => {
  //     if (defaultValues) {
  //       setInputValue({
  //         amount: defaultValues ? defaultValues.amount.toString() : "",
  //         date: defaultValues ? getFormattedDate(defaultValues.date) : "",
  //         description: defaultValues ? defaultValues.description : "",
  //       });
  //     }
  //   }, [defaultValues]);

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const dataIsValid = (expenseData) => {
    let message = undefined;

    if (isNaN(expenseData.amount) || expenseData.amount <= 0) {
      message = "Monto debe ser mayor a cero";
    }

    if (!message && expenseData.date.toString() === "Invalid Date") {
      message = "Fecha invalida";
    }

    if (!message && expenseData.description.trim().length === 0) {
      message = "Agregar una descripción";
    }

    if (message) {
      Alert.alert("Entrada Invalida", message);
    }
    return !message;
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    if (dataIsValid(expenseData)) {
      onSubmit(expenseData);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Tu Gasto</Text>
      <View style={styles.inputsRows}>
        <Input
          label="Monto"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangedHandler("amount", value),
            value: inputValue.amount,
          }}
        />
        <Input
          label="Fecha"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler("date", value),
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="Descripción"
        textInputConfig={{
          multiline: true,
          //autoCapitalize: 'none' //'words', default 'sentences', ...
          //autoCorrect:false, // default es true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValue.description,
          //name: "description",
        }}
      />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancelar
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
    color: "white",
    backgroundColor: GlobalStyles.colors.primary500,
  },
  inputsRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
