import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import ManagerExpense from "./screens/ManagerExpense";
import RecentExpenses from "./screens/RecentExpenses";
import ALLExpenses from "./screens/ALLExpenses";

const Stack = createNativeStackNavigator();
const BottonTabs = createBottomTabNavigator();

import { GlobalStyles } from "./constants/style";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const ExpensesOverview = () => (
  <BottonTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: "orange",
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      // tintColor se hereda de headerTintColor
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate("ManagerExpense");
          }}
        />
      ),
    })}
  >
    <BottonTabs.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: "Gasto Reciente",
        tabBarLabel: "Reciente",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" color={color} size={size} />
        ),
      }}
    />
    <BottonTabs.Screen
      name="ALLExpenses"
      component={ALLExpenses}
      options={{
        title: "Gastos",
        tabBarLabel: "Gastos",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }}
    />
  </BottonTabs.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "orange",
            }}
          >
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManagerExpense"
              component={ManagerExpense}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
