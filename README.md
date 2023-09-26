# RNExpenses
App React Native Manejo de Gastos

### Ver documento: 
* \RNExpenses\doc\React Native - RNExpenses.docx
* \RNExpenses\React Native - Navigate-Drawer.docx

#### Salida
![Captura2](https://github.com/wlopera/RNExpenses/assets/7141537/72309ce9-d467-4482-81fa-2ac9b9a978ee)

![Captura3](https://github.com/wlopera/RNExpenses/assets/7141537/9002e161-05fe-488f-9d18-fef2f10be584)

![Captura](https://github.com/wlopera/RNExpenses/assets/7141537/dfd49324-0474-4a60-ba8d-0e648765c333)

### Validaciones

```
Agregar validaciones

Cambiar las entradas por objetos

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

Validar Data de envio

const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    // if (dataIsValid(expenseData)) {
    //   onSubmit(expenseData);
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



Retorno dle componente

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
```

### Agregar pantalla para agregar o modificar gastos

![Captura](https://github.com/wlopera/RNExpenses/assets/7141537/23ab6be2-637f-44eb-8b36-9046a2e3f0dc)

![Captura](https://github.com/wlopera/RNExpenses/assets/7141537/f3820030-2f74-419c-a62c-749ef4f70e0d)

### Backend Uso de Firebase
* util\http.js
```
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

  console.log("Datos de la consulta Firbase. Gastos: ", response);
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
```

* Ajustar componentes de ventanas que consumen esos servicios y Api de context utilizada [ver \RNExpenses\doc\React Native - RNExpenses.docx ]

![Captura](https://github.com/wlopera/RNExpenses/assets/7141537/de26997b-db1a-4a8e-9879-330292d8e0e8)

 ### Agregar Gasto
 ![add-2Captura](https://github.com/wlopera/RNExpenses/assets/7141537/89a5e673-4f0b-44cf-8642-df0e143ede20)

![addCaptura](https://github.com/wlopera/RNExpenses/assets/7141537/0f00969a-e20f-4874-a349-23c9284e8231)

 ### Modificar Gasto
![updateCaptura](https://github.com/wlopera/RNExpenses/assets/7141537/c434c4d6-832b-49fa-a209-85159a5e1769)

 ### Borrar Gasto
![deleteCaptura](https://github.com/wlopera/RNExpenses/assets/7141537/5697a091-8fa9-4c79-bb48-e9b825133641)

### Agregar Imagen o mensaje de carga

![Captura](https://github.com/wlopera/RNExpenses/assets/7141537/5e2923da-c5c8-475e-b22f-e788a21d857e)
![Captura2](https://github.com/wlopera/RNExpenses/assets/7141537/f12a9149-3686-41de-ae19-cdf4bf224d6e)



