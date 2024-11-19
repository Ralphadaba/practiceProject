export default function Section({ title, children, ...props }) { 
    return (                
        <section {...props}> 
            <h2>{title}</h2>
            {children}
        </section>
    );
}

/* The "..." is called a rest property which tells javaScript to collect 
all other props that might be received on the Section component and merge 
them into a props object. This makes the component re-useable with any props
passed to it

In other words, which other arguments are assigned to any named 
prop at call time will be placed beside section where the props is placed
*/