import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type UserRole = "Admin" | "Editor" | "Viewer";
export type UserStatus = "Active" | "Inactive";

export interface AppUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    users: AppUser[];
}

const seedUser = (name: string, email: string, role: UserRole, status: UserStatus): AppUser => ({
    id: uuidv4(),
    name,
    email,
    role,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

const initialState: UserState = {
    users: [
        seedUser("Ramesh", "demo@habitloop.com", "Admin", "Active"),
        seedUser("Sathish", "sathish@habitloop.com", "Editor", "Active"),
        seedUser("Palani", "palani@habitloop.com", "Viewer", "Active"),
        seedUser("Eric", "eric@habitloop.com", "Editor", "Inactive"),
        seedUser("Akash", "akash@habitloop.com", "Viewer", "Active"),
        seedUser("Raja", "raja@habitloop.com", "Viewer", "Inactive"),
        seedUser("Syed", "syed@habitloop.com", "Editor", "Inactive"),
    ],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{ name: string; email: string; role: UserRole }>) => {
            state.users.push({
                id: uuidv4(),
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role,
                status: "Active",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        },
        updateUser: (state, action: PayloadAction<{ id: string; name: string; email: string; role: UserRole }>) => {
            const user = state.users.find((u) => u.id === action.payload.id);
            if (user) {
                user.name = action.payload.name;
                user.email = action.payload.email;
                user.role = action.payload.role;
                user.updatedAt = new Date().toISOString();
            }
        },
        toggleUserStatus: (state, action: PayloadAction<{ id: string }>) => {
            const user = state.users.find((u) => u.id === action.payload.id);
            if (user) {
                user.status = user.status === "Active" ? "Inactive" : "Active";
                user.updatedAt = new Date().toISOString();
            }
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((u) => u.id !== action.payload);
        },
    },
});

export const { addUser, updateUser, toggleUserStatus, deleteUser } = userSlice.actions;
export default userSlice.reducer;
