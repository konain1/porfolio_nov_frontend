import { skillIcons } from '../icons.jsx';

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section container">
      <div className="reveal">
        <p className="eyebrow">Expertise</p>
        <h2 className="title">
          Skills &amp; <span className="grad-text">Technologies</span>
        </h2>
      </div>
      <div className="skills-grid">
        {skills.map((s) => {
          const { Icon, color } = skillIcons[s.icon] || skillIcons.react;
          return (
            <div className="card skill reveal" key={s.name}>
              <span className="skill-icon" style={{ color }}><Icon /></span>
              <div className="skill-body">
                <div className="skill-top">
                  <h3>{s.name}</h3>
                  <span>{s.level}%</span>
                </div>
                <div className="bar" role="meter" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={s.name}>
                  <span style={{ '--w': `${s.level}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
