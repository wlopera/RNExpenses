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
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  // const [inputValue, setInputValue] = useState({
  //   amount: defaultValues ? defaultValues.amount.toString() : "",
  //   date: defaultValues ? getFormattedDate(defaultValues.date) : "",
  //   description: defaultValues ? defaultValues.description : "",
  // });

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
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
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
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    // if (dataIsValid(expenseData)) {
    //   onSubmit(expenseData);
    // }

    const amountIsValid =
      isNaN(expenseData.amount.value) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dataIsValid || !descriptionIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  let formIsInValid = undefined;

  if (!inputs.amount.isValid) {
    formIsInValid = "Monto debe ser mayor a cero";
  }
  if (!formIsInValid && !inputs.date.isValid) {
    formIsInValid = "Fecha invalida";
  }
  if (!formIsInValid && !inputs.description.isValid) {
    formIsInValid = "Agregar una descripción";
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Tu Gasto</Text>
      <View style={styles.inputsRows}>
        <Input
          label="Monto"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangedHandler("amount", value),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Fecha"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler("date", value),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Descripción"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          //autoCapitalize: 'none' //'words', default 'sentences', ...
          //autoCorrect:false, // default es true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          //name: "description",
        }}
      />
      {formIsInValid && <Text style={styles.errorText}> {formIsInValid}</Text>}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
