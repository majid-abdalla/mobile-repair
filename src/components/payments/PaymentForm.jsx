

import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'

export default function PaymentForm({ initialData, onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData ?? {
      repairId: '',
      amount: '',
      paymentMethod: 'Cash',  // ← 'method' → 'paymentMethod'
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Repair ID"
          type="number"
          error={errors.repairId?.message}
          {...register('repairId', { required: 'Required' })}
        />
        <Input
          label="Amount ($)"
          type="number"
          step="0.01"
          error={errors.amount?.message}
          {...register('amount', { required: 'Required' })}
        />
      </div>

      <Select
        label="Payment Method"
        options={[
          { value: 'Cash', label: 'Cash' },           // ← sax
          { value: 'Card', label: 'Card' },           // ← sax
          { value: 'MobileMoney', label: 'Mobile Money' },  // ← cusub
          { value: 'BankTransfer', label: 'Bank Transfer' }, // ← 'Transfer' → 'BankTransfer'
        ]}
        error={errors.paymentMethod?.message}
        {...register('paymentMethod', { required: 'Required' })}
      />

      {/* customer + status la tirtirray — backend ma u baahna */}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add Payment'}
        </Button>
      </div>
    </form>
  )
}