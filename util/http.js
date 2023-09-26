import axios from "axios";

const BACKEND_URL =
  "https://react-native-expenses-14061-default-rtdb.firebaseio.com";

export const storeExpenses = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

// Promesa retornada por axios get y transaformada en data de gastos
export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  //console.log("Datos de la consulta Firebase. Gastos: ", response);
  const expenses = [];

  const data = response.data;

  for (const key in data) {
    expenses.push({
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    });
  }

  return expenses;
};

export function updateExpense(id, expensedata) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expensedata);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
