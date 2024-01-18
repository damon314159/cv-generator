import { type FormEvent } from 'react'
import type FormFieldProps from '../../interfaces/FormFieldProps'
import './Form.css'

interface FormProps {
  fields: FormFieldProps[]
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

// Read the fields as passed by the parent form-builder
function Form({ fields, onSubmit }: FormProps): JSX.Element {
  return (
    <form autoComplete="true" onSubmit={onSubmit}>
      {fields.map((formField: FormFieldProps) => (
        // Map each field into an input element with corresponding attributes
        <input
          key={formField.id}
          name={formField.name}
          type={formField.type}
          value={formField.value}
          onChange={formField.onChange}
          required={formField.required}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
