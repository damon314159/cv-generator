import { type ChangeEvent, useState } from 'react'
import Form from '../form/Form'
import type FormFieldProps from '../../interfaces/FormFieldProps'
import {
  type FormBuilderProps,
  type FormBuilderField
} from '../../interfaces/FormBuilderProps'

// Take a collection of field objects to create a React controlled form
function FormBuilder({
  formFields,
  onSubmitFactory,
  existingData
}: FormBuilderProps): JSX.Element {
  // Create state that tracks value of each input field
  const [formValues, setFormValues] = useState(
    // If existing data given to edit, use that
    existingData ??
      // If not, create a blank dataset
      formFields.reduce(
        (
          initialState: Record<string, string>,
          field: FormBuilderField
        ): Record<string, string> => {
          // Take each field in turn, and write {name: ''} to initial state object
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
          // Fill in the input field props algorithmically
          name: formField.name,
          type: formField.type,
          value: formValues[formField.name],
          // Write to state via a closured onChange function
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            const newValues = { ...formValues }
            newValues[formField.name] = event.target.value
            setFormValues(newValues)
          },
          required: formField.required,
          id: formField.id
        })
      )}
      onSubmit={onSubmitFactory(formValues)}
    />
  )
}

export default FormBuilder
