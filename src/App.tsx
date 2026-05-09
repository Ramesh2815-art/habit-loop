import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import { ProtectedRoute, LoginGuard } from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import HabitDetail from './pages/HabitDetail'
import Todo from './pages/Todo'

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="habits/:habitId" element={<HabitDetail />} />

        <Route path="todo" element={<Todo />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
