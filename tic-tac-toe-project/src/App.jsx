import { useState } from 'react';

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: 'player 1',
  O: 'player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]; //We're creating a copy of the inner arrays so we're editing a brand new array instead of the initialGameBoard

  for (const turn of gameTurns) {   //we're extracting info from each turn that occurs from the object in the turns array(from game turns) through object destructuring
    const { square, player } = turn; //we're destructuring the turn array to pull the properties, square and player
    const { row, col } = square; // we're pulling the info from the nested square object (still destructuring)

    gameBoard[row][col] = player;  //deriving state
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner; //AKA let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  //const [hasWinner, setHasWinner] = useState(false); //redundant state. same with next line
  //const [activePlayer, setActivePlayer] = useState('X'); //Lifting state up/using 1 state for 2 diff components because App has access to both GameBoard and Player components

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 & !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, //this is to preserve the name of the player thats not changing(not sure)
        [symbol]: newName //js syntax that dynamically updates a property
      };
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className='highlight-player' >
        <Player
          initialName={PLAYERS.X}
          symbol="X"
          isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}
        />
        <Player
          initialName={PLAYERS.O}
          symbol="O"
          isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && (
        <GameOver winner={winner} onRestart={handleRestart} />
      )}
      <GameBoard
        onSelectSquare={handleSelectSquare}
        board={gameBoard}
      // activePlayerSymbol={activePlayer}
      />
    </div>
    <Log turns={gameTurns} />
  </main>;
}

export default App



/**
 * function handlePlayerNameChange(symbol, newName) {}
 * We used the function above to extract the playerName e.g (Max) and symbol
 * from player.jsx and then update it with the players state in App.jsx 
 */