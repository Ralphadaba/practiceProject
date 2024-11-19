import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(!isEditing); //this will set the state value to the opposite of what it currently is allternatively
    //setIsEditing(isEditing ? false : true);
    setIsEditing(editing => !editing);  // use a function instead because the new state value depends on the previous

    if (isEditing) {  //Triggered before Before isEditing is set to false
      onChangeName(symbol, playerName)
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>
  // let btnCaption = 'Edit'

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} /> //Value prop enables us to set the value thats shown in the input field
    // btnCaption = 'Save'
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}

/**
 * {!isEditing ? (<span className="player-name">{name}</span>):(<input></input>)}
 * 
 * setIsEditing(editing => !editing); /* more importantly, this will ensure that the updated state value from the first line will be passed to the second
   }                                    So you have a guarantee by react that you're always working with the current state value 
 */