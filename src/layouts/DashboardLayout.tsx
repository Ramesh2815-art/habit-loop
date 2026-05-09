import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex items-center gap-1 border-b border-gray-100 pb-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          Settings
        </NavLink>
      </div>

      <Outlet />
    </div>
  )
}

export default DashboardLayout
