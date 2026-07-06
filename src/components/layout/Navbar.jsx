// import { useState, useRef, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {
//   IoMenu,
//   IoSearch,
//   IoNotificationsOutline,
//   IoPersonOutline,
//   IoSettingsOutline,
//   IoLogOutOutline,
// } from 'react-icons/io5'
// import { useUI } from '../../hooks/useUI'
// import { useAuth } from '../../hooks/useAuth'
// import { notifications } from '../../data/mockData'

// export default function Navbar() {
//   const { toggleSidebar } = useUI()
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()
//   const [showNotifications, setShowNotifications] = useState(false)
//   const [showProfile, setShowProfile] = useState(false)
//   const notifRef = useRef(null)
//   const profileRef = useRef(null)

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false)
//       if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
//     }
//     document.addEventListener('mousedown', handleClick)
//     return () => document.removeEventListener('mousedown', handleClick)
//   }, [])

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   const unreadCount = notifications.filter((n) => !n.read).length

//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-100 bg-white px-4 shadow-soft lg:px-6">
//       <div className="flex items-center gap-3">
//         <button
//           onClick={toggleSidebar}
//           className="rounded-lg p-2 text-slate-600 hover:bg-surface-subtle lg:hidden"
//         >
//           <IoMenu className="h-5 w-5" />
//         </button>
//         <div className="relative hidden sm:block">
//           <IoSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//           <input
//             type="search"
//             placeholder="Search anything..."
//             className="w-64 rounded-lg border border-slate-200 bg-surface-muted py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:w-80"
//           />
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         <div className="relative" ref={notifRef}>
//           <button
//             onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
//             className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-surface-subtle"
//           >
//             <IoNotificationsOutline className="h-5 w-5" />
//             {unreadCount > 0 && (
//               <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
//                 {unreadCount}
//               </span>
//             )}
//           </button>
//           {showNotifications && (
//             <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-100 bg-white shadow-elevated">
//               <div className="border-b border-slate-100 px-4 py-3">
//                 <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
//               </div>
//               <div className="max-h-72 overflow-y-auto">
//                 {notifications.map((n) => (
//                   <div
//                     key={n.id}
//                     className={`border-b border-slate-50 px-4 py-3 last:border-0 ${!n.read ? 'bg-primary-50/30' : ''}`}
//                   >
//                     <p className="text-sm font-medium text-slate-900">{n.title}</p>
//                     <p className="mt-0.5 text-xs text-slate-500">{n.message}</p>
//                     <p className="mt-1 text-xs text-slate-400">{n.time}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative" ref={profileRef}>
//           <button
//             onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
//             className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-surface-subtle"
//           >
//             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-semibold text-white">
//               {user.name.charAt(0)}
//             </div>
//             <span className="hidden text-sm font-medium text-slate-700 md:block">{user.name}</span>
//           </button>
//           {showProfile && (
//             <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white py-1 shadow-elevated">
//               <Link
//                 to="/profile"
//                 onClick={() => setShowProfile(false)}
//                 className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-surface-subtle"
//               >
//                 <IoPersonOutline className="h-4 w-4" /> Profile
//               </Link>
//               <Link
//                 to="/settings"
//                 onClick={() => setShowProfile(false)}
//                 className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-surface-subtle"
//               >
//                 <IoSettingsOutline className="h-4 w-4" /> Settings
//               </Link>
//               <hr className="my-1 border-slate-100" />
//               <button
//                 onClick={handleLogout}
//                 className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
//               >
//                 <IoLogOutOutline className="h-4 w-4" /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   )
// }


import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoMenu,
  IoSearch,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from 'react-icons/io5'
import { useUI } from '../../hooks/useUI'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const { toggleSidebar } = useUI()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  // Notifications — ku meel gaar ah (backend ma leeyahay weli)
  const unreadCount = 0
  const notificationsList = []

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotifications(false)
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-100 bg-white px-4 shadow-soft lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-surface-subtle lg:hidden"
        >
          <IoMenu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <IoSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search anything..."
            className="w-64 rounded-lg border border-slate-200 bg-surface-muted py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:w-80"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}
            className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-surface-subtle"
          >
            <IoNotificationsOutline className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-100 bg-white shadow-elevated">
              <div className="border-b border-slate-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notificationsList.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-slate-400">
                    No notifications
                  </p>
                ) : (
                  notificationsList.map((n) => (
                    <div
                      key={n.id}
                      className={`border-b border-slate-50 px-4 py-3 last:border-0 ${
                        !n.read ? 'bg-primary-50/30' : ''
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-900">{n.message}</p>
                      <p className="mt-1 text-xs text-slate-400">{n.timestamp}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-surface-subtle"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-semibold text-white">
              {user?.fullName?.charAt(0) ?? '?'}  {/* ← fullName, safe */}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 md:block">
              {user?.fullName ?? 'User'}          {/* ← fullName, safe */}
            </span>
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white py-1 shadow-elevated">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.fullName}
                </p>
                <p className="text-xs text-slate-500">{user?.role}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-surface-subtle"
              >
                <IoPersonOutline className="h-4 w-4" /> Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-surface-subtle"
              >
                <IoSettingsOutline className="h-4 w-4" /> Settings
              </Link>
              <hr className="my-1 border-slate-100" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <IoLogOutOutline className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
