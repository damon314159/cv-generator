import { type FormEvent } from 'react'
import type FormFieldProps from '../../interfaces/FormFieldProps'
import './Form.css'
import titleCase from '../../helpers/titleCase'

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
        <div className="input-wrapper" key={formField.id}>
          <label htmlFor={formField.name}>{titleCase(formField.name)}</label>
          <input
            id={formField.name}
            name={formField.name}
            type={formField.type}
            value={formField.value}
            onChange={formField.onChange}
            required={formField.required}
          />
        </div>
      ))}
      <div className="btn-wrapper">
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  )
}

export default Form
