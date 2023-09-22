import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManagerExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  // ? si no existe devuelve undefined sino el valor
  const editedExpenseId = route.params?.expenseId;

  // Convertir un valor en boolean (si existe true/false sino false)
  const isEditing = !!editedExpenseId;

  const seletedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

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

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Actualizar" : "Agregar"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={seletedExpense}
      />

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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
