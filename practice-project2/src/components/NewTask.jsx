import { useState } from "react";

export default function NewTask({ onAdd }) {
    //const [enteredTask, setEnteredTask] = useState(); Th initial value is undefined because nothing is passed to it initially and it is then updated by a string which can lead to an error
    const [enteredTask, setEnteredTask] = useState('');


    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        if (enteredTask.trim() === '') {
            return;  //This will ensure that the code below doesn't execute if it returns true 
        }
        onAdd(enteredTask)
        setEnteredTask('')

    }

    return (
        <div className="flex items-center gap-4">
            <input
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                onChange={handleChange}
                value={enteredTask}
            />
            <button
                className="text-stone-700 hover:text-stone-950"
                onClick={handleClick}
            >
                Add Task
            </button>
        </div>
    );
} 