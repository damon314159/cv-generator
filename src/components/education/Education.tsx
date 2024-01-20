import * as uuid from 'uuid'
import { type FormEvent, useState } from 'react'
import FormBuilder from '../formBuilder/FormBuilder'
import { type FormBuilderField } from '../../interfaces/FormBuilderProps'
import titleCase from '../../helpers/titleCase'
import './Education.css'

const educationFields: FormBuilderField[] = [
  { name: 'institution', id: uuid.v4(), type: 'text', required: true },
  { name: 'course', id: uuid.v4(), type: 'text', required: true },
  { name: 'start', id: uuid.v4(), type: 'month', required: false },
  { name: 'end', id: uuid.v4(), type: 'month', required: false },
  { name: 'grades', id: uuid.v4(), type: 'text', required: false },
  { name: 'additionalInfo', id: uuid.v4(), type: 'textarea', required: false }
]

/*
Important Note:

The Education and Experience components are identical in design, only differing
by the fields object above. The functionality below could be taken to a shared
child component and the data above provided in props.

The deliberate choice to not do this has been made, since while it would curb
some repetition, the developer does not know if these components will diverge
by the end of this project, and there certainly will not be more than two such
components. This does not trip the 'rule of three' but is worth noting.
*/

function Education(): JSX.Element {
  const [editorStatus, setEditorStatus] = useState<{
    isOpen: boolean
    itemID: null | string
  }>({
    isOpen: false,
    itemID: null
  })
  const [educations, setEducations] = useState<Record<string, string>[]>([])

  if (editorStatus.isOpen) {
    return (
      <>
        <h3>Edit Education</h3>

        <FormBuilder
          formFields={educationFields}
          // Take values from the form, and return an onSubmit function
          onSubmitFactory={(formValues: Record<string, string>) =>
            // onSubmit takes the form event, actions it, returning void
            (event: FormEvent<HTMLFormElement>): void => {
              event.preventDefault()
              // Hide editor after changes submitted
              setEditorStatus({ ...editorStatus, isOpen: false, itemID: null })
              // If this a new education, append it to the others
              if (editorStatus.itemID === null) {
                setEducations([...educations, formValues])
                return
              }
              // Else change the targetted education, leave the others unchanged
              setEducations(
                educations.map((education) =>
                  education.id === editorStatus.itemID ? formValues : education
                )
              )
            }}
          // If the editor is editing an existing task, pass that in
          existingData={
            educations.filter(
              (education) => education.id === editorStatus.itemID
            )[0] ?? null
          }
          onCancel={() => {
            // If cancelled, close the editor without writing to the educations
            setEditorStatus({ ...editorStatus, isOpen: false, itemID: null })
          }}
        />
      </>
    )
  }
  // Else
  return (
    <div className="education-wrapper">
      <h3>Education</h3>

      {educations.length === 0 ? (
        // If there are no educations, render None
        <div className="education-instance">None</div>
      ) : (
        // Else
        educations.map((education) => (
          // Map each education to a view of its data
          <div className="education-instance" key={education.id}>
            <div className="education-pairs">
              {educationFields.map((field) => (
                <div key={field.id}>
                  {/* For each field, render the name and stored data, if any */}
                  <span>{titleCase(field.name)}:</span>
                  <span>{education[field.name] || 'None'}</span>
                </div>
              ))}
            </div>
            <button
              // Button to edit this education
              type="button"
              onClick={() => {
                setEditorStatus({
                  ...editorStatus,
                  isOpen: true,
                  itemID: education.id
                })
              }}
            >
              Edit
            </button>
            <button
              // Button to delete this education
              type="button"
              onClick={() => {
                // Filter out this education by equivalent object
                setEducations(educations.filter((el) => el !== education))
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <button
        // Button to add a brand new education
        type="button"
        onClick={() => {
          setEditorStatus({
            ...editorStatus,
            isOpen: true,
            itemID: null
          })
        }}
      >
        Add Education
      </button>
    </div>
  )
}

export default Education
