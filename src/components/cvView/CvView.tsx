import './CvView.css'

interface CvViewProps {
  userInfo: Record<string, string> | null
  educations: Record<string, string>[]
  experiences: Record<string, string>[]
}

function CvView({
  userInfo,
  educations,
  experiences
}: CvViewProps): JSX.Element {
  if (userInfo === null) return <div />
  return (
    <div>
      <header>
        <h1>{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
        <h3>{userInfo.jobTitle}</h3>
      </header>

      <section className="contact-details">
        <h2>Contact Details</h2>
        <ul>
          <li>Email: {userInfo.email}</li>
          <li>Phone: {userInfo.phone}</li>
          <li>
            Address:{' '}
            {`${userInfo.city}${userInfo.city && userInfo.county ? ', ' : ''}${
              userInfo.county
            }`}
          </li>
        </ul>
      </section>

      <section className="education">
        <h2>Education</h2>
        {educations.map((education) => (
          <div key={education.id}>
            <h3>{education.course}</h3>
            <p>
              {education.institution}, {education.start}
              {' - '}
              {education.end || 'Present'}
            </p>
          </div>
        ))}
      </section>

      <section className="experience">
        <h2>Work Experience</h2>
        {experiences.map((experience) => (
          <div key={experience.id}>
            <h3>{experience.jobTitle}</h3>
            <p>
              {experience.company}, {experience.start}
              {' - '}
              {experience.end || 'Present'}
            </p>
            <ul>
              <li>{experience.responsibility1}</li>
              <li>{experience.responsibility2}</li>
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}

export default CvView
