import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

const ManagerExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  // ? si no exioste devuelve undefined sino el valor
  const editedExpenseId = route.params?.expenseId;

  // Convertir un valor en boolean (si existe true/false sino false)
  const isEditing = !!editedExpenseId;

  // Evitar parpadeo de la vista
  useLayoutEffect(() => {
    // Agregar opciones a la pantalla (=> title)
    navigation.setOptions({
      title: isEditing ? "Editar Gasto" : "Agregar Gasto",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test-UPDATE",
        amount: 25.16,
        date: new Date("2023-09-20"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test-ADD",
        amount: 19.99,
        date: new Date("2023-09-20"),
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancelar
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Actualizar" : "Agregar"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManagerExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
