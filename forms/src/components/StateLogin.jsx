import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  const {
    value: emailValue,     //we need an alias, e.g. emailValue to clearly identify which value it is because we are using it multiple times i.e. for both email and password.
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value)
  ); 

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError
  } = useInput('', (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault(); //used with onSubmit To prevent the default browser behavior which generates and sends http requests which reloads the app or something so the function can work.

    if (emailHasError || passwordHasError) {
      return; 
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}     //will be triggered whenever the input loses focus
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && 'Please enter a valid email!'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password!'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}


/**
 * [identifier]: value // Note that if you don't add the square bracket around identifier, it will be treated as a property named 
 * 'identifier'. This means the resulting object will have a property named "identifier", instead of the value stored in the identifier variable.
 * This is not what you want; you want the key to be dynamic.
 * 
 *  Instead wrap it in a square bracket to access the property you would use to set the state.
 * 
 * PREV CODE LOCKS before they was moved to the custom hook, useInput
 * 
 *  // const [enteredEmail, setEnteredEmail] = useState();
  // const [enteredPassword, setEnteredPassword] = useState();
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });
 * 
 * 
 *  // const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  // const passwordIsInvalid = didEdit.password && enteredValues.password.trim(). length < 6;
  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
 * 
 * 
 */