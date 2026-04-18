import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../store/hook";
import { toggleStatus, deleteTask, type task } from "./slice/taskSilce";

interface TaskProps {
    task: task;
}

const priorityConfig: Record<string, { dot: string; badge: string }> = {
    High:   { dot: "bg-rose-400",    badge: "bg-rose-50 text-rose-500 border-rose-100" },
    Medium: { dot: "bg-amber-400",   badge: "bg-amber-50 text-amber-600 border-amber-100" },
    Low:    { dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-600 border-emerald-100" },
};

const Task = ({ task }: TaskProps) => {
    const dispatch = useAppDispatch();
    const cfg = priorityConfig[task.priority] ?? priorityConfig.Low;

    return (
        <div className={`group flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-200
            ${task.completed
                ? "bg-gray-50 border-gray-100"
                : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-sm hover:shadow-indigo-50"}`}
        >
            <button
                onClick={() => dispatch(toggleStatus({ id: task.id }))}
                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${task.completed
                        ? "bg-indigo-500 border-indigo-500"
                        : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"}`}
            >
                {task.completed && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            <span className={`shrink-0 w-2 h-2 rounded-full ${cfg.dot}`} />

            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate transition-colors duration-200
                    ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {task.title}
                </p>
            </div>

            <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-lg border ${cfg.badge}`}>
                {task.priority}
            </span>

            <span className="shrink-0 text-[11px] text-gray-300 hidden group-hover:block">
                {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>

            <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-rose-400 transition-all duration-150 p-1.5 rounded-lg hover:bg-rose-50"
            >
                <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
            </button>
        </div>
    );
};

export default Task;
