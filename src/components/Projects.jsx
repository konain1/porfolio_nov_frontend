import { useMemo, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowUpRight, FiGithub } from 'react-icons/fi';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Websites' },
  { id: 'mobile', label: 'Mobile Apps' },
];

function Thumb({ project }) {
  if (project.image) return <img src={project.image} alt="" loading="lazy" />;
  // Generated mockup when no screenshot is provided
  return project.category === 'mobile' ? (
    <div className="mock phone">
      <div className="phone-frame">
        <i className="notch" />
        <i className="hero-block" />
        <i className="line w70" />
        <i className="line w40" />
        <div className="tiles"><i /><i /><i /><i /></div>
      </div>
    </div>
  ) : (
    <div className="mock browser">
      <div className="browser-bar"><i /><i /><i /></div>
      <div className="browser-body">
        <i className="side" />
        <div className="content">
          <i className="hero-block" />
          <div className="tiles"><i /><i /><i /></div>
          <i className="line w70" />
          <i className="line w40" />
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const track = useRef(null);
  const list = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  const scroll = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('.project');
    el.scrollBy({ left: dir * ((card?.offsetWidth || 280) + 20), behavior: 'smooth' });
  };

  return (
    <section id="projects" className="section container">
      <div className="projects-head reveal">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h2 className="title">
            My Creative <span className="grad-text">Projects</span>
          </h2>
        </div>
        <div className="projects-controls">
          <div className="tabs" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={filter === f.id ? 'on' : ''}
                onClick={() => {
                  setFilter(f.id);
                  track.current?.scrollTo({ left: 0 });
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="arrows">
            <button onClick={() => scroll(-1)} aria-label="Previous projects"><FiChevronLeft /></button>
            <button onClick={() => scroll(1)} aria-label="Next projects"><FiChevronRight /></button>
          </div>
        </div>
      </div>

      <div className="projects-track reveal" ref={track}>
        {list.map((p) => (
          <article className="card project" key={p._id || p.title} style={{ '--c': p.color }}>
            <div className="thumb"><Thumb project={p} /></div>
            <div className="project-body">
              <div>
                <h3>{p.title}</h3>
                <p className="sub">{p.subtitle}</p>
              </div>
              <div className="project-links">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} source code`}><FiGithub /></a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${p.title}`}><FiArrowUpRight /></a>
                )}
              </div>
            </div>
            <p className="muted desc">{p.description}</p>
            <ul className="tech">
              {p.tech?.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
