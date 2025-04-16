import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

//forward ref is not necessary in react v19 and above.
export default function CartModal({ children, open, onClose, className = '' }) { //className could return undefined so we need to give it a default value (''). 
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current; // It is recommended to store the dialog.current in a const like this and use it accross component mount and about to unmount because... check below
        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}> 
            {children}
        </dialog>,
        document.getElementById('modal')
    );
};



/**
 * onClose ensures that the dialog is closed when the esc key is pressed
 * 
 * const modal = dialog.current; // ...it is possible for the value stored in the ref to have changed in between component mounting and unmounting. by assigning the ref value to a const modal... 
 * we are locking in the ref value so that exactly the same value is also used in the clean up effect function, return...
 * 
 * //check word doc for more //The original modal ref in the Header component no longer binds to the <dialog> HTML element in the CartModal component. 
 * It can only access and call the open() method, but not the HTML element itself.
 * This means that the ref can no longer use element-specific functions, it can only call methods defined in useImperativeHandle
 * 
 * The additional className is added because we want to be able to add additional styling from outside the component.
 * 
 * 
 * PREVIOUS(mine)
 * 
 * //forward ref is not necessary in react v19 and above.
 * const ResultModal = forwardRef(function CartModal({ selectedMeals }, ref) {  //forward ref is not necessary in react v19 and above.
    const modal = useRef();

    useImperativeHandle(ref, () => { //In short we're passing ref to ref ( maybe call ref chaining ? )
        return {
            open() {  //method exposed to other components
                modal.current.showModal(); //If it was a div returned below, the method returned here will be different.
            }
        };
    }); //research more  


    return createPortal(
        <dialog ref={modal} className="modal"> 
            <Cart selectedMeals={selectedMeals} />
            <form method="dialog" >
                <button>Close</button>
                <button>Go to Checkout</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;
 * 
 * 
 * 
 */