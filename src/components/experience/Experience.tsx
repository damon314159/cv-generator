import * as uuid from 'uuid'
import { type FormEvent, useState } from 'react'
import FormBuilder from '../formBuilder/FormBuilder'
import { type FormBuilderField } from '../../interfaces/FormBuilderProps'
import titleCase from '../../helpers/titleCase'
import './Experience.css'

const experienceFields: FormBuilderField[] = [
  { name: 'company', id: uuid.v4(), type: 'text', required: true },
  { name: 'jobTitle', id: uuid.v4(), type: 'text', required: true },
  { name: 'start', id: uuid.v4(), type: 'month', required: true },
  { name: 'end', id: uuid.v4(), type: 'month', required: false },
  { name: 'location', id: uuid.v4(), type: 'text', required: false },
  { name: 'responsibilities', id: uuid.v4(), type: 'textarea', required: false }
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

interface ExperienceProps {
  experiences: Record<string, string>[]
  setExperiences: React.Dispatch<React.SetStateAction<Record<string, string>[]>>
}

function Experience({
  experiences,
  setExperiences
}: ExperienceProps): JSX.Element {
  const [editorStatus, setEditorStatus] = useState<{
    isOpen: boolean
    itemID: null | string
  }>({
    isOpen: false,
    itemID: null
  })

  if (editorStatus.isOpen) {
    return (
      <>
        <h3>Edit Experience</h3>

        <FormBuilder
          formFields={experienceFields}
          // Take values from the form, and return an onSubmit function
          onSubmitFactory={(formValues: Record<string, string>) =>
            // onSubmit takes the form event, actions it, returning void
            (event: FormEvent<HTMLFormElement>): void => {
              event.preventDefault()
              // Hide editor after changes submitted
              setEditorStatus({ ...editorStatus, isOpen: false, itemID: null })
              // If this a new experience, append it to the others
              if (editorStatus.itemID === null) {
                setExperiences([...experiences, formValues])
                return
              }
              // Else change the targetted experience, leave the others unchanged
              setExperiences(
                experiences.map((experience) =>
                  experience.id === editorStatus.itemID
                    ? formValues
                    : experience
                )
              )
            }}
          // If the editor is editing an existing task, pass that in
          existingData={
            experiences.filter(
              (experience) => experience.id === editorStatus.itemID
            )[0] ?? null
          }
          onCancel={() => {
            // If cancelled, close the editor without writing to the experiences
            setEditorStatus({ ...editorStatus, isOpen: false, itemID: null })
          }}
        />
      </>
    )
  }
  // Else
  return (
    <div className="experience-wrapper">
      <h3>Experience</h3>

      {experiences.length === 0 ? (
        // If there are no experiences, render None
        <div className="experience-instance">
          <div>None</div>
        </div>
      ) : (
        // Else
        experiences.map((experience) => (
          // Map each experience to a view of its data
          <div className="experience-instance" key={experience.id}>
            <div className="experience-pairs">
              {experienceFields
                .filter((field) => ['company', 'jobTitle'].includes(field.name))
                .map((field) => (
                  <div key={field.id}>
                    {/* For each field, render the name and stored data, if any */}
                    <span>{titleCase(field.name)}:</span>
                    <span>{experience[field.name] || 'None'}</span>
                  </div>
                ))}
            </div>
            <button
              // Button to edit this experience
              type="button"
              onClick={() => {
                setEditorStatus({
                  ...editorStatus,
                  isOpen: true,
                  itemID: experience.id
                })
              }}
            >
              Edit
            </button>
            <button
              // Button to delete this experience
              type="button"
              onClick={() => {
                // Filter out this experience by equivalent object
                setExperiences(experiences.filter((el) => el !== experience))
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <button
        // Button to add a brand new experience
        type="button"
        onClick={() => {
          setEditorStatus({
            ...editorStatus,
            isOpen: true,
            itemID: null
          })
        }}
      >
        Add Experience
      </button>
    </div>
  )
}

export default Experience
