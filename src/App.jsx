import { useEffect, useState } from 'react';
import { getPortfolio } from './api.js';
import fallback from './data/fallback.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Journey from './components/Journey.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function readTheme() {
  try {
    return localStorage.getItem('theme') || 'dark';
  } catch {
    return 'dark';
  }
}

export default function App() {
  const [data, setData] = useState(fallback);
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    getPortfolio()
      .then(setData)
      .catch((err) => console.warn('API unavailable, showing bundled content:', err.message));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage blocked — theme just won't persist */
    }
  }, [theme]);

  // Fade sections in as they scroll into view
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [data]);

  const { profile, services, experience, skills, projects } = data;

  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <Navbar name={profile.name} theme={theme} setTheme={setTheme} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Services services={services} />
        <Journey experience={experience} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
