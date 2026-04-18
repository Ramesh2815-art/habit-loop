import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hook';


const Task = () => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const dispatch = useAppDispatch();
    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 border border-gray-100">

            {/* Checkbox */}
            <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center
        ${tasks.completed ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
            >
                {tasks.completed && <span className="text-white text-xs">✔</span>}
            </div>

            {/* Content */}
            <div className="flex-1">
                <p
                    className={`text-sm font-medium ${tasks.completed ? "line-through text-gray-400" : "text-gray-800"
                        }`}
                >
                    {tasks.title}
                </p>

                <div className="flex items-center gap-3 text-xs mt-1 text-gray-400">
                    <span>{tasks.category}</span>

                    {/* Priority */}
                    <span
                        className={`font-medium ${tasks.priority === "High"
                                ? "text-red-500"
                                : tasks.priority === "Medium"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }`}
                    >
                        {tasks.priority}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Task