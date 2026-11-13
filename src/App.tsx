import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { Header, Footer } from '@/components/layout'
import { CommandMenu, SkipLink } from '@/components/ui'
import { BootSequence, Cursor, PipelineRail } from '@/components/fx'
import { initSmoothScroll } from '@/lib/smoothScroll'
import { Hero, Experience, Projects, Skills, Education, Contact } from '@/sections'
import { env } from '@/config'

function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => initSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <BootSequence onDone={() => setReady(true)} />
      <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <SkipLink />
        <Header />
        <CommandMenu />
        <PipelineRail />
        <Cursor />

        <main id="main" tabIndex={-1} className="outline-none">
          <Hero ready={ready} />
          {env.showExperience && <Experience />}
          {env.showProjects && <Projects />}
          {env.showSkills && <Skills />}
          {env.showEducation && <Education />}
          <Contact />
        </main>

        <Footer />

        {/* film grain + scanlines */}
        <div className="grain pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />
      </div>
    </MotionConfig>
  )
}

export default App
