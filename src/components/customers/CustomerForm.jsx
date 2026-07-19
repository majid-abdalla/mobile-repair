
import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import Button from '../common/Button'

export default function CustomerForm({ initialData, onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData ?? {
      fullName: '',    // ← 'name' → 'fullName'
      email: '',
      phone: '',
      address: '',     // ← cusub (backend leeyahay)
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        error={errors.fullName?.message}
        {...register('fullName', { required: 'Name is required' })}  // ← 'name' → 'fullName'
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email', {
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
        })}
      />
      <Input
        label="Phone"
        error={errors.phone?.message}
        {...register('phone', { required: 'Phone is required' })}
      />
      <Input
        label="Address"
        {...register('address')}                                       // ← cusub
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add Customer'}
        </Button>
      </div>
    </form>
  )
}