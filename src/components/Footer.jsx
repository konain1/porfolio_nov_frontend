import { FiArrowUp } from 'react-icons/fi';

export default function Footer({ profile }) {
  return (
    <footer className="footer container">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React, Node.js, Express &amp; MongoDB.
      </p>
      <a href="#home" className="to-top" aria-label="Back to top"><FiArrowUp /></a>
    </footer>
  );
}
