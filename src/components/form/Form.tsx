import type FormFieldProps from '../../interfaces/FormFieldProps'

interface FormProps {
  fields: FormFieldProps[]
}

// Read the fields as passed by the parent form-builder
function Form({ fields }: FormProps): JSX.Element {
  return (
    <>
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
    </>
  )
}

export default Form
