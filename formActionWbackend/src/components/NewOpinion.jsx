// import { useFormStatus } from 'react-dom'; //It can't be used in the same component as the form and form action (i.e. this component), only in nested component i.e.Submit.jsx.
import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);  // check below //In react 19, we can use just the "use" hook to access some context as an alternative to useContext. 

  async function shareOpinionAction(prevState, formData) {
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title must be at least 5 characters long.");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters long.");
    }

    if (!userName.trim()) {  //if it's false after trimming the userName
      errors.push("Please provide your name.");
    }

    if (errors.length > 0) {
      return {
        errors, // errors: errors
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    // submit to backend 
    await addOpinion({ title, body, userName }) //we have to add an async to the function whenever we're using await.
    return { errors: null }
  }

  const [formState, formAction, pending] = useActionState(shareOpinionAction, { errors: null });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} //JavaScript cannot access properties of undefined or null so we need to add the question mark so it checks before execution.
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.errors && (  //without the condition, just  {formState.errors.map((error) => ( // Will throw an error because check below...
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul> 
        )}
        <Submit />
      </form>
    </div>
  );
}

/**
 *  {formState.errors.map((error) => ( // Will throw an error. If formState.errors is undefined or null, calling .map() on it will throw an error because those types do not have the .map() method.
 * 
 * //The use hook(used in react 19 or higher) is also beneficial whenever we might want to use "useContext" hook inside a non component function such as if(){} statement and we can't use "useContext". Remember we can't use react hooks within non component functions. 
 * 
 */