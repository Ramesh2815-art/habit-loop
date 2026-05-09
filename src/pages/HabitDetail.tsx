import { useParams, useNavigate } from 'react-router-dom'
import { faArrowLeft, faFire, faCode, faBolt, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface HabitData {
  title: string
  description: string
  progress: number
  streak: number
  category: string
  icon: IconDefinition
  iconBg: string
  iconColor: string
  keyTopics: string[]
}

const HABITS: Record<string, HabitData> = {
  'react-hooks': {
    title: 'React Custom Hooks',
    description:
      'Extract stateful logic out of components into reusable functions. Custom hooks let you share behaviour — not UI — across the entire app.',
    progress: 100,
    streak: 7,
    category: 'React',
    icon: faCode,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    keyTopics: ['useState & useEffect patterns', 'useFetch hook', 'useDebounce hook', 'useLocalStorage hook'],
  },
  'debouncing-throttling': {
    title: 'Debouncing & Throttling',
    description:
      'Control the frequency of expensive function calls. Debounce delays execution until inactivity; throttle limits calls to a fixed rate.',
    progress: 65,
    streak: 4,
    category: 'Performance',
    icon: faBolt,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    keyTopics: ['Debounce implementation', 'Throttle implementation', 'Search input optimization', 'Scroll event handling'],
  },
  'redux-fundamentals': {
    title: 'Redux Fundamentals',
    description:
      'Manage global application state predictably with a single store, pure reducer functions, and dispatched actions.',
    progress: 30,
    streak: 2,
    category: 'State Management',
    icon: faDatabase,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    keyTopics: ['Store & reducers', 'Actions & dispatching', 'Redux Toolkit slices', 'useSelector & useDispatch'],
  },
}

const HabitDetail = () => {
  const { habitId } = useParams<{ habitId: string }>()
  const navigate = useNavigate()
  const habit = habitId ? HABITS[habitId] : null

  if (!habit) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-gray-400 text-lg">Habit not found</p>
        <p className="text-sm text-gray-300 font-mono">
          habitId = <span className="text-indigo-400">"{habitId}"</span> has no match
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-indigo-500 hover:text-indigo-600 text-sm font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors w-fit"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Back
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${habit.iconBg} flex items-center justify-center flex-shrink-0`}>
            <FontAwesomeIcon icon={habit.icon} className={habit.iconColor} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-gray-800">{habit.title}</h1>
              <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                {habit.category}
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{habit.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Progress</p>
          <p className="text-3xl font-bold text-gray-800">{habit.progress}%</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${habit.progress}%` }}
            />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Current Streak</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-gray-800">{habit.streak}</p>
            <span className="text-gray-400 text-sm mb-1">days</span>
          </div>
          <FontAwesomeIcon icon={faFire} className="text-amber-400 mt-2" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Key Topics</p>
        <ul className="space-y-2">
          {habit.keyTopics.map((topic) => (
            <li key={topic} className="flex items-center gap-3 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-xs font-mono text-indigo-500">
        useParams() → habitId = <strong>"{habitId}"</strong>
      </div>
    </div>
  )
}

export default HabitDetail
