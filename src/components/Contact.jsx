import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { sendMessage } from '../api.js';
import { telHref } from '../utils.js';

const EMPTY = { name: '', email: '', subject: '', budget: '', message: '', website: '' };
const BUDGETS = ['Not sure yet', '< ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000+'];

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [errors, setErrors] = useState({});

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    setErrors({});
    try {
      const res = await sendMessage(form);
      setStatus({ state: 'success', message: res.message });
      setForm(EMPTY);
    } catch (err) {
      setErrors(err.errors || {});
      setStatus({
        state: 'error',
        message:
          err.message === 'Failed to fetch'
            ? `Couldn’t reach the server. Please email me at ${profile.email}.`
            : err.message,
      });
    }
  }

  const channels = [
    { Icon: FiMail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { Icon: FiPhone, label: 'Phone', value: profile.phone, href: telHref(profile.phone) },
    profile.socials?.whatsapp && { Icon: FaWhatsapp, label: 'WhatsApp', value: 'Chat with me', href: profile.socials.whatsapp },
    { Icon: FiMapPin, label: 'Location', value: profile.location },
  ].filter(Boolean);

  return (
    <section id="contact" className="section container">
      <div className="section-head reveal">
        <p className="eyebrow">Contact</p>
        <h2 className="title">
          Let’s Build Something <span className="grad-text">Great</span>
        </h2>
        <p className="muted narrow">
          Need a website or mobile app? Tell me about your project and I’ll reply within 24 hours with next steps and a quote.
        </p>
      </div>

      <div className="contact">
        <ul className="channels reveal">
          {channels.map(({ Icon, label, value, href }) => (
            <li key={label} className="card channel">
              <span className="icon-box"><Icon /></span>
              <div>
                <span className="label">{label}</span>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{value}</a>
                ) : (
                  <strong>{value}</strong>
                )}
              </div>
            </li>
          ))}
        </ul>

        <form className="card form reveal" onSubmit={onSubmit} noValidate>
          <div className="row">
            <label>
              Name
              <input name="name" value={form.name} onChange={update} placeholder="Your name" required autoComplete="name" aria-invalid={!!errors.name} />
              {errors.name && <small>{errors.name}</small>}
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com" required autoComplete="email" aria-invalid={!!errors.email} />
              {errors.email && <small>{errors.email}</small>}
            </label>
          </div>
          <div className="row">
            <label>
              Project type
              <input name="subject" value={form.subject} onChange={update} placeholder="Website, mobile app, redesign…" />
            </label>
            <label>
              Budget
              <select name="budget" value={form.budget} onChange={update}>
                <option value="">Select a range</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={update} placeholder="Tell me about your idea, timeline and goals…" required aria-invalid={!!errors.message} />
            {errors.message && <small>{errors.message}</small>}
          </label>
          {/* Honeypot for bots */}
          <input className="hp" name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <button className="btn btn-primary" disabled={status.state === 'sending'}>
            <FiSend /> {status.state === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status.message && (
            <p className={`form-status ${status.state}`} role="status">{status.message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
