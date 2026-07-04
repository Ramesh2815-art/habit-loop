import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

interface PostState {
    posts: Post[];
}

const seedPost = (title: string, content: string, author: string): Post => ({
    id: uuidv4(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

const initialState: PostState = {
    posts: [
        seedPost(
            "Building Habits That Actually Stick",
            "Most habits fail because we aim too big too early. Start with a version of the habit so small it feels almost silly, then let consistency do the compounding. Two minutes of reading every night beats an ambitious hour that never happens.",
            "Ramesh"
        ),
        seedPost(
            "Why Streaks Are Overrated",
            "A broken streak is not a broken habit. The people who succeed long-term are the ones who miss a day and come back the next, without guilt spiraling. Design your system for recovery, not perfection.",
            "Sathish"
        ),
        seedPost(
            "The Power of Habit Stacking",
            "Attach a new habit to something you already do every day. After I pour my morning coffee, I write one line in my journal. The existing routine becomes the trigger, and the new habit rides along for free.",
            "Palani"
        ),
        seedPost(
            "Tracking Without Obsessing",
            "Metrics are a mirror, not a scoreboard. Check your progress weekly instead of hourly, and look for trends rather than daily wins. The goal is awareness, not anxiety.",
            "Akash"
        ),
        seedPost(
            "Morning Routines for Busy People",
            "You do not need a 5 AM club membership. A good morning routine is just three intentional actions before you open your phone. Pick yours tonight and keep them under ten minutes total.",
            "Eric"
        ),
        seedPost(
            "Rest Days Are Part of the Loop",
            "Recovery is not the absence of progress — it is where progress consolidates. Schedule rest like you schedule work, and your habits will survive the weeks when life gets loud.",
            "Raja"
        ),
    ],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<{ title: string; content: string; author: string }>) => {
            state.posts.unshift({
                id: uuidv4(),
                title: action.payload.title,
                content: action.payload.content,
                author: action.payload.author,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        },
        updatePost: (state, action: PayloadAction<{ id: string; title: string; content: string; author: string }>) => {
            const post = state.posts.find((p) => p.id === action.payload.id);
            if (post) {
                post.title = action.payload.title;
                post.content = action.payload.content;
                post.author = action.payload.author;
                post.updatedAt = new Date().toISOString();
            }
        },
        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((p) => p.id !== action.payload);
        },
    },
});

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
