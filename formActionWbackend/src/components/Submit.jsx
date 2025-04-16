import { useFormStatus } from 'react-dom'; //A hook created to be used with useFormState

export default function Submit() {
    const { pending } = useFormStatus(); //pending will return true or false depending on whether the submitted form is being submitted or not.

    return (  //pending will be true if the button is being submitted, so button will be disabled till it's done
        <p className="actions">
            <button type="submit" disabled={pending}>
                {pending ? 'Submitting...' : 'Submit'}
            </button>
        </p>
    );
}