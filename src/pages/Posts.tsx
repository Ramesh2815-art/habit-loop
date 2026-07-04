import { faFeather, faMagnifyingGlass, faNewspaper, faPenToSquare, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useState } from "react";
import { addPost, deletePost, updatePost, type Post } from "../components/slice/postSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";

interface FormState {
    title: string;
    content: string;
    author: string;
}

const emptyForm: FormState = { title: "", content: "", author: "" };

const AVATAR_COLORS = [
    "from-indigo-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-sky-500 to-blue-600",
];

const avatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const Posts = () => {
    const posts = useAppSelector((state) => state.posts.posts);
    const users = useAppSelector((state) => state.users.users);
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState("");
    const [authorFilter, setAuthorFilter] = useState<string>("All");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const authors = useMemo(
        () => [...new Set(posts.map((p) => p.author))].sort((a, b) => a.localeCompare(b)),
        [posts]
    );

    const filteredPosts = useMemo(() => {
        const q = search.trim().toLowerCase();
        return posts.filter((p) => {
            if (authorFilter !== "All" && p.author !== authorFilter) return false;
            if (q && !p.title.toLowerCase().includes(q) && !p.content.toLowerCase().includes(q) && !p.author.toLowerCase().includes(q)) return false;
            return true;
        });
    }, [posts, search, authorFilter]);

    const openAddModal = useCallback(() => {
        setEditingId(null);
        setForm({ ...emptyForm, author: users.find((u) => u.status === "Active")?.name ?? "" });
        setError("");
        setModalOpen(true);
    }, [users]);

    const openEditModal = useCallback((post: Post) => {
        setEditingId(post.id);
        setForm({ title: post.title, content: post.content, author: post.author });
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
        const title = form.title.trim();
        const content = form.content.trim();

        if (!title) return setError("Title is required");
        if (!content) return setError("Content is required");
        if (!form.author) return setError("Select an author");

        if (editingId) {
            dispatch(updatePost({ id: editingId, title, content, author: form.author }));
        } else {
            dispatch(addPost({ title, content, author: form.author }));
        }
        closeModal();
    }, [form, editingId, dispatch, closeModal]);

    const handleDelete = useCallback((post: Post) => {
        if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
            dispatch(deletePost(post.id));
        }
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
                        <FontAwesomeIcon icon={faNewspaper} className="text-white text-sm" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 leading-tight">Posts</h1>
                        <p className="text-xs text-gray-400">Articles written by your team</p>
                    </div>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    New Post
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total Posts</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{posts.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide">Authors</p>
                    <p className="text-3xl font-bold text-indigo-500 mt-1">{authors.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-emerald-500 font-medium uppercase tracking-wide">Showing</p>
                    <p className="text-3xl font-bold text-emerald-500 mt-1">{filteredPosts.length}</p>
                </div>
            </div>

            {/* Search + author filter */}
            <div className="flex items-center gap-3">
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 px-4 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-200 transition-all">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-300 text-sm" />
                    <input
                        type="text"
                        value={search}
                        placeholder="Search posts by title, content or author..."
                        className="flex-1 outline-none text-gray-700 placeholder-gray-300 text-sm py-3"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 transition-colors">
                            <FontAwesomeIcon icon={faXmark} className="text-sm" />
                        </button>
                    )}
                </div>
                <select
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm text-sm text-gray-600 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
                >
                    <option value="All">All authors</option>
                    {authors.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
            </div>

            {/* Post list */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-2">
                {filteredPosts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 gap-3 text-gray-200">
                        <FontAwesomeIcon icon={faFeather} className="text-5xl" />
                        <p className="text-sm font-medium text-gray-300">
                            {posts.length === 0 ? "No posts yet — click New Post to write one" : "No posts match your filters"}
                        </p>
                    </div>
                ) : (
                    filteredPosts.map((post) => {
                        const expanded = expandedId === post.id;
                        return (
                            <article
                                key={post.id}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50 transition-all duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColor(post.author)} flex items-center justify-center`}>
                                        <span className="text-white text-sm font-bold">{post.author[0]?.toUpperCase()}</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <span className="font-semibold text-gray-600">{post.author}</span>
                                            <span>·</span>
                                            <span>{formatDate(post.createdAt)}</span>
                                            {post.updatedAt !== post.createdAt && (
                                                <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">edited</span>
                                            )}
                                        </div>
                                        <h2 className="text-base font-bold text-gray-800 mt-1 leading-snug">{post.title}</h2>
                                        <p className={`text-sm text-gray-500 mt-1.5 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
                                            {post.content}
                                        </p>
                                        <button
                                            onClick={() => setExpandedId(expanded ? null : post.id)}
                                            className="text-xs font-medium text-indigo-500 hover:text-indigo-700 mt-2 transition-colors"
                                        >
                                            {expanded ? "Show less" : "Read more"}
                                        </button>
                                    </div>

                                    <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                        <button
                                            onClick={() => openEditModal(post)}
                                            className="text-gray-300 hover:text-indigo-500 transition-all duration-150 p-2 rounded-lg hover:bg-indigo-50"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post)}
                                            className="text-gray-300 hover:text-rose-400 transition-all duration-150 p-2 rounded-lg hover:bg-rose-50"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })
                )}
            </div>

            {/* Add / Edit modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm" onClick={closeModal}>
                    <div
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800">{editingId ? "Edit Post" : "New Post"}</h2>
                            <button onClick={closeModal} className="text-gray-300 hover:text-gray-500 transition-colors">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title</label>
                            <input
                                type="text"
                                value={form.title}
                                autoFocus
                                placeholder="Post title"
                                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 transition-all placeholder-gray-300"
                                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Author</label>
                            <select
                                value={form.author}
                                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 transition-all cursor-pointer"
                            >
                                <option value="" disabled>Select an author</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.name}>
                                        {u.name}{u.status === "Inactive" ? " (inactive)" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Content</label>
                            <textarea
                                value={form.content}
                                rows={5}
                                placeholder="Write your article..."
                                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 transition-all placeholder-gray-300 resize-none"
                                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                            />
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
                                {editingId ? "Save Changes" : "Publish Post"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
