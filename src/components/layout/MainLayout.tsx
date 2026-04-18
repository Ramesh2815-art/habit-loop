import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <div className='h-screen w-full bg-(--color-bg-main) relative'>
                <div className="h-5/12 w-full bg-(--color-primary) absolute top-0 left-0 z-0"></div>
                <div className="h-full w-full relative flex">
                    <aside className='h-full min-w-2xs py-6 px-4'><Navbar /></aside>
                    <main className="flex-1 overflow-y-auto"><Outlet /></main>
                </div>
            </div>
        </>
    )
}

export default MainLayout   