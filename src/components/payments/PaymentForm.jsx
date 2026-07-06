import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'

export default function PaymentForm({ initialData, onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData ?? {
      repairId: '', customer: '', amount: '', method: 'Card', status: 'pending',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Repair ID" error={errors.repairId?.message} {...register('repairId', { required: 'Required' })} />
        <Input label="Customer" error={errors.customer?.message} {...register('customer', { required: 'Required' })} />
        <Input label="Amount ($)" type="number" error={errors.amount?.message} {...register('amount', { required: 'Required' })} />
        <Select
          label="Method"
          options={[
            { value: 'Card', label: 'Card' },
            { value: 'Cash', label: 'Cash' },
            { value: 'Transfer', label: 'Transfer' },
          ]}
          {...register('method')}
        />
      </div>
      <Select
        label="Status"
        options={[
          { value: 'pending', label: 'Pending' },
          { value: 'paid', label: 'Paid' },
          { value: 'partial', label: 'Partial' },
          { value: 'refunded', label: 'Refunded' },
        ]}
        {...register('status')}
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update' : 'Add Payment'}</Button>
      </div>
    </form>
  )
}
