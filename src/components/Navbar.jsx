import { useEffect, useState } from 'react';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ name, theme, setTheme }) {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [first, ...rest] = name.split(' ');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav" aria-label="Main">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">{first[0]}</span>
          <span>
            {first}
            <span className="grad-text">{rest.join(' ')}</span>
          </span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="theme-toggle" role="group" aria-label="Color theme">
            <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')} aria-label="Dark theme">
              <FiMoon />
            </button>
            <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')} aria-label="Light theme">
              <FiSun />
            </button>
          </div>
          <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
}
