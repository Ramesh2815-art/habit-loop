import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Task from "../components/Task"
import { addTask, type task } from "../components/slice/taskSilce"
import { useAppDispatch } from "../store/hook"

const Todo = () => {
    const [totalTask, setTotalTask] = useState(2)
    const [compeletedTask, setcompeletedTask] = useState(5)
    const [percentage, setPercentage] = useState(totalTask / compeletedTask * 100)
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Low");
    const dispatch = useAppDispatch();

    const addTaskHandler  = () => {
        const task = {
            title, priority: priority
        }
        dispatch(addTask(task))

    }
    return (
        <>
            <header className='w-full flex flex-col gap-3 p-3'>
                <h1 className='text-4xl font-bold'>Todo List</h1>
                <span className="font-stretch-50%">{totalTask} of {compeletedTask} task compeleted</span>
                <div className='h-2 w-full rounded-full overflow-hidden bg-gray-200'>
                    <div className='h-full bg-linear-to-br from-indigo-500 to-purple-600 transition-all duration-100 p-6' style={{ width: `${percentage}%` }}></div>
                </div>
            </header>
            <div className="mx-8 bg-white shadow-md rounded-2xl px-4 py-3 flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="flex-1 outline-none text-gray-500 placeholder-gray-400"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full bg-green-400"></span>
                        <span className="h-3 w-3 rounded-full bg-orange-400"></span>
                        <span className="h-3 w-3 rounded-full bg-red-400"></span>
                    </div>
                    <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow" onClick={addTaskHandler}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            <main className="flex flex-col items-center justify-center p-3">
                <Task />
            </main>
        </>
    )
}

export default Todo