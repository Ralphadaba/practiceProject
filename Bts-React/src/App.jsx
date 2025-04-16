import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
    setChosenCount((prevChosenCount) => prevChosenCount + 1); //prevChosenCount ensures we're working with the most current or up to date state. 
    console.log(chosenCount); // won't work
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} /> 
      </main>
    </>
  );
}

export default App;

/**
 * With key used in Counter, it will render the component like its rendering it for the first time again.
 * You should use if you have some state that will change to cause it to RESET
 */