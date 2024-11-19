import { useRef } from "react";
import { useState } from "react";
import ResultModal from "./ResultModal";

// let timer;

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) { //if timer has expired
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000); 
    }

    function handleStart() {
        timer.current = setInterval(() => {  //setInterval will execute every time the timer expires
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}

/**
 * dialog.current holds a reference to the native <dialog> HTML element that is 
 * rendered in the ResultModal component, not the entire ResultModal component itself.
 * 
 * dialog.current is pointing to the <dialog> element, which is part of the rendered 
 * DOM. This allows you to call methods like showModal() or close() on the <dialog> element.
 * 
 * timer.current = setTimeout(() => {  //setTimeout will execute the function below after the 1000 millisecond delay.
 * 
 */