import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('habitloop_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (username: string, password: string): boolean => {
    if (username === 'demo' && password === 'password') {
      const loggedIn: User = { id: '1', name: 'Ramesh', email: 'demo@habitloop.com' }
      setUser(loggedIn)
      localStorage.setItem('habitloop_user', JSON.stringify(loggedIn))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('habitloop_user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
