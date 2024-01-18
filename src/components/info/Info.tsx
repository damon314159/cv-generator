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

function Info(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false)
  const [userInfo, setUserInfo] = useState(
    infoFields.reduce(
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
  if (isEdit) {
    return (
      <>
        <h3>Edit Info</h3>
        <FormBuilder
          formFields={infoFields}
          onSubmitFactory={(formValues: Record<string, string>) =>
            (event: FormEvent<HTMLFormElement>): void => {
              event.preventDefault()
              setIsEdit(false)
              setUserInfo(formValues)
            }}
          existingData={userInfo}
          onCancel={() => {
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
        {Object.entries(userInfo).map(([name, value]) => (
          <div key={name}>
            <span>{titleCase(name)}:</span>
            <span>{value || 'None'}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setIsEdit(true)
        }}
      >
        Edit
      </button>
    </div>
  )
}

export default Info
