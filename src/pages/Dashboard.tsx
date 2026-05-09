import { faBookOpen, faCode, faDatabase, faBolt, faArrowUpRightFromSquare, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


interface Milestone {
    id: number;
    icon: typeof faBookOpen;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
    tag: string;
    tagBg: string;
    status: "completed" | "in-progress" | "upcoming";
    slug: string;
}

const MILESTONES: Milestone[] = [
    {
        id: 1,
        icon: faCode,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
        title: "React Custom Hooks",
        description: "Creating reusable logic across components by extracting stateful logic into custom hooks.",
        tag: "React",
        tagBg: "bg-violet-50 text-violet-600 border-violet-100",
        status: "completed",
        slug: "react-hooks",
    },
    {
        id: 2,
        icon: faBolt,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        title: "Debouncing & Throttling",
        description: "Performance optimization techniques for controlling the rate of function execution.",
        tag: "Performance",
        tagBg: "bg-amber-50 text-amber-600 border-amber-100",
        status: "completed",
        slug: "debouncing-throttling",
    },
    {
        id: 3,
        icon: faDatabase,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        title: "Redux Fundamentals",
        description: "Store, actions, reducers, and state management flow for predictable state architecture.",
        tag: "Redux",
        tagBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
        status: "completed",
        slug: "redux-fundamentals",
    },
];

const STATUS_STYLES = {
    completed:   { dot: "bg-emerald-400", label: "Completed",   chip: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    "in-progress": { dot: "bg-amber-400",   label: "In Progress", chip: "bg-amber-50 text-amber-600 border-amber-100" },
    upcoming:    { dot: "bg-gray-300",     label: "Upcoming",    chip: "bg-gray-50 text-gray-400 border-gray-100" },
};

const Dashboard = () => {
    const completedCount = MILESTONES.filter((m) => m.status === "completed").length;

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200">
                        <FontAwesomeIcon icon={faFire} className="text-white text-sm" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 leading-tight">My Learning Status</h1>
                        <p className="text-xs text-gray-400">Tracking progress · {completedCount} of {MILESTONES.length} completed</p>
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Topics Studied</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{MILESTONES.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-emerald-500 font-medium uppercase tracking-wide">Completed</p>
                    <p className="text-3xl font-bold text-emerald-500 mt-1">{completedCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide">Progress</p>
                    <p className="text-3xl font-bold text-indigo-500 mt-1">
                        {Math.round((completedCount / MILESTONES.length) * 100)}%
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                    <span className="text-sm font-bold text-indigo-600">
                        {Math.round((completedCount / MILESTONES.length) * 100)}%
                    </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                        style={{ width: `${(completedCount / MILESTONES.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Milestone cards */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-gray-50">
                    <p className="text-sm font-semibold text-gray-700">Learning Milestones</p>
                </div>
                <div className="flex flex-col divide-y divide-gray-50">
                    {MILESTONES.map((m) => {
                        const s = STATUS_STYLES[m.status];
                        return (
                            <div key={m.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors duration-150">
                                {/* Icon */}
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${m.iconBg} flex items-center justify-center`}>
                                    <FontAwesomeIcon icon={m.icon} className={`text-sm ${m.iconColor}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-semibold text-gray-800">{m.title}</p>
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-lg border ${m.tagBg}`}>
                                            {m.tag}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{m.description}</p>
                                </div>

                                {/* Status badge */}
                                <div className={`flex-shrink-0 flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${s.chip}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                    {s.label}
                                </div>

                                {/* Dynamic route link */}
                                <Link
                                    to={`/habits/${m.slug}`}
                                    className="flex-shrink-0 flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
                                >
                                    View
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
