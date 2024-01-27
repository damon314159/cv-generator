import './CvView.css'

interface CvViewProps {
  userInfo: Record<string, string> | null
  educations: Record<string, string>[]
  experiences: Record<string, string>[]
}

function formatDate(date: string): string {
  if (!date) {
    return ''
  }
  const [year, monthNum] = date.split('-')
  const month = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  }[monthNum]
  return `${month} ${year}`
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
              {education.institution} {education.grades}
            </p>
            <p>
              {((start, end) => {
                if (start) {
                  return end ? `${start} - ${end}` : `${start} - Present`
                }
                return end ? `Completed ${end}` : ''
              })(formatDate(education.start), formatDate(education.end))}
            </p>
            <p>{education.additionalInfo}</p>
          </div>
        ))}
      </section>

      <section className="experience">
        <h2>Work Experience</h2>
        {experiences.map((experience) => (
          <div key={experience.id}>
            <h3>{experience.jobTitle}</h3>
            <p>
              {experience.company} {experience.location}
            </p>
            <p>
              {((start, end) => {
                if (start) {
                  return end ? `${start} - ${end}` : `${start} - Present`
                }
                return end ? `Completed ${end}` : ''
              })(formatDate(experience.start), formatDate(experience.end))}
            </p>
            <p>{experience.responsibilities}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default CvView
