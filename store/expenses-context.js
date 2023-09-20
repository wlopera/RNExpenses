import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Un par de zapatos",
    amount: 59.99,
    date: new Date("2023-09-15"),
  },
  {
    id: "e2",
    description: "Un par de pantalones",
    amount: 89.29,
    date: new Date("2023-01-05"),
  },
  {
    id: "e3",
    description: "Algunas bananas",
    amount: 5.99,
    date: new Date("2023-09-14"),
  },
  {
    id: "e4",
    description: "Un libro",
    amount: 14.99,
    date: new Date("2023-02-19"),
  },
  {
    id: "e5",
    description: "Otro libro",
    amount: 18.99,
    date: new Date("2023-02-18"),
  },
  {
    id: "e6",
    description: "Un par de zapatos",
    amount: 59.99,
    date: new Date("2023-08-19"),
  },
  {
    id: "e7",
    description: "Un par de pantalones",
    amount: 89.29,
    date: new Date("2023-01-05"),
  },
  {
    id: "e8",
    description: "Algunas bananas",
    amount: 5.99,
    date: new Date("2023-08-01"),
  },
  {
    id: "e9",
    description: "Un libro",
    amount: 14.99,
    date: new Date("2023-09-19"),
  },
  {
    id: "e10",
    description: "Otro libro",
    amount: 18.99,
    date: new Date("2023-09-18"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state[updatableExpenseIndex];
      const updatableItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatableItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
