import { Header, Footer } from '@/components/layout'
import { Hero, Experience, Projects, Skills, Education, Contact } from '@/sections'
import { env } from '@/config'

function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-large opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />
      </div>

      <Header />

      <main>
        <Hero />

        {/* Section divider */}
        <div className="section-divider" />

        {env.showExperience && (
          <>
            <Experience />
            <div className="section-divider" />
          </>
        )}

        {env.showProjects && (
          <>
            <Projects />
            <div className="section-divider" />
          </>
        )}

        {env.showSkills && (
          <>
            <Skills />
            <div className="section-divider" />
          </>
        )}

        {env.showEducation && (
          <>
            <Education />
            <div className="section-divider" />
          </>
        )}

        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
