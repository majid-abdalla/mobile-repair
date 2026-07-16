import { createContext, useContext, useState, useCallback, useEffect } from 'react'
//import { login as loginApi } from '../Services/authService'
//                                      ↑ lowercase 's'
import { login as loginApi } from '../service/authService'

export const AuthContext = createContext(null)
const AUTH_KEY = 'mrs_auth'

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // App-ka marka furmо — hubi token horey jiro
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed.user)
        setIsAuthenticated(true)
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setLoading(false)
  }, [])

  // ✅ Backend-ka la xidha
  const login = useCallback(async ({ email, password, rememberMe }) => {
    setError(null)
    try {
      const res = await loginApi({ email, password })
      const { token, userId, fullName, role, email: userEmail } = res.data

      const userData = { userId, fullName, role, email: userEmail }

      // Token kaydso
      localStorage.setItem('token', token)

      // User kaydso haddii rememberMe
      if (rememberMe) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ user: userData }))
      }

      setUser(userData)
      setIsAuthenticated(true)

      return userData

    } catch (err) {
      const message = err.response?.status === 401
        ? 'Email ama password waa khaldan yahay'
        : 'Server-ka xiriir la waayay, isku day mar kale'
      setError(message)
      throw new Error(message)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
    setUser(null)
    setError(null)
  }, [])

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates }
      const stored = localStorage.getItem(AUTH_KEY)
      if (stored) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ user: next }))
      }
      return next
    })
  }, [])

  // Role helpers
  const isAdmin = () => user?.role === 'Admin'
  const isReceptionist = () => user?.role === 'Receptionist'
  const isTechnician = () => user?.role === 'Technician'

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      loading,
      error,
      login,
      logout,
      updateUser,
      isAdmin,
      isReceptionist,
      isTechnician
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}


//this backend of java (spring boot)

// import { createContext, useContext, useState, useCallback, useEffect } from 'react'
// import { login as loginApi } from '../service/authService'

// export const AuthContext = createContext(null)
// const AUTH_KEY = 'mrs_auth'

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const stored = localStorage.getItem(AUTH_KEY)
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored)
//         setUser(parsed.user)
//         setIsAuthenticated(true)
//       } catch {
//         localStorage.removeItem(AUTH_KEY)
//       }
//     }
//     setLoading(false)
//   }, [])

//   const login = useCallback(async ({ email, password, rememberMe }) => {
//     setError(null)
//     try {
//       const res = await loginApi({ email, password })

//       // Backend fields
//       const {
//         token,
//         username,
//         fullName,
//         role,
//         email: userEmail
//       } = res.data

//       const userData = {
//         username,
//         fullName,
//         role,
//         email: userEmail
//       }

//       // Token kaydso
//       localStorage.setItem('token', token)

//       // User kaydso haddii rememberMe
//       if (rememberMe) {
//         localStorage.setItem(
//           AUTH_KEY,
//           JSON.stringify({ user: userData })
//         )
//       }

//       setUser(userData)
//       setIsAuthenticated(true)

//       return userData

//     } catch (err) {
//       // Backend message soo qaad
//       const message =
//         err.response?.data?.message ??
//         err.message ??
//         'Server-ka xiriir la waayay, isku day mar kale'

//       setError(message)
//       throw new Error(message)
//     }
//   }, [])

//   const logout = useCallback(() => {
//     localStorage.removeItem('token')
//     localStorage.removeItem(AUTH_KEY)
//     setIsAuthenticated(false)
//     setUser(null)
//     setError(null)
//   }, [])

//   const updateUser = useCallback((updates) => {
//     setUser((prev) => {
//       const next = { ...prev, ...updates }
//       const stored = localStorage.getItem(AUTH_KEY)
//       if (stored) {
//         localStorage.setItem(
//           AUTH_KEY,
//           JSON.stringify({ user: next })
//         )
//       }
//       return next
//     })
//   }, [])

//   const isAdmin = () => user?.role === 'ROLE_ADMIN'
//   const isReceptionist = () => user?.role === 'ROLE_USER'
//   const isTechnician = () => user?.role === 'ROLE_TECHNICIAN'

//   return (
//     <AuthContext.Provider value={{
//       isAuthenticated,
//       user,
//       loading,
//       error,
//       login,
//       logout,
//       updateUser,
//       isAdmin,
//       isReceptionist,
//       isTechnician
//     }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuthContext() {
//   const ctx = useContext(AuthContext)
//   if (!ctx) throw new Error(
//     'useAuthContext must be used within AuthProvider'
//   )
//   return ctx
// }