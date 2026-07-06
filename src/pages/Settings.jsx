// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import Header from '../components/layout/Header'
// import Card from '../components/common/Card'
// import Input from '../components/common/Input'
// import Button from '../components/common/Button'

// const tabs = [
//   { id: 'general', label: 'General' },
//   { id: 'notifications', label: 'Notifications' },
//   { id: 'business', label: 'Business Info' },
//   { id: 'security', label: 'Security' },
// ]

// export default function Settings() {
//   const [activeTab, setActiveTab] = useState('general')
//   const [saved, setSaved] = useState(false)
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       shopName: 'MobileRepair Pro',
//       currency: 'USD',
//       timezone: 'America/New_York',
//       emailNotifications: true,
//       smsNotifications: false,
//       businessName: 'MobileRepair Pro LLC',
//       address: '123 Repair Street, Tech City',
//       taxId: 'TAX-123456',
//       currentPassword: '',
//       newPassword: '',
//     },
//   })

//   const onSubmit = () => {
//     setSaved(true)
//     setTimeout(() => setSaved(false), 3000)
//   }

//   return (
//     <div>
//       <Header title="Settings" subtitle="Configure your application preferences" breadcrumbs={['Home', 'Settings']} />

//       {saved && (
//         <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
//           Settings saved successfully!
//         </div>
//       )}

//       <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
//               activeTab === tab.id
//                 ? 'border-primary-600 text-primary-600'
//                 : 'border-transparent text-slate-500 hover:text-slate-700'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <Card>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {activeTab === 'general' && (
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Input label="Shop Name" {...register('shopName')} />
//               <Input label="Currency" {...register('currency')} />
//               <Input label="Timezone" {...register('timezone')} />
//             </div>
//           )}

//           {activeTab === 'notifications' && (
//             <div className="space-y-4">
//               <label className="flex items-center gap-3">
//                 <input type="checkbox" className="h-4 w-4 rounded text-primary-600" {...register('emailNotifications')} />
//                 <span className="text-sm text-slate-700">Email notifications for new repairs</span>
//               </label>
//               <label className="flex items-center gap-3">
//                 <input type="checkbox" className="h-4 w-4 rounded text-primary-600" {...register('smsNotifications')} />
//                 <span className="text-sm text-slate-700">SMS notifications for appointments</span>
//               </label>
//             </div>
//           )}

//           {activeTab === 'business' && (
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Input label="Business Name" {...register('businessName')} />
//               <Input label="Tax ID" {...register('taxId')} />
//               <Input label="Address" containerClassName="sm:col-span-2" {...register('address')} />
//             </div>
//           )}

//           {activeTab === 'security' && (
//             <div className="grid grid-cols-1 gap-4 sm:max-w-md">
//               <Input label="Current Password" type="password" {...register('currentPassword')} />
//               <Input label="New Password" type="password" {...register('newPassword')} />
//             </div>
//           )}

//           <div className="flex justify-end border-t border-slate-100 pt-4">
//             <Button type="submit">Save Changes</Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   )
// }


// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import Header from '../components/layout/Header'
// import Card from '../components/common/Card'
// import Input from '../components/common/Input'
// import Button from '../components/common/Button'
// import { changePassword } from '../services/authService' // ← CUSUB

import { useState } from 'react'
import {useForm} from 'react-hook-form'
import Header from '../components/layout/Header'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { changePassword } from '../service/authService'

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'business', label: 'Business Info' },
  { id: 'security', label: 'Security' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)
  const [securityError, setSecurityError] = useState(null)   // ← CUSUB
  const [securityLoading, setSecurityLoading] = useState(false) // ← CUSUB

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      shopName: 'MobileRepair Pro',
      currency: 'USD',
      timezone: 'America/New_York',
      emailNotifications: true,
      smsNotifications: false,
      businessName: 'MobileRepair Pro LLC',
      address: '123 Repair Street, Tech City',
      taxId: 'TAX-123456',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',  // ← CUSUB
    },
  })

  // General/Notifications/Business — local save
  const onSubmit = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // Security tab — backend change password
  const onSecuritySubmit = async (data) => {
    setSecurityError(null)
    if (data.newPassword !== data.confirmPassword) {
      setSecurityError('New passwords do not match')
      return
    }
    try {
      setSecurityLoading(true)
      // Forgot password flow: marka hore token laga helo backend
      // Halkan waxaan isticmaalnaa changePassword endpoint-ka
      await changePassword({
        token: data.currentPassword, // ← reset token ahaan isticmaal
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
      setSaved(true)
      reset({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setSecurityError(
        err.response?.data?.message ?? 'Failed to change password'
      )
    } finally {
      setSecurityLoading(false)
    }
  }

  return (
    <div>
      <Header
        title="Settings"
        subtitle="Configure your application preferences"
        breadcrumbs={['Home', 'Settings']}
      />

      {saved && (
        <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Settings saved successfully!
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {/* General, Notifications, Business — local form */}
        {activeTab !== 'security' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Shop Name" {...register('shopName')} />
                <Input label="Currency" {...register('currency')} />
                <Input label="Timezone" {...register('timezone')} />
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded text-primary-600"
                    {...register('emailNotifications')}
                  />
                  <span className="text-sm text-slate-700">
                    Email notifications for new repairs
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded text-primary-600"
                    {...register('smsNotifications')}
                  />
                  <span className="text-sm text-slate-700">
                    SMS notifications for appointments
                  </span>
                </label>
              </div>
            )}

            {activeTab === 'business' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Business Name" {...register('businessName')} />
                <Input label="Tax ID" {...register('taxId')} />
                <Input
                  label="Address"
                  containerClassName="sm:col-span-2"
                  {...register('address')}
                />
              </div>
            )}

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}

        {/* Security tab — backend form */}
        {activeTab === 'security' && (
          <form
            onSubmit={handleSubmit(onSecuritySubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:max-w-md">
              <Input
                label="Reset Token (from email)"  // ← token halkii password
                type="text"
                placeholder="Paste reset token here"
                {...register('currentPassword')}
              />
              <Input
                label="New Password"
                type="password"
                {...register('newPassword', {
                  required: 'New password required',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
              />
              <Input
                label="Confirm New Password"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm password',
                })}
              />

              {securityError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                  {securityError}
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <Button type="submit" loading={securityLoading}>
                Update Password
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}