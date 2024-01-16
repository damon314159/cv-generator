export interface FormBuilderField {
  name: string
  id: string
  type: string
  required: boolean
}

export interface FormBuilderProps {
  formFields: FormBuilderField[]
}

export default FormBuilderProps
