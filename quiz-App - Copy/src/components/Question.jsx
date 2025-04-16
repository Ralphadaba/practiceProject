export default function Question({ id, text, answers, next }) {
    return (
        <div id="quiz" key={id}>
            <div id="question">
                <progress />
                <h2>{text}</h2>
                <ol id="answers">
                    {answers.map((answer, index) => (
                        <li className="answer" key={index}>
                            <button onClick={next}>{answer}</button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}