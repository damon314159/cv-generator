import './App.css'
import Info from './components/info/Info'
import Education from './components/education/Education'
import Experience from './components/experience/Experience'

function App(): JSX.Element {
  return (
    <div>
      <section className="info">
        <Info />
      </section>

      <section className="education">
        <Education />
      </section>

      <section className="experience">
        <Experience />
      </section>
    </div>
  )
}

export default App
