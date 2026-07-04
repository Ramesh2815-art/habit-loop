import { faMagnifyingGlass, faPenToSquare, faPlus, faTrash, faUserGroup, faUserSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useState } from "react";
import { addUser, deleteUser, toggleUserStatus, updateUser, type AppUser, type UserRole } from "../components/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";

type StatusFilter = "All" | "Active" | "Inactive";

const ROLES: { value: UserRole; badge: string }[] = [
    { value: "Admin", badge: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { value: "Editor", badge: "bg-amber-50 text-amber-600 border-amber-200" },
    { value: "Viewer", badge: "bg-emerald-50 text-emerald-600 border-emerald-200" },
];

const STATUS_FILTERS: StatusFilter[] = ["All", "Active", "Inactive"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
    name: string;
    email: string;
    role: UserRole;
}

const emptyForm: FormState = { name: "", email: "", role: "Viewer" };

const Users = () => {
    const users = useAppSelector((state) => state.users.users);
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
    const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [error, setError] = useState("");

    const { total, activeCount, inactiveCount, adminCount } = useMemo(() => {
        const active = users.filter((u) => u.status === "Active").length;
        return {
            total: users.length,
            activeCount: active,
            inactiveCount: users.length - active,
            adminCount: users.filter((u) => u.role === "Admin").length,
        };
    }, [users]);

    const filteredUsers = useMemo(() => {
        const q = search.trim().toLowerCase();
        return users.filter((u) => {
            if (statusFilter !== "All" && u.status !== statusFilter) return false;
            if (roleFilter !== "All" && u.role !== roleFilter) return false;
            if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
            return true;
        });
    }, [users, search, statusFilter, roleFilter]);

    const openAddModal = useCallback(() => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setModalOpen(true);
    }, []);

    const openEditModal = useCallback((user: AppUser) => {
        setEditingId(user.id);
        setForm({ name: user.name, email: user.email, role: user.role });
        setError("");
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
        setError("");
    }, []);

    const handleSubmit = useCallback(() => {
        const name = form.name.trim();
        const email = form.email.trim().toLowerCase();

        if (!name) return setError("Name is required");
        if (!EMAIL_REGEX.test(email)) return setError("Enter a valid email address");
        const duplicate = users.some((u) => u.email.toLowerCase() === email && u.id !== editingId);
        if (duplicate) return setError("A user with this email already exists");

        if (editingId) {
            dispatch(updateUser({ id: editingId, name, email, role: form.role }));
        } else {
            dispatch(addUser({ name, email, role: form.role }));
        }
        closeModal();
    }, [form, users, editingId, dispatch, closeModal]);

    const handleDelete = useCallback((user: AppUser) => {
        if (window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
            dispatch(deleteUser(user.id));
        }
    }, [dispatch]);

    const roleBadge = (role: UserRole) => ROLES.find((r) => r.value === role)!.badge;

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
                        <FontAwesomeIcon icon={faUserGroup} className="text-white text-sm" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 leading-tight">User Management</h1>
                        <p className="text-xs text-gray-400">Manage team members and their roles</p>
                    </div>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{total}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-emerald-500 font-medium uppercase tracking-wide">Active</p>
                    <p className="text-3xl font-bold text-emerald-500 mt-1">{activeCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-rose-400 font-medium uppercase tracking-wide">Inactive</p>
                    <p className="text-3xl font-bold text-rose-400 mt-1">{inactiveCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide">Admins</p>
                    <p className="text-3xl font-bold text-indigo-500 mt-1">{adminCount}</p>
                </div>
            </div>

            {/* Search + role filter */}
            <div className="flex items-center gap-3">
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 px-4 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-200 transition-all">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-300 text-sm" />
                    <input
                        type="text"
                        value={search}
                        placeholder="Search by name or email..."
                        className="flex-1 outline-none text-gray-700 placeholder-gray-300 text-sm py-3"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 transition-colors">
                            <FontAwesomeIcon icon={faXmark} className="text-sm" />
                        </button>
                    )}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1.5 px-3 py-2">
                    <button
                        onClick={() => setRoleFilter("All")}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-all duration-150
                            ${roleFilter === "All" ? "bg-gray-100 text-gray-700 border-gray-200" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                    >
                        All roles
                    </button>
                    {ROLES.map((r) => (
                        <button
                            key={r.value}
                            onClick={() => setRoleFilter(r.value)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-all duration-150
                                ${roleFilter === r.value ? r.badge : "border-transparent text-gray-400 hover:text-gray-600"}`}
                        >
                            {r.value}
                        </button>
                    ))}
                </div>
            </div>

            {/* User list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center gap-0 border-b border-gray-100 px-4">
                    {STATUS_FILTERS.map((f) => {
                        const count = f === "All" ? total : f === "Active" ? activeCount : inactiveCount;
                        return (
                            <button
                                key={f}
                                onClick={() => setStatusFilter(f)}
                                className={`relative px-4 py-3.5 text-sm font-medium transition-all duration-150 flex items-center gap-2
                                    ${statusFilter === f ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                {f}
                                {count > 0 && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                                        ${statusFilter === f ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400"}`}>
                                        {count}
                                    </span>
                                )}
                                {statusFilter === f && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                    {filteredUsers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-200">
                            <FontAwesomeIcon icon={faUserSlash} className="text-5xl" />
                            <p className="text-sm font-medium text-gray-300">
                                {total === 0 ? "No users yet — click Add User to create one" : "No users match your filters"}
                            </p>
                        </div>
                    ) : (
                        filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className={`group flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-200
                                    ${user.status === "Inactive"
                                        ? "bg-gray-50 border-gray-100"
                                        : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-sm hover:shadow-indigo-50"}`}
                            >
                                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                                    ${user.status === "Active" ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-gray-300"}`}>
                                    <span className="text-white text-xs font-bold">{user.name[0]?.toUpperCase()}</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${user.status === "Inactive" ? "text-gray-400" : "text-gray-700"}`}>
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                </div>

                                <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-lg border ${roleBadge(user.role)}`}>
                                    {user.role}
                                </span>

                                <button
                                    onClick={() => dispatch(toggleUserStatus({ id: user.id }))}
                                    title={user.status === "Active" ? "Deactivate user" : "Activate user"}
                                    className={`shrink-0 relative w-9 h-5 rounded-full transition-colors duration-200
                                        ${user.status === "Active" ? "bg-emerald-400" : "bg-gray-200"}`}
                                >
                                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
                                        ${user.status === "Active" ? "left-[18px]" : "left-0.5"}`} />
                                </button>

                                <span className="shrink-0 text-[11px] text-gray-300 hidden group-hover:block">
                                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </span>

                                <button
                                    onClick={() => openEditModal(user)}
                                    className="shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-indigo-500 transition-all duration-150 p-1.5 rounded-lg hover:bg-indigo-50"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-[11px]" />
                                </button>
                                <button
                                    onClick={() => handleDelete(user)}
                                    className="shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-rose-400 transition-all duration-150 p-1.5 rounded-lg hover:bg-rose-50"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add / Edit modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm" onClick={closeModal}>
                    <div
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800">{editingId ? "Edit User" : "Add User"}</h2>
                            <button onClick={closeModal} className="text-gray-300 hover:text-gray-500 transition-colors">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                            <input
                                type="text"
                                value={form.name}
                                autoFocus
                                placeholder="Full name"
                                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 transition-all placeholder-gray-300"
                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                placeholder="name@example.com"
                                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 transition-all placeholder-gray-300"
                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Role</label>
                            <div className="flex items-center gap-2">
                                {ROLES.map((r) => (
                                    <button
                                        key={r.value}
                                        onClick={() => setForm((f) => ({ ...f, role: r.value }))}
                                        className={`flex-1 text-sm px-3 py-2 rounded-xl font-medium border transition-all duration-150
                                            ${form.role === r.value ? r.badge : "border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300"}`}
                                    >
                                        {r.value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs text-rose-500 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">{error}</p>
                        )}

                        <div className="flex items-center gap-3 mt-1">
                            <button
                                onClick={closeModal}
                                className="flex-1 border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
                            >
                                {editingId ? "Save Changes" : "Add User"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
