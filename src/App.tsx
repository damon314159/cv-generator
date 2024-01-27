import './App.css'
import { useState } from 'react'
import Info from './components/info/Info'
import Education from './components/education/Education'
import Experience from './components/experience/Experience'
import CvView from './components/cvView/CvView'

function App(): JSX.Element {
  const [userInfo, setUserInfo] = useState<Record<string, string> | null>(null)
  const [educations, setEducations] = useState<Record<string, string>[]>([])
  const [experiences, setExperiences] = useState<Record<string, string>[]>([])

  return (
    <>
      <div className="editors">
        <section className="info">
          <Info userInfo={userInfo} setUserInfo={setUserInfo} />
        </section>

        <section className="education">
          <Education educations={educations} setEducations={setEducations} />
        </section>

        <section className="experience">
          <Experience
            experiences={experiences}
            setExperiences={setExperiences}
          />
        </section>
      </div>

      <div className="cv-view">
        <CvView
          userInfo={userInfo}
          educations={educations}
          experiences={experiences}
        />
      </div>
    </>
  )
}

export default App
