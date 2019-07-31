import React from 'react';
import PropTypes from 'prop-types';
import './contact-card.scss';
import { GithubIcon, TwitterIcon, LinkedInIcon, PhoneIcon, EmailIcon } from './icons';

function ContactCard({ name, role, summary, contact = [], highlights }) {
  return (
    <div className="contact-card">
      <div className="info">
        <h1>{name}</h1>
        <h2>{role}</h2>

        <div className="summary">{summary}</div>
        <ul>
          {highlights.map(h => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
      <div className="contact-section">
        <h3>Contact</h3>
        <ul>
          {contact.map(c => (
            <li key={c.link} className={c.print ? '' : 'no-print'}>
              {
                {
                  github: <GithubIcon />,
                  twitter: <TwitterIcon />,
                  linkedin: <LinkedInIcon />,
                  phone: <PhoneIcon />,
                  mail: <EmailIcon />,
                }[c.icon]
              }
              <a href={c.link} target="_blank" rel="noopener noreferrer">
                {c.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  contact: PropTypes.array,
  highlights: PropTypes.arrayOf(PropTypes.string),
};

ContactCard.defaultProps = {
  contact: [],
  highlights: [],
};

export default ContactCard;
