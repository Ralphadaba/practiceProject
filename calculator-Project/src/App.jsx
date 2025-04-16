import { useState } from 'react';

import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import Results from './components/Results.jsx';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) { 
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,     // Spread the previous user Input (keeps the existing fields)
        [inputIdentifier]: +newValue,  // Update only the specific field that was changed
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      <Results input={userInput} />
    </>
  );
}

export default App; 


/**
 * The prev... will ensure that when state is updated, the previous values are
 * retained and not changed, except for the one field or value you set to change.
 * 
 * [inputIdentifier]: +newValue // In this line ofcode, we need the square bracket because if
 * we update the state ARRAY like this; inputIdentifier: +newValue, it will update the state by replacing whatever 
 * is there with inputIdentifier as a key for the "+new value".
 * 
 */
