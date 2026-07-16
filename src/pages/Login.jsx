
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Navigate } from 'react-router-dom'
import { IoMailOutline, IoLockClosedOutline, IoKeyOutline } from 'react-icons/io5'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuth } from '../hooks/useAuth'
import { forgotPassword, changePassword } from '../service/authService'
import logo from '../assets/logo/logo.png'

function RepairIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto h-full max-h-80 w-full max-w-sm" fill="none">
      <rect x="140" y="60" width="120" height="220" rx="16" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
      <rect x="155" y="80" width="90" height="160" rx="4" fill="white" fillOpacity="0.1"/>
      <circle cx="200" cy="260" r="8" fill="white" fillOpacity="0.3"/>
      <path d="M80 200 L120 160 L140 180 L100 220 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
      <circle cx="120" cy="160" r="20" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M280 180 L320 140 L340 160 L300 200 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
      <rect x="290" y="220" width="60" height="8" rx="4" fill="white" fillOpacity="0.3"/>
      <rect x="290" y="240" width="40" height="8" rx="4" fill="white" fillOpacity="0.2"/>
      <path d="M60 320 Q200 280 340 320" stroke="white" strokeWidth="1" fill="none" opacity="0.3"/>
    </svg>
  )
}

// Step 1 — Login
function LoginForm({ onForgot, onSuccess }) {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '', rememberMe: false }
  })

  const onSubmit = async (data) => {
    setError(null)
    setLoading(true)
    try {
      await login({ email: data.email, password: data.password, rememberMe: data.rememberMe })
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-2 text-slate-500">Sign in to manage your repair shop</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="admin@repairshop.com"
          icon={IoMailOutline}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={IoLockClosedOutline}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Min 6 characters' },
          })}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-primary-600"
              {...register('rememberMe')}
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={onForgot}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full" size="lg">
          Sign In
        </Button>
        <p className="mt-4 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-primary-600 hover:text-primary-700">
            Sign Up
          </a>
        </p>
      </form>
      
    </>
  )
}

// Step 2 — Forgot Password (email geli)
function ForgotForm({ onBack, onTokenSent }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '' }
  })

  const onSubmit = async (data) => {
    setError(null)
    setLoading(true)
    try {
      await forgotPassword({ email: data.email })
      onTokenSent(data.email)
    } catch (err) {
      setError(err.response?.data?.message ?? 'Email not found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Forgot Password</h2>
        <p className="mt-2 text-slate-500">
          Enter your email — a reset token will appear in the server console.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="admin@repairshop.com"
          icon={IoMailOutline}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
          })}
        />

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full" size="lg">
          Send Reset Token
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back to login
        </button>
      </form>
    </>
  )
}

// Step 3 — Reset Password (token + password cusub)
function ResetForm({ email, onBack, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { token: '', newPassword: '', confirmPassword: '' }
  })

  const onSubmit = async (data) => {
    setError(null)
    if (data.newPassword !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await changePassword({
        token: data.token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message ?? 'Invalid or expired token')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
        <p className="mt-2 text-slate-500">
          Check the server console for the reset token sent to{' '}
          <span className="font-medium text-slate-700">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Reset Token"
          placeholder="Paste token from server console"
          icon={IoKeyOutline}
          error={errors.token?.message}
          {...register('token', { required: 'Token is required' })}
        />
        <Input
          label="New Password"
          type="password"
          placeholder="Min 6 characters"
          icon={IoLockClosedOutline}
          error={errors.newPassword?.message}
          {...register('newPassword', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Min 6 characters' },
          })}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Repeat new password"
          icon={IoLockClosedOutline}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { required: 'Please confirm password' })}
        />

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success message */}
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Reset Password
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back to login
        </button>
      </form>
    </>
  )
}

// ── Main Login page ──
export default function Login() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // 'login' | 'forgot' | 'reset'
  const [step, setStep] = useState('login')
  const [forgotEmail, setForgotEmail] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="flex min-h-screen">
      {/* Left side — form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <img src={logo} alt="MobileRepairSystem" className="h-12 w-12" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                MobileRepair<span className="text-primary-600">System</span>
              </h1>
              <p className="text-sm text-slate-500">Admin Portal</p>
            </div>
          </div>

          {/* Reset success message */}
          {resetSuccess && (
            <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
              ✅ Password reset successfully! Please login with your new password.
            </div>
          )}

          {/* Steps */}
          {step === 'login' && (
            <LoginForm
              onForgot={() => { setResetSuccess(false); setStep('forgot') }}
              onSuccess={() => navigate('/dashboard')}
            />
          )}

          {step === 'forgot' && (
            <ForgotForm
              onBack={() => setStep('login')}
              onTokenSent={(email) => { setForgotEmail(email); setStep('reset') }}
            />
          )}

          {step === 'reset' && (
            <ResetForm
              email={forgotEmail}
              onBack={() => setStep('login')}
              onSuccess={() => { setResetSuccess(true); setStep('login') }}
            />
          )}
        </div>
      </div>

      {/* Right side — illustration */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary-600 lg:via-primary-500 lg:to-accent-600 lg:p-12">
        <div className="max-w-lg text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Mobile Repair Management</h2>
          <p className="mb-8 text-lg text-white/80">
            Manage repairs, customers, and grow your business with ease.
          </p>
          <RepairIllustration />
        </div>
      </div>
    </div>
  )
}