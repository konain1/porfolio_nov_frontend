import { FiArrowRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { SiReact } from 'react-icons/si';
import { initials, statValue, telHref } from '../utils.js';

export function AvatarOrb({ profile }) {
  return (
    <div className="avatar-orb" aria-hidden={!profile.avatar}>
      <div className="ring" />
      <div className="avatar-core">
        {profile.avatar ? (
          <img src={profile.avatar} alt={profile.name} />
        ) : (
          <span className="monogram">{initials(profile.name)}</span>
        )}
      </div>
      <span className="chip chip-a">&lt;/&gt;</span>
      <span className="chip chip-b"><SiReact /></span>
    </div>
  );
}

export default function About({ profile }) {
  return (
    <section id="about" className="section container about">
      <div className="reveal">
        <AvatarOrb profile={profile} />
      </div>
      <div className="reveal">
        <p className="eyebrow">About me</p>
        <h2 className="title">
          {profile.aboutTitle} <span className="grad-text">{profile.aboutHighlight}</span>
        </h2>
        <p className="muted">{profile.about}</p>

        <div className="stats">
          {profile.stats?.map((s) => (
            <div className="stat card" key={s.label}>
              <strong>{statValue(s, profile)}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <ul className="info-list">
          <li><FiMail /> <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><FiPhone /> <a href={telHref(profile.phone)}>{profile.phone}</a></li>
          <li><FiMapPin /> {profile.location}</li>
        </ul>

        <a href="#contact" className="btn btn-primary btn-sm">
          Let’s Talk <FiArrowRight />
        </a>
      </div>
    </section>
  );
}
