import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom'; //allows you to access the dom

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialog = useRef();

    const userLost = remainingTime <= 0
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2); //"to.fixed(2)" will convert to 2 decimal places
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => { // In short we're passing ref to ref ( maybe call ref chaining ? ) 
        return {
            open() { //exposes this method or function returned to other components
                dialog.current.showModal()
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset} //To ensure that the dialog resets when Esc key is pressed
        >
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
            </p>
            <form method="dialog" //This will ensure that the dialog box closes when button is clicked without any extra code or logic.
                onSubmit={onReset} //built-in react prop & supported by the form element & is triggered when the form is submitted or when the 'close' button is clicked
            >
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal') //where the code should be placed in the index.html file 

    );
})

export default ResultModal;

/**
 *  className="result-modal" open //open will make the dialog box visible
 * >
 * the built-in backdrop or dim background will not be shown if you force it to be visible
 * with 'open'. you'll have to use showModal() method with useRef.
 * 
 * (Not sure, check word jottings for more explanation) useImperativeHandle(ref, () => { //If dialog changes to or is a div maybe from other 
 * developers you may be working with, showModal() in TimerChallenge component won't work 
 * on div because it will be pointing to the div so useImperativeHandle makes the returned 
 * object, open() available to other components
 * 
 * with useImper... You expose only the specific methods you want the parent component or other components to use (in this case, open()).
 * 
 * onClose={onReset} //when esc key is pressed, the dialog element allows the dialog box to close but 
 * it won't reset the component or app...To ensure that the dialog resets when Esc key is pressed, we have to add the reset function to onClose
 * 
 * 
 * UPDATED EXPLANATION ON USEIMPE...
 * //check word doc for more
 * The original dialog ref in the TimerChallenge component no longer binds to the <dialog> HTML element in the ResultModal component. 
 * It can only access and call the open() method, but not the HTML element itself.
 * This means that the ref can no longer use element-specific functions, it can only call methods defined in useImperativeHandle
 * 
 * 

 */