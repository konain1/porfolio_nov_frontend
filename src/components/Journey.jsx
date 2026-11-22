import { FiCalendar } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa6';
import { experienceIcons } from '../icons.jsx';

export default function Journey({ experience }) {
  return (
    <section id="journey" className="section container journey">
      <div className="reveal">
        <p className="eyebrow">Journey</p>
        <h2 className="title">
          Experience &amp; <span className="grad-text">Education</span>
        </h2>
        <ul className="timeline">
          {experience.map((e) => {
            const Icon = experienceIcons[e.icon] || experienceIcons.work;
            return (
              <li className="card t-item" key={`${e.title}-${e.org}`}>
                <span className="icon-box round"><Icon /></span>
                <div className="t-body">
                  <h3>{e.title}</h3>
                  <p>{e.org}</p>
                </div>
                <div className="t-meta">
                  <span className="date"><FiCalendar /> {e.period}</span>
                  <span className={`pill ${e.kind}`}>{e.badge}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="reveal grad-visual" aria-hidden="true">
        <div className="orb small" />
        <div className="cap-badge">
          <FaGraduationCap />
          <strong>MCA &amp; BCA</strong>
          <span>Lovely Professional University</span>
        </div>
      </div>
    </section>
  );
}
