import * as uuid from 'uuid'
import { type FormEvent, useState } from 'react'
import FormBuilder from '../formBuilder/FormBuilder'
import { type FormBuilderField } from '../../interfaces/FormBuilderProps'
import titleCase from '../../helpers/titleCase'
import './Info.css'

const infoFields: FormBuilderField[] = [
  { name: 'firstName', id: uuid.v4(), type: 'text', required: true },
  { name: 'lastName', id: uuid.v4(), type: 'text', required: true },
  { name: 'jobTitle', id: uuid.v4(), type: 'text', required: true },
  { name: 'email', id: uuid.v4(), type: 'email', required: true },
  { name: 'phone', id: uuid.v4(), type: 'tel', required: true },
  { name: 'city', id: uuid.v4(), type: 'text', required: false },
  { name: 'county', id: uuid.v4(), type: 'text', required: false }
]

interface InfoProps {
  userInfo: Record<string, string> | null
  setUserInfo: React.Dispatch<
    React.SetStateAction<Record<string, string> | null>
  >
}

function Info({ userInfo, setUserInfo }: InfoProps): JSX.Element {
  const [isEdit, setIsEdit] = useState(false)

  if (isEdit) {
    return (
      <>
        <h3>Edit Info</h3>
        <FormBuilder
          formFields={infoFields}
          // Take values from the form, and return an onSubmit function
          onSubmitFactory={(formValues: Record<string, string>) =>
            // onSubmit takes the form event, actions it, returning void
            (event: FormEvent<HTMLFormElement>): void => {
              event.preventDefault()
              // Close the editor after submission
              setIsEdit(false)
              setUserInfo(formValues)
            }}
          existingData={userInfo}
          onCancel={() => {
            // Cancelling closes the editor without setting new info
            setIsEdit(false)
          }}
        />
      </>
    )
  }
  // Else
  return (
    <div className="info-wrapper">
      <h3>Info</h3>
      <div className="info-pairs">
        {infoFields.map((field) => (
          <div key={field.id}>
            {/* For each field, render the name and stored data, if any */}
            <span>{titleCase(field.name)}:</span>
            <span>{userInfo?.[field.name] || 'None'}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          // Edit button opens the editor view
          setIsEdit(true)
        }}
      >
        Edit
      </button>
    </div>
  )
}

export default Info
