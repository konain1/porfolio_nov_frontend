import { serviceIcons } from '../icons.jsx';

export default function Services({ services }) {
  return (
    <section id="services" className="section container">
      <div className="section-head reveal">
        <p className="eyebrow">What I do</p>
        <h2 className="title">
          Services for Your <span className="grad-text">Business</span>
        </h2>
        <p className="muted narrow">
          From a single landing page to a complete web or mobile product — I handle design-to-code, development and launch.
        </p>
      </div>
      <div className="services-grid">
        {services.map((s) => {
          const Icon = serviceIcons[s.icon] || serviceIcons.web;
          return (
            <article className="card service reveal" key={s.title}>
              <span className="icon-box"><Icon /></span>
              <h3>{s.title}</h3>
              <p className="muted">{s.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
