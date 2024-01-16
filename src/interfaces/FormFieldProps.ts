import { type ChangeEvent } from 'react'

interface FormFieldProps {
  name: string
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  required: boolean
  id: string
}

export default FormFieldProps
