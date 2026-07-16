import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoPeopleOutline,
} from 'react-icons/io5'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Select from '../components/common/Select'
import { createUser } from '../service/userService'
import logo from '../assets/logo/logo.png'

export default function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Receptionist',
    },
  })

  const password = watch('password')

  const onSubmit = async (data) => {
    setError(null)
    setLoading(true)
    try {
      await createUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(
        err.response?.data?.message ??
        'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

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
              <p className="text-sm text-slate-500">Create Account</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="mt-2 text-slate-500">
              Register to access the repair management system
            </p>
          </div>

          {/* Success message */}
          {success && (
            <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
              ✅ Account created successfully! Redirecting to login...
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Ahmed Mohamed"
              icon={IoPersonOutline}
              error={errors.fullName?.message}
              {...register('fullName', { required: 'Full name is required' })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="ahmed@repairshop.com"
              icon={IoMailOutline}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address',
                },
              })}
            />

            <Select
              label="Role"
              icon={IoPeopleOutline}
              options={[
                { value: 'Receptionist', label: 'Receptionist' },
                { value: 'Technician', label: 'Technician' },
                { value: 'Admin', label: 'Admin' },
              ]}
              error={errors.role?.message}
              {...register('role', { required: 'Role is required' })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Min 6 characters"
              icon={IoLockClosedOutline}
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              icon={IoLockClosedOutline}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) =>
                  val === password || 'Passwords do not match',
              })}
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Create Account
            </Button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary-600 lg:via-primary-500 lg:to-accent-600 lg:p-12">
        <div className="max-w-lg text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Join Our Team</h2>
          <p className="text-lg text-white/80">
            Create your account to start managing repairs, customers, and payments.
          </p>
        </div>
      </div>
    </div>
  )
}


//this backend of java(spring boot)

// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import {
//   IoPersonOutline,
//   IoMailOutline,
//   IoLockClosedOutline,
//   IoPeopleOutline,
// } from 'react-icons/io5'
// import Input from '../components/common/Input'
// import Button from '../components/common/Button'
// import Select from '../components/common/Select'
// import { register } from '../service/authService'
// import logo from '../assets/logo/logo.png'

// export default function SignUp() {
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(false)

//   const {
//     register: registerForm,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       fullName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       role: 'Receptionist',
//     },
//   })

//   const password = watch('password')

//   const onSubmit = async (data) => {
//     setError(null)
//     setLoading(true)
//     try {
//       await register({
//         fullName: data.fullName,
//         email: data.email,
//         password: data.password,
//         role: data.role,
//       })
//       setSuccess(true)
//       setTimeout(() => navigate('/login'), 2000)
//     } catch (err) {
//       setError(
//         err.response?.data?.message ??
//         'Registration failed. Please try again.'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen">
//       {/* Left side — form */}
//       <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
//         <div className="mx-auto w-full max-w-md">

//           {/* Logo */}
//           <div className="mb-8 flex items-center gap-3">
//             <img src={logo} alt="MobileRepairSystem" className="h-12 w-12" />
//             <div>
//               <h1 className="text-xl font-bold text-slate-900">
//                 MobileRepair<span className="text-primary-600">System</span>
//               </h1>
//               <p className="text-sm text-slate-500">Create Account</p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
//             <p className="mt-2 text-slate-500">
//               Register to access the repair management system
//             </p>
//           </div>

//           {/* Success message */}
//           {success && (
//             <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
//               ✅ Account created successfully! Redirecting to login...
//             </div>
//           )}

//           {/* Error message */}
//           {error && (
//             <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <Input
//               label="Full Name"
//               placeholder="Ahmed Mohamed"
//               icon={IoPersonOutline}
//               error={errors.fullName?.message}
//               {...registerForm('fullName', { required: 'Full name is required' })}
//             />

//             <Input
//               label="Email"
//               type="email"
//               placeholder="ahmed@repairshop.com"
//               icon={IoMailOutline}
//               error={errors.email?.message}
//               {...registerForm('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^\S+@\S+\.\S+$/,
//                   message: 'Invalid email address',
//                 },
//               })}
//             />

//             <Select
//               label="Role"
//               icon={IoPeopleOutline}
//               options={[
//                 { value: 'Receptionist', label: 'Receptionist' },
//                 { value: 'Technician', label: 'Technician' },
//                 { value: 'Admin', label: 'Admin' },
//               ]}
//               error={errors.role?.message}
//               {...registerForm('role', { required: 'Role is required' })}
//             />

//             <Input
//               label="Password"
//               type="password"
//               placeholder="Min 6 characters"
//               icon={IoLockClosedOutline}
//               error={errors.password?.message}
//               {...registerForm('password', {
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must be at least 6 characters',
//                 },
//               })}
//             />

//             <Input
//               label="Confirm Password"
//               type="password"
//               placeholder="Repeat your password"
//               icon={IoLockClosedOutline}
//               error={errors.confirmPassword?.message}
//               {...registerForm('confirmPassword', {
//                 required: 'Please confirm your password',
//                 validate: (val) =>
//                   val === password || 'Passwords do not match',
//               })}
//             />

//             <Button
//               type="submit"
//               loading={loading}
//               className="w-full"
//               size="lg"
//             >
//               Create Account
//             </Button>

//             <p className="text-center text-sm text-slate-500">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 className="font-medium text-primary-600 hover:text-primary-700"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary-600 lg:via-primary-500 lg:to-accent-600 lg:p-12">
//         <div className="max-w-lg text-center text-white">
//           <h2 className="mb-4 text-3xl font-bold">Join Our Team</h2>
//           <p className="text-lg text-white/80">
//             Create your account to start managing repairs, customers, and payments.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }