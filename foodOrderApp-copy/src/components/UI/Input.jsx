export default function Input({label, id, ...props}) {
    return <p className="control">
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required {...props} /> 
    </p>
}

/**
 * required ensures that the input must not be empty
 * 'name' is used with formData to extract the values entered by the user.
 * 
 */