import { Header, Footer } from '@/components/layout'
import { Hero, Experience, Projects, Skills, Education, Contact } from '@/sections'
import { env } from '@/config'

function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

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

