import { faCube, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { menuBar } from '../utils/Menu-item'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <div className='h-full w-full flex flex-col'>
            {/* Logo */}
            <div className='flex items-center gap-3 px-5 pt-6 pb-5'>
                <div className='w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200'>
                    <FontAwesomeIcon icon={faCube} className='text-white text-xl' />
                </div>
                <div className='flex flex-col leading-tight'>
                    <span className='text-base font-bold text-gray-800 tracking-tight'>HabitLoop</span>
                    <span className='text-[11px] text-gray-400 font-medium'>Track your progress</span>
                </div>
            </div>

            {/* Divider */}
            <div className='mx-4 mb-4 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent' />

            {/* Nav label */}
            <p className='px-5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400'>Menu</p>

            {/* Menu items */}
            <nav className='flex flex-col gap-1 px-3'>
                {menuBar.map((menu) => (
                    <NavLink
                        key={menu.id}
                        to={menu.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-indigo-50 shadow-sm'
                                : 'hover:bg-gray-50'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${isActive
                                            ? 'bg-indigo-500 shadow-md shadow-indigo-200'
                                            : 'bg-gray-100 group-hover:bg-gray-200'
                                        }`}
                                >
                                    <FontAwesomeIcon
                                        icon={menu.icon}
                                        className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}
                                    />
                                </div>
                                <span
                                    className={`text-sm font-medium transition-colors duration-200 ${isActive ? 'text-indigo-600' : 'text-gray-600 group-hover:text-gray-800'
                                        }`}
                                >
                                    {menu.label}
                                </span>
                                {isActive && (
                                    <div className='ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500' />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Spacer */}
            <div className='flex-1' />

            {/* User + logout */}
            {user && (
                <div className='mx-4 mb-3 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2'>
                    <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0'>
                        <span className='text-white text-xs font-bold'>{user.name[0]}</span>
                    </div>
                    <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold text-gray-700 truncate'>{user.name}</p>
                        <p className='text-[10px] text-gray-400 truncate'>{user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        title="Sign out"
                        className='text-gray-400 hover:text-red-400 transition-colors'
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} className='text-sm' />
                    </button>
                </div>
            )}

            {/* Footer tip */}
            <div className='mx-4 mb-5 p-3 rounded-xl bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100'>
                <p className='text-[11px] font-semibold text-indigo-700'>Pro tip</p>
                <p className='text-[10px] text-indigo-400 mt-0.5 leading-relaxed'>Build habits daily for best results.</p>
            </div>
        </div>
    )
}

export default Navbar
