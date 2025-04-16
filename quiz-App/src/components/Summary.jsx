import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]
);

const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
);
const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
);
const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersShare}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">answeres correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswersShare}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';

                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }

                    return (   
                        <li key={index}> 
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    );
                })}

            </ol>
        </div>
    );
}


/**
 * //Try avoiding the usage of index as an identifier because the index is 
 * the position of ... and if there is a swap in position, the identity will change.
 * We just used it here because we cannot have 2 same children as key props i.e. if we skip 
 * a question twice or thrice, it will return null as the key prop for those 2 or 3 skipped questions.
 * However, it doesn' affect us here cause the order of the array doesn't change
 * 
 */