import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {history.map((count) => (
        <HistoryItem key={count.id} count={count.value} /> //The index used as a key can cause positional conflict when changed.
      ))}
    </ol>
  );
}


/**
 * {history.map((count, index) => (
 * <HistoryItem key={index} count={count} /> //The index used as a key can cause positional conflict when changed.
 *   The index is not a value that's strictly mapped to a specific count value instead it always stays the same for 
 * values in that position so if a particular value was 2 once another value is added to the array, it moves to three
 * an therefore the value changes from 2 o 3.
 * 
 * To fix, you can generate a random id for each number.
 * 
 */