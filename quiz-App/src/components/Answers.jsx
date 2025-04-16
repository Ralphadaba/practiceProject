import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) { //Only shuffle if it has not been defined. Obv, there would be no values in shuffledAnswers.current initialy or when the component executes so it will only run once, when the component executes
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            const isSelected = selectedAnswer === answer;
            let cssClass = '';

            if (answerState === 'answered' && isSelected) {
                cssClass = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                cssClass = answerState;
            }

            return (
                <li key={answer} className="answer">
                    <button
                        onClick={() => onSelect(answer)}
                        className={cssClass} disabled={answerState !== ''}
                    >
                        {answer}
                    </button>
                </li>
            );
        }

        )}
    </ul>
    );
}