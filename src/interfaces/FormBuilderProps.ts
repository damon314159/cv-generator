import { type FormEvent } from 'react'

export interface FormBuilderField {
  name: string
  id: string
  type: string
  required: boolean
}

export interface FormBuilderProps {
  formFields: FormBuilderField[]
  onSubmitFactory: (
    formValues: Record<string, string>
  ) => (event: FormEvent<HTMLFormElement>) => void
}

export default FormBuilderProps
