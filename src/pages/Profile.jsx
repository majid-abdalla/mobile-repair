

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Header from '../components/layout/Header'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user?.fullName ?? '',    // ← name → fullName
      email: user?.email ?? '',
      role: user?.role ?? '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data) => {
    updateUser({ fullName: data.fullName, email: data.email }) // ← name → fullName
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <Header
        title="Profile"
        subtitle="Manage your account information"
        breadcrumbs={['Home', 'Profile']}
      />

      {saved && (
        <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Avatar Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-3xl font-bold text-white">
              {user?.fullName?.charAt(0) ?? '?'}  {/* ← name → fullName */}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              {user?.fullName}               {/* ← name → fullName */}
            </h2>
            <p className="text-sm text-slate-500">{user?.role}</p>
            <p className="mt-1 text-sm text-slate-400">{user?.email}</p>
          </div>
        </Card>

        {/* Form Card */}
        <Card title="Account Details" className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                error={errors.fullName?.message}
                {...register('fullName', { required: 'Required' })}  // ← name → fullName
              />
              <Input
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register('email', { required: 'Required' })}
              />
              <Input
                label="Role"
                disabled
                {...register('role')}
              />
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Change Password
              </h3>
              <p className="mb-4 text-xs text-slate-400">
                To change password, use Settings → Security tab with your reset token.
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Update Profile</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}