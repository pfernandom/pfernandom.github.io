/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import './style.scss';

import ContactCard from '../components/contact-card';

const id = {
  name: 'Pedro Marquez',
  role: 'Full-stack Software Engineer',
  summary: 'Full Stack developer, Java Architect and Certified Ethical Hacker.',
  graduationDate: '2011/07/01',
  highlights: [
    '9+ years of experience in front-end technologies (JavaScript, CSS, HTML),',
    '5+ years of experience in Java technologies (back-end),',
    '2 years of experience in Application Security and Penetration Testing',
  ],
  contact: [
    {
      icon: 'github',
      link: 'https://github.com/pfernandom',
      text: 'Github',
      print: false,
    },
    {
      icon: 'linkedin',
      link: 'https://www.linkedin.com/in/pedro-fernando-márquez-soto-1218a345/?locale=en_US',
      text: 'LinkedIn',
      print: false,
    },
    {
      icon: 'twitter',
      link: 'https://twitter.com/pfernandom',
      text: 'Twitter',
      print: false,
    },
    {
      icon: 'mail',
      link: 'mailto:pfernandom@gmail.com',
      text: 'pfernandom@gmail.com',
      print: true,
    },
    {
      icon: 'phone',
      link: 'tel:+5129039712',
      text: '(512) 903-9712',
      print: true,
    },
  ],
};

storiesOf('ContactCard', module).add('default', () => <ContactCard role={id.role} {...id} />);
