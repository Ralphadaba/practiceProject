import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('SETTING TIMEOUT');
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]); //the useEffect function gets triggered only if one of the 2 dependencies changes. 
//Note that when the component runs, the dependencies are both triggered so useEffect always runs on the first COMPONENT render regardless of its dependency array. 

    useEffect(() => {
        console.log('SETTING INTERVAL');
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);



    return (
        <progress
            id="question--time"
            max={timeout}
            value={remainingTime}
            className={mode}
        />
    )
}
