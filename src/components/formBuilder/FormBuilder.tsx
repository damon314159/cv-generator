import { type ChangeEvent, useState } from 'react'
import Form from '../form/Form'
import type FormFieldProps from '../../interfaces/FormFieldProps'
import {
  type FormBuilderProps,
  type FormBuilderField
} from '../../interfaces/FormBuilderProps'

function FormBuilder({ formFields }: FormBuilderProps): JSX.Element {
  const [formValues, setFormValues] = useState(
    formFields.reduce(
      (
        initialState: Record<string, string>,
        field: FormBuilderField
      ): Record<string, string> => {
        const newField: Record<string, string> = {}
        newField[field.name] = ''
        return Object.assign(initialState, newField)
      },
      {}
    )
  )
  return (
    <Form
      fields={formFields.map(
        (formField): FormFieldProps => ({
          name: formField.name,
          type: formField.type,
          value: formValues[formField.name],
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            const newValues = { ...formValues }
            newValues[formField.name] = event.target.value
            setFormValues(newValues)
          },
          required: formField.required,
          id: formField.id
        })
      )}
    />
  )
}

export default FormBuilder
