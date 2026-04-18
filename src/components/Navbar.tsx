import { faCube } from '@fortawesome/free-solid-svg-icons/faCube'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { menuBar } from '../utils/Menu-item'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='h-full w-72 bg-(--color-bg-sidebar) flex-col gap-2 rounded-xl'>
                <div className='w-full flex flex-row pt-3 pr-2 pb-4 pl-3.5 h-35 items-center'>
                    <span><FontAwesomeIcon icon={faCube} className='text-7xl'></FontAwesomeIcon></span>
                    <span className='text-2xl'>HabitLoop</span>
                </div>
                <div className="h-px bg-linear-to-r from-transparent via-gray-400 to-transparent mx-3" />
                <main className='flex flex-col gap-5 mt-5'>
                    {
                        menuBar.map((menu) => (
                            <NavLink key={menu.id} to={menu.path}>
                                <div className='flex flex-row items-center pl-5 gap-3'>
                                    <FontAwesomeIcon icon={menu.icon} color={menu.iconColor} size='2x'></FontAwesomeIcon>
                                    <span>{menu.label}</span>
                                </div>
                            </NavLink>
                        ))
                    }
                </main>

            </div>
        </>
    )
}

export default Navbar