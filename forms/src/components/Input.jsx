export default function Input({ label, id, error, ...props }) { //we want to set id on htmlFor too not just on id thats why we didn't leave it to ...props
    return (
        <div className="control no-margin">
            <label htmlFor="email">{label}</label>
            <input id={id} {...props} />
            <div className="control-error">{error && <p>{error}</p>}</div>
        </div>
    );
} 