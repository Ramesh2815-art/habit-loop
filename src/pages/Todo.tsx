import { faCheckDouble, faPlus, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useMemo, useCallback } from "react";
import Task from "../components/Task";
import { addTask } from "../components/slice/taskSilce";
import { useAppDispatch, useAppSelector } from "../store/hook";

type Priority = "Low" | "Medium" | "High";
type Filter = "All" | "Active" | "Completed";

const PRIORITY_OPTIONS: { value: Priority; dot: string; pill: string }[] = [
    { value: "Low", dot: "bg-emerald-400", pill: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { value: "Medium", dot: "bg-amber-400", pill: "bg-amber-50 text-amber-600 border-amber-200" },
    { value: "High", dot: "bg-rose-400", pill: "bg-rose-50 text-rose-600 border-rose-200" },
];

const FILTERS: Filter[] = ["All", "Active", "Completed"];

const Todo = () => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>("Low");
    const [filter, setFilter] = useState<Filter>("All");

    useEffect(() => {
        document.title = tasks.length > 0 ? `HabitLoop (${tasks.length} tasks)` : "HabitLoop";
    }, [tasks.length]);

    const { completedCount, activeCount, total, percentage } = useMemo(() => {
        const completed = tasks.filter((t) => t.completed).length;
        const active = tasks.length - completed;
        return {
            completedCount: completed,
            activeCount: active,
            total: tasks.length,
            percentage: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
        };
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        if (filter === "Active") return tasks.filter((t) => !t.completed);
        if (filter === "Completed") return tasks.filter((t) => t.completed);
        return tasks;
    }, [tasks, filter]);

    const addTaskHandler = useCallback(() => {
        if (!title.trim()) return;
        dispatch(addTask({ title: title.trim(), priority }));
        setTitle("");
    }, [title, priority, dispatch]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter") addTaskHandler();
    }, [addTaskHandler]);

    const selectedPriority = useMemo(
        () => PRIORITY_OPTIONS.find((o) => o.value === priority)!,
        [priority]
    );;

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
                    <FontAwesomeIcon icon={faListCheck} className="text-white text-sm" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 leading-tight">Todo List</h1>
                    <p className="text-xs text-gray-400">Manage your daily tasks</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{total}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-emerald-500 font-medium uppercase tracking-wide">Completed</p>
                    <p className="text-3xl font-bold text-emerald-500 mt-1">{completedCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide">Remaining</p>
                    <p className="text-3xl font-bold text-indigo-500 mt-1">{activeCount}</p>
                </div>
            </div>

            {total > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                        <span className="text-sm font-bold text-indigo-600">{percentage}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex items-center gap-3 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-200 transition-all">
                <div className="flex-1 flex items-center gap-3 px-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${selectedPriority.dot}`} />
                    <input
                        type="text"
                        value={title}
                        placeholder="Add a new task..."
                        className="flex-1 outline-none text-gray-700 placeholder-gray-300 text-sm py-2"
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex items-center gap-1.5 border-l border-gray-100 pl-3">
                    {PRIORITY_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setPriority(opt.value)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-all duration-150
                                ${priority === opt.value ? opt.pill + " border opacity-100" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                        >
                            {opt.value}
                        </button>
                    ))}
                </div>
                <button
                    onClick={addTaskHandler}
                    disabled={!title.trim()}
                    className="w-9 h-9 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 disabled:cursor-not-allowed text-white disabled:text-gray-300 rounded-xl flex items-center justify-center shadow-sm transition-all duration-150 flex-shrink-0"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center gap-0 border-b border-gray-100 px-4">
                    {FILTERS.map((f) => {
                        const count = f === "All" ? total : f === "Active" ? activeCount : completedCount;
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`relative px-4 py-3.5 text-sm font-medium transition-all duration-150 flex items-center gap-2
                                    ${filter === f
                                        ? "text-indigo-600"
                                        : "text-gray-400 hover:text-gray-600"}`}
                            >
                                {f}
                                {count > 0 && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                                        ${filter === f ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400"}`}>
                                        {count}
                                    </span>
                                )}
                                {filter === f && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                    {filteredTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-200">
                            <FontAwesomeIcon icon={faCheckDouble} className="text-5xl" />
                            <p className="text-sm font-medium text-gray-300">
                                {total === 0
                                    ? "No tasks yet — type above to add one"
                                    : filter === "Completed"
                                        ? "No completed tasks"
                                        : "All tasks done! 🎉"}
                            </p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => <Task key={task.id} task={task} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Todo;
