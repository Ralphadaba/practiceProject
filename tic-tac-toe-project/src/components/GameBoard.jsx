export default function GameBoard({ onSelectSquare, board }) {
    return <ol id="game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => ( 
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                                {playerSymbol}
                            </button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
}





/**
 * To understand the code logic above, we basically want to create a button for every 
 * data within the 3 square brackets(playerSymbol) which is also within the 1 square bracket(row).
 * To do that we need to access each of the 3 bracket or arrays (row) then we can now access each value 
 * within the 3 square brackets individually and create a button for each of them through map.
 * 
 * 
 * The gameboard above is arranged horizontally because of the flex in the code below 
 * #game-board ol {
   display: flex;          which is in index.css
 * 
 *  const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; 
 * The above code is updating object state immutably. The prevGameBoard is the initialGameBoard assigned to 
 * it automatically by react when used in setGameBoard. the code will map through all the elements in the array and nested array
 * and assign it to updatedBoard which can then be updated or changed
 * 
 * () => handleSelectSquare(rowInd, colIndex)
 */

  // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) =>{
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; //Updating object state immutably, which is simply creating a copy of the state and updating that copy instead of the state itself
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })

    //     onSelectSquare(); //We're executing a function that's defined outside of this component from inside the component
    // }