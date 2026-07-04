import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../components/slice/taskSilce'
import userReducer from '../components/slice/userSlice'


export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        users: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;