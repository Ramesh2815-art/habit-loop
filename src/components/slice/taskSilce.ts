import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    dueDate?: Date;
    category?: string;
    priority: "High" | "Medium" | "Low";
};

interface taskState {
    tasks: task[];
}

const initialState: taskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: uuidv4(),
                title: action.payload.title,
                completed: false,
                priority: action.payload.priority,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
        },
        toggleStatus: (state, action) => {
            const task = state.tasks.find((t) => t.id === action.payload.id)
            if (task) {
                task.completed = !task.completed;
                task.updatedAt = new Date().toISOString();
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        }
    }
})


export const { addTask, toggleStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;