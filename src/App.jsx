import { useEffect } from 'react';
import { IconSprite } from './components/Icons.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Goals from './components/Goals.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { SECTION_IDS } from './data/content.js';
import { useActiveSection } from './hooks/useActiveSection.js';
import { useSectionTracking } from './hooks/useSectionTracking.js';
import { trackVisit } from './api.js';

export default function App() {
  const active = useActiveSection(SECTION_IDS);
  useSectionTracking(SECTION_IDS);

  useEffect(() => { trackVisit(); }, []);

  return (
    <>
      <IconSprite />
      <a className="skip" href="#main">Aller au contenu</a>
      <Header active={active} />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Education />
        <Goals />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
