import { useAuth } from '../context/AuthContext'

const Settings = () => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Settings</h2>
        <p className="text-xs text-gray-400 mt-0.5">Nested route: /dashboard/settings</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Profile</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Name</span>
            <span className="text-sm font-medium text-gray-800">{user?.name}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-800">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-500">User ID</span>
            <span className="text-sm font-mono text-gray-400">{user?.id}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Preferences</p>
        <div className="space-y-4">
          {['Daily reminders', 'Progress notifications', 'Weekly summary'].map((label) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{label}</span>
              <div className="w-10 h-5 bg-indigo-500 rounded-full flex items-center justify-end px-0.5 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Settings
