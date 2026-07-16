
import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'

export default function RepairForm({ initialData, onSubmit, onCancel }) {
  const isEditing = !!initialData

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
      ? {
          // Edit mode — status kaliya la bedelayaa
          status: initialData.status,
          estimatedCost: initialData.estimatedCost ?? '',
          actualCost: initialData.actualCost ?? '',
        }
      : {
          // Create mode — IDs u baahan
          customerId: '',
          modelId: '',
          issueDescription: '',
          estimatedCost: '',
        },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isEditing ? (
        // ── CREATE MODE ──
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Customer ID"
              type="number"
              error={errors.customerId?.message}
              {...register('customerId', { required: 'Customer ID is required' })}
            />
            <Input
              label="Model ID"
              type="number"
              error={errors.modelId?.message}
              {...register('modelId', { required: 'Model ID is required' })}
            />
          </div>
          <Input
            label="Issue Description"
            error={errors.issueDescription?.message}
            {...register('issueDescription', { required: 'Issue is required' })}
          />
          <Input
            label="Estimated Cost ($)"
            type="number"
            step="0.01"
            {...register('estimatedCost')}
          />
        </>
      ) : (
        // ── EDIT MODE — status + costs ──
        <>
          <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            <p><span className="font-medium">Customer:</span> {initialData.customerName}</p>
            <p><span className="font-medium">Device:</span> {initialData.modelName}</p>
            <p><span className="font-medium">Issue:</span> {initialData.issueDescription}</p>
          </div>

          <Select
            label="Status"
            options={[
              { value: 'Received', label: 'Received' },
              { value: 'InProgress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Delivered', label: 'Delivered' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
            {...register('status')}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Estimated Cost ($)"
              type="number"
              step="0.01"
              {...register('estimatedCost')}
            />
            <Input
              label="Actual Cost ($)"
              type="number"
              step="0.01"
              {...register('actualCost')}
            />
          </div>
        </>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update' : 'Add Repair'}
        </Button>
      </div>
    </form>
  )
}