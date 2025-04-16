// import { useState } from 'react';
// import questionsData from './questions.js'
import { useState } from "react";
import Header from "./components/Header";
import Question from "./components/Question.jsx";
import questionsDataa from './questions.js';

const shuffledData = [...questionsDataa].sort(() => 0.5 - Math.random());

let currentShuffleIndex = 0;

function App() {
    const [shuffledQuestion, setShuffledQuestion] = useState(shuffledData[currentShuffleIndex]);
    console.log(shuffledData); 

    function handleClick() {
        setShuffledQuestion((prevState) => {
            currentShuffleIndex += 1;
            return {
                ...prevState,
                ...shuffledData[currentShuffleIndex]
            }
        });
    }

    return (
        <>
            <Header />
            <main>
                <Question {...shuffledQuestion} next={handleClick} />
            </main>

        </>
    );
}

export default App;
