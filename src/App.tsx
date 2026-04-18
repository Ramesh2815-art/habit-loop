import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Todo from './pages/Todo'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path='/' element={<Navigate to='/todo' replace />} />
          <Route path='todo' element={<Todo />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App