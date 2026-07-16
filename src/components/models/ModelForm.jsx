import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'

export default function ModelForm({ initialData, brands, onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      modelName: initialData?.modelName ?? '',   // ← 'name' → 'modelName'
      brandId: initialData?.brandId ?? '',       // ← 'brand' → 'brandId'
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Model Name"
        error={errors.modelName?.message}
        {...register('modelName', { required: 'Model name is required' })}
      />
      <Select
        label="Brand"
        options={brands.map((b) => ({
          value: String(b.brandId),    // ← b.name → b.brandId
          label: b.brandName,          // ← b.name → b.brandName
        }))}
        error={errors.brandId?.message}
        {...register('brandId', { required: 'Brand is required' })}
      />
      {/* year + status la tirtirray — backend ma u baahna */}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add Model'}
        </Button>
      </div>
    </form>
  )
}


//this backend of java(spring boot)

// import { useForm } from 'react-hook-form'
// import Input from '../common/Input'
// import Select from '../common/Select'
// import Button from '../common/Button'

// export default function ModelForm({ initialData, brands, onSubmit, onCancel }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       modelName: initialData?.modelName ?? '',
//       brandId: initialData?.brand?.id
//         ? String(initialData.brand.id)
//         : '',
//     },
//   })

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Input
//         label="Model Name"
//         error={errors.modelName?.message}
//         {...register('modelName', { required: 'Model name is required' })}
//       />
//       <Select
//         label="Brand"
//         options={brands.map((b) => ({
//           value: String(b.id),
//           label: b.brandName,
//         }))}
//         error={errors.brandId?.message}
//         {...register('brandId', { required: 'Brand is required' })}
//       />

//       <div className="flex justify-end gap-3 pt-2">
//         <Button variant="outline" type="button" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit">
//           {initialData ? 'Update' : 'Add Model'}
//         </Button>
//       </div>
//     </form>
//   )
// }