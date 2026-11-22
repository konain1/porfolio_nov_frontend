import { FiDownload, FiMail } from 'react-icons/fi';
import { SiReact, SiFigma } from 'react-icons/si';
import { FaMobileScreen } from 'react-icons/fa6';
import { socialIcons } from '../icons.jsx';
import { yearsSince } from '../utils.js';

export default function Hero({ profile }) {
  const [first, ...rest] = profile.name.split(' ');
  const socials = Object.entries(profile.socials || {}).filter(([, url]) => url);

  return (
    <section id="home" className="hero container">
      <div className="hero-copy reveal">
        <div className="hero-top">
          <ul className="socials" aria-label="Social links">
            {socials.map(([key, url]) => {
              const s = socialIcons[key];
              if (!s) return null;
              return (
                <li key={key}>
                  <a href={url} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <s.Icon />
                  </a>
                </li>
              );
            })}
            <li>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <FiMail />
              </a>
            </li>
          </ul>
          {profile.available && (
            <span className="status">
              <span className="dot" /> Available for freelance
            </span>
          )}
        </div>

        <h1>
          <span className="hi">Hi, I’m</span>
          <span className="name grad-text">
            {first} {rest.join(' ')}
          </span>
        </h1>
        <p className="role">{profile.role}</p>
        <p className="lead">{profile.intro}</p>

        <div className="btn-row">
          <a className="btn btn-primary" href={profile.resumeUrl || '#contact'} download={profile.resumeUrl ? '' : undefined}>
            <FiDownload /> Download CV
          </a>
          <a className="btn btn-ghost" href="#contact">
            <FiMail /> Hire Me
          </a>
        </div>
      </div>

      <div className="hero-visual reveal" aria-hidden="true">
        <div className="orb" />
        <div className="code-card">
          <div className="code-bar">
            <i /><i /><i />
            <span>developer.js</span>
          </div>
          <pre>
            <code>
              <span className="k">const</span> <span className="v">developer</span> = {'{'}
              {'\n  '}<span className="p">name</span>: <span className="s">'{profile.name}'</span>,
              {'\n  '}<span className="p">role</span>: <span className="s">'{profile.role}'</span>,
              {'\n  '}<span className="p">company</span>: <span className="s">'Proveway'</span>,
              {'\n  '}<span className="p">freelance</span>: <span className="s">'Sun-Bean'</span>,
              {'\n  '}<span className="p">builds</span>: [<span className="s">'Websites'</span>, <span className="s">'Mobile Apps'</span>],
              {'\n  '}<span className="p">location</span>: <span className="s">'{profile.location}'</span>,
              {'\n  '}<span className="p">available</span>: <span className="k">{String(!!profile.available)}</span>,
              {'\n'}{'}'};
            </code>
          </pre>
        </div>
        <span className="float f1">&lt;/&gt;</span>
        <span className="float f2"><SiReact /></span>
        <span className="float f3"><SiFigma /></span>
        <span className="float f4"><FaMobileScreen /></span>
        <div className="mini-stat">
          <strong>{yearsSince(profile.careerStart)}+</strong>
          <span>Years of<br />experience</span>
        </div>
      </div>
    </section>
  );
}
