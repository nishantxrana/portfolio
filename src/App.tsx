import { Header, Footer } from '@/components/layout'
import { Hero, Experience, Projects, Skills, Education, Contact } from '@/sections'
import { env } from '@/config'

function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <Hero />
        {env.showExperience && <Experience />}
        {env.showProjects && <Projects />}
        {env.showSkills && <Skills />}
        {env.showEducation && <Education />}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
