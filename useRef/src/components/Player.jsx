import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef(); // A reference (like a variable) is created to capture the value that will be entered in the input field. 

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ''
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} // 'ref' is a prop used to connect the useRef to the jsx element, like input
          type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}


/**
 * {enteredPlayerName ?? 'unknown entity'} is the same as
 * {enteredPlayerName ? enteredPlayerName : 'unknown entity'}
 */