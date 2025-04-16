export function useInput(defaultValue, validationFn) {  //custom created hook 
    // const [enteredEmail, setEnteredEmail] = useState();
    // const [enteredPassword, setEnteredPassword] = useState();
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
      } 
    
      function handleInputBlur() { //will be triggered whenever the input loses focus
        setDidEdit(true);
      }

      return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
      }
}

/**
 * Above, we're using a combined state
 * 
 */