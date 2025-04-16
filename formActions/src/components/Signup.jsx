import { useActionState } from 'react';

import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength
} from '../util/validation'; 

//Note that if you're using state or props in the action function below, you shouldn't move it out ot the component function. 
function signupAction(prevFormState, formData) {  //need to pass prevF... to prevent an error idg, check below//when using the action prop, the form data OBJECT which contains the submitted input values in that form as properties, is created automatically by react.
  const email = formData.get('email');  //The 'name' prop is then the key that is used in formData to extract the values. 
  const password = formData.get('password'); //'password' is defined in the 'name' prop in password input and that's what we're using to extract the value
  const confirmPassword = formData.get('confirm-password');
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const role = formData.get('role');
  const terms = formData.get('terms');
  const acquisitionChannel = formData.getAll('acquisition'); // getAll makes sure that if all boxes are checked, we get back an array of ALL the values instead of just one value.

  let errors = [];

  if (!isEmail(email)) {
    errors.push('Invalid email address.');
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push('You must provide a password with at least six characters.');
  }

  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push('Passwords do not match.');
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push('Please provide both your first and last name.');
  }

  if (!isNotEmpty(role)) {
    errors.push('please select a role.');
  }

  if (!terms) {
    errors.push('You must agree to the terms and conditions.');
  }

  if (acquisitionChannel.length === 0) {
    errors.push('Please select at least one acquisition channel.');
  }

  if (errors.length > 0) {
    return {
      errors,     // the same as { errors: errors }  // we're returning an object and the key(the first errors), naming convention is up to you. We're passing the array 'errors' as a value to it.
      enteredValues: { //the input values disappear after the form is submitted(or after the formAction is executed which resets the form). the enteredValues, used in defaultValue below is to ensure that we get the values after submitting the form
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acquisitionChannel,
        terms,
      }
    };
  }

  return { errors: null }  //we want to set it to null if no errors on Submit so the fields can clear
}

export default function Signup() {


  const [formState, formAction] = useActionState(signupAction, { errors: null });// check below //The initial state value will be active if the action has not been executed.

  return (
    <form action={formAction} // action prop ensures that the function passed to it is executed when the form is submitted. It also calls the preventDefault for you behind the scenes thats whay we didn't use it again above as in the prev signup
    >
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}    //idg this //the question mark is because the enteredValues could be undefined but idg still
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password} //defaultValue ensures that after submitting, the values still remain in the input field
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div> 

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes('google')} //if the acquisition channel includes the word google, the checkbox should be checked.
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes('other')}

          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (  //without the condition, just  {formState.errors.map((error) => ( // Will throw an error because check below...
        <ul className="errors">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}


/**
 * 
 * const [formState, formAction] = useActionState(signupAction, { errors: null });
 * The formState in the above code first returns the initial value which is the {errors: null}. 
 * Once the action has been executed, the state will change to and store the returned values from the signupAction function.  
 * 
 * the formAction after formState just sort of wraps around the signupAction. In this way, it is our signupAction with more features added by react 
 * or with react being aware of it.
 * 
 * 
 * {formState.errors.map((error) => ( // Will throw an error. If formState.errors is undefined or null, calling .map() on it will throw an error because those types do not have the .map() method.
 * 
 * function signupAction(prevFormState, formData) { //prevFormState is basically the old form state. The action could be invoked multiple times so react 
 * gives you the last form state it was aware of in case you wanted to base your new state on that old state. 
 * 
 */
