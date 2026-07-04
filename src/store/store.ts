import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../components/slice/taskSilce'
import userReducer from '../components/slice/userSlice'
import postReducer from '../components/slice/postSlice'


export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        users: userReducer,
        posts: postReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;