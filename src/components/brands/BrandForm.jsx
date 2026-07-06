// import { useForm } from 'react-hook-form'
// import Input from '../common/Input'
// import Select from '../common/Select'
// import Button from '../common/Button'

// export default function BrandForm({ initialData, onSubmit, onCancel }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: initialData ?? { name: '', logo: '📱', status: 'active' },
//   })

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Input label="Brand Name" error={errors.name?.message} {...register('name', { required: 'Required' })} />
//       <Input label="Logo Emoji" {...register('logo')} />
//       <Select
//         label="Status"
//         options={[
//           { value: 'active', label: 'Active' },
//           { value: 'inactive', label: 'Inactive' },
//         ]}
//         {...register('status')}
//       />
//       <div className="flex justify-end gap-3 pt-2">
//         <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
//         <Button type="submit">{initialData ? 'Update' : 'Add Brand'}</Button>
//       </div>
//     </form>
//   )
// }


import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import Button from '../common/Button'

export default function BrandForm({ initialData, onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      brandName: initialData?.brandName ?? '',  // ← 'name' → 'brandName'
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Brand Name"
        error={errors.brandName?.message}
        {...register('brandName', { required: 'Brand name is required' })}
      />
      {/* logo + status la tirtirray — backend ma u baahna */}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add Brand'}
        </Button>
      </div>
    </form>
  )
}
