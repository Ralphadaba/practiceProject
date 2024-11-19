//export default function TabButton(props) {
// return <li><button>{props.children}</button></li>   
//}    object destructuring is usedbelow and curlu braces is added

/* The isSelected ? active : ... code will give a particular button the 
 active styling if it returns true and the other after the : if false 
*/

export default function TabButton({ children, isSelected, ...props }) {
    return (
        <li>
            <button className={isSelected ? "active" : undefined} {...props}>
                {children}
            </button>
        </li>
    );
}  
