import { useState } from "react";

export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();  //check below for detailed explanation //prevents the default sending of http requests when a form button is clicked.  

    const fd = new FormData(event.target); //Built-in browser feature to manage and store input data
    const acquisitionChannel = fd.getAll('acquisition');  //idg this // we want to get all values with the name acquisition in <fieldset> below
    const data = Object.fromEntries(fd.entries()); //entries from the fd object will give us sort of an array of all inputfields and their values. Calling Object.fromEnteries will give us key value pairs for all our enteries
    data.acquisition = acquisitionChannel; //merging acqisi.. into the data object.

    if (data.password !== data['confirm-password']) { //we use ['confirm-password'] instead of just data.confirm-password because the '-' is an invalid character   //don't forget that we captured the form data in 'data' above and we can access 'password' because of the name attribute set to it (name='password').
      setPasswordsAreNotEqual(true);
      return; //If true or they are nt equal, don't execute any further code i.e. the code below, conso... won't execute.
    }

    console.log(data);

    // event.target.reset();  // will clear the form when you click reset and even sign up too
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required //with required prop, you can validate the user input. The browser won't allow that input field to be empty if submitted. It also takes the type into consideration and won't allow values thta are not email in this instance 
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6} //entered password must be at least 6 characters long
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">
            {passwordsAreNotEqual && <p>Passwords must match.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
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
          <input      //the check boxes are optional so no need to add required
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat"  //the type="reset" automatically resets the input field
        >
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}


/**
 * event.preventDefault(); // The default browser behaviour for a button in a form is that when the button is clicked,
 * the buttons will submit the form which means that a http request is created and sent to the server serving the site
 * which reloads the page. This page reload could be okay in static webpages as the whole page reloads... But in SPAs 
 * or applications with complex user interactions such as react applications, the default 
 * reload behavior is usually undesirable as we don't want the whole page to reload because it ca lead to UI inconsistencies, 
 * which is why it’s overridden with event.preventDefault().
 * 
 * 
 * const fd = new FormData(event.target); // The target is the form 
 * This will return a formdata object that will give you access to data that was given 
 * to all inputs in that data form. All the individual input fields, select fields too must however have a name prop set to it 
 * 
 */