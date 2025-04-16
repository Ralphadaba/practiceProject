import { useState, useCallback, useRef } from "react";

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from "./Summary.jsx"; 

export default function Quiz() {
    //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length  // userAnswers.length - 1 still shows the prevQuestion so we can add the styling before changing to next question          //derived state
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback( //this stores the answer selected in state so we can use the length to move to the next question
        function handleSelectAnswer(selectedAnswer) {

            setUserAnswers((prevUserAnswers) => {
                return [
                    ...prevUserAnswers,
                    selectedAnswer
                ];
            });
        }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]); //the "() => handleSelect..." is another function on its own returning a value so it needs to be wrapped with useCallback cause it can change on re-renders too

    if (quizIsComplete) {
        return (
            <Summary userAnswers= {userAnswers} />
        );
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex} //The component does not get recreated, React will unmount and re-mount this component when the key changes.
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>

    )
}

/**
 * answerState === '' ? userAnswers.length : userAnswers.length - 1;
 * The app needs to stay on the 1st question to show feedback (e.g., "Correct!" or "Wrong!") before moving on to the 2nd question.
Without -1, the app would prematurely move to the next question.
 * 
 * 
 * FROM UDEMY Q&A
 * 
 * > However, why did we also wrap () => handleSelectAnswer(null) around useCallback using 
 * handleSkipAnswer? Is it because its reference is also changing again and again, or is there another reason?
Yes.  You got it, because we are creating a brand new anonymous arrow function that calls the handleSelectAnswer 
function.  It's reference is also changing.


The purpose of this second useCallback is to create a new callback that wraps handleSelectAnswer and always 
calls it with null as an argument. This may be useful in the context of your quiz application to simulate a 
user skipping a question. By doing this, you ensure that handleSkipAnswer is also memoized and doesn't change 
on re-renders unless its dependencies change.
 */