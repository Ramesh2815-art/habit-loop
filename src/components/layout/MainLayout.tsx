import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='h-screen w-full bg-(--color-bg-main) flex overflow-hidden'>
            <aside className='w-64 h-full shrink-0 bg-white border-r border-gray-100 shadow-xl shadow-gray-100/80 z-10'>
                <Navbar />
            </aside>
            <div className='flex-1 flex flex-col overflow-hidden'>
                <main className='flex-1 overflow-y-auto p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
