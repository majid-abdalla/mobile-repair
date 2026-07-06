// import { NavLink } from 'react-router-dom'
// import {
//   IoGridOutline,
//   IoPeopleOutline,
//   IoConstructOutline,
//   IoCardOutline,
//   IoPhonePortraitOutline,
//   IoLayersOutline,
//   IoBarChartOutline,
//   IoSettingsOutline,
//   IoChevronBack,
//   IoChevronForward,
//   IoClose,
// } from 'react-icons/io5'
// import { useUI } from '../../hooks/useUI'
// import logo from '../../assets/logo/logo.png'

// const navItems = [
//   { to: '/dashboard', label: 'Dashboard', icon: IoGridOutline },
//   { to: '/customers', label: 'Customers', icon: IoPeopleOutline },
//   { to: '/repairs', label: 'Repairs', icon: IoConstructOutline },
//   { to: '/payments', label: 'Payments', icon: IoCardOutline },
//   { to: '/brands', label: 'Device Brands', icon: IoPhonePortraitOutline },
//   { to: '/models', label: 'Device Models', icon: IoLayersOutline },
//   { to: '/reports', label: 'Reports', icon: IoBarChartOutline },
//   { to: '/settings', label: 'Settings', icon: IoSettingsOutline },
// ]

// import { IoGridOutline, IoPeopleOutline, IoConstructOutline,
//   IoCardOutline, IoPhonePortraitOutline, IoLayersOutline,
//   IoBarChartOutline, IoSettingsOutline, IoChevronBack,
//   IoChevronForward, IoClose, IoPerson } from 'react-icons/io5'  // ← IoPerson ku dar
// import { useUI } from '../../hooks/useUI'
// import { useAuth } from '../../hooks/useAuth'  // ← ku dar

// // Sidebar-ka gudaha:
// export default function Sidebar() {
//   const { sidebarOpen, sidebarCollapsed, closeSidebar, toggleCollapsed } = useUI()
//   const { isAdmin } = useAuth()  // ← ku dar

//   const navItems = [
//     { to: '/dashboard', label: 'Dashboard', icon: IoGridOutline },
//     { to: '/customers', label: 'Customers', icon: IoPeopleOutline },
//     { to: '/repairs', label: 'Repairs', icon: IoConstructOutline },
//     { to: '/payments', label: 'Payments', icon: IoCardOutline },
//     { to: '/brands', label: 'Device Brands', icon: IoPhonePortraitOutline },
//     { to: '/models', label: 'Device Models', icon: IoLayersOutline },
//     { to: '/reports', label: 'Reports', icon: IoBarChartOutline },
//     { to: '/settings', label: 'Settings', icon: IoSettingsOutline },
//     // Admin kaliya
//     ...(isAdmin() ? [{ to: '/users', label: 'Users', icon: IoPerson }] : []),
//   ]
//   // ... hadhka code-ka sii wad sida hore

// export default function Sidebar() {
//   const { sidebarOpen, sidebarCollapsed, closeSidebar, toggleCollapsed } = useUI()

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
//       isActive
//         ? 'bg-primary-50 text-primary-600'
//         : 'text-slate-600 hover:bg-surface-subtle hover:text-slate-900'
//     }`

//   const sidebarContent = (
//     <>
//       <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
//         <div className="flex items-center gap-3 overflow-hidden">
//           <img src={logo} alt="MobileRepairSystem" className="h-9 w-9 shrink-0" />
//           {!sidebarCollapsed && (
//             <span className="truncate text-sm font-bold text-slate-900">
//               MobileRepair<span className="text-primary-600">System</span>
//             </span>
//           )}
//         </div>
//         <button
//           onClick={closeSidebar}
//           className="rounded-lg p-1.5 text-slate-400 hover:bg-surface-subtle lg:hidden"
//         >
//           <IoClose className="h-5 w-5" />
//         </button>
//       </div>

//       <nav className="flex-1 space-y-1 overflow-y-auto p-3">
//         {navItems.map(({ to, label, icon: Icon }) => (
//           <NavLink key={to} to={to} className={linkClass} onClick={closeSidebar}>
//             <Icon className="h-5 w-5 shrink-0" />
//             {!sidebarCollapsed && <span>{label}</span>}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="hidden border-t border-slate-100 p-3 lg:block">
//         <button
//           onClick={toggleCollapsed}
//           className="flex w-full items-center justify-center rounded-lg p-2 text-slate-400 transition-colors hover:bg-surface-subtle hover:text-slate-600"
//         >
//           {sidebarCollapsed ? (
//             <IoChevronForward className="h-5 w-5" />
//           ) : (
//             <IoChevronBack className="h-5 w-5" />
//           )}
//         </button>
//       </div>
//     </>
//   )

//   return (
//     <>
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
//           onClick={closeSidebar}
//         />
//       )}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-100 bg-white transition-all duration-300 lg:static lg:z-auto ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
//       >
//         {sidebarContent}
//       </aside>
//     </>
//   )
// }


import { NavLink } from 'react-router-dom'
import {
  IoGridOutline,
  IoPeopleOutline,
  IoConstructOutline,
  IoCardOutline,
  IoPhonePortraitOutline,
  IoLayersOutline,
  IoBarChartOutline,
  IoSettingsOutline,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoPerson,
} from 'react-icons/io5'
import { useUI } from '../../hooks/useUI'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/logo/logo.png'

export default function Sidebar() {
  const { sidebarOpen, sidebarCollapsed, closeSidebar, toggleCollapsed } = useUI()
  const { isAdmin } = useAuth()

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: IoGridOutline },
    { to: '/customers', label: 'Customers', icon: IoPeopleOutline },
    { to: '/repairs', label: 'Repairs', icon: IoConstructOutline },
    { to: '/payments', label: 'Payments', icon: IoCardOutline },
    { to: '/brands', label: 'Device Brands', icon: IoPhonePortraitOutline },
    { to: '/models', label: 'Device Models', icon: IoLayersOutline },
    { to: '/reports', label: 'Reports', icon: IoBarChartOutline },
    { to: '/settings', label: 'Settings', icon: IoSettingsOutline },
    ...(isAdmin() ? [{ to: '/users', label: 'Users', icon: IoPerson }] : []),
  ]

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-50 text-primary-600'
        : 'text-slate-600 hover:bg-surface-subtle hover:text-slate-900'
    }`

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <img src={logo} alt="MobileRepairSystem" className="h-9 w-9 shrink-0" />
          {!sidebarCollapsed && (
            <span className="truncate text-sm font-bold text-slate-900">
              MobileRepair<span className="text-primary-600">System</span>
            </span>
          )}
        </div>
        <button
          onClick={closeSidebar}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-surface-subtle lg:hidden"
        >
          <IoClose className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass} onClick={closeSidebar}>
            <Icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="hidden border-t border-slate-100 p-3 lg:block">
        <button
          onClick={toggleCollapsed}
          className="flex w-full items-center justify-center rounded-lg p-2 text-slate-400 transition-colors hover:bg-surface-subtle hover:text-slate-600"
        >
          {sidebarCollapsed ? (
            <IoChevronForward className="h-5 w-5" />
          ) : (
            <IoChevronBack className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  )

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-100 bg-white transition-all duration-300 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}