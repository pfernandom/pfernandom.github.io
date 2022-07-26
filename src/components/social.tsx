import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';
import React from 'react';

export default function SocialAndContact() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '1em',
        right: '1em',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 4,
      }}
    >
      <motion.span whileHover={{ scale: 1.3 }}>
        <SocialIcon
          url="https://www.instagram.com/pedro.marquez.soto/"
          fgColor="white"
          style={{ marginBottom: '10px' }}
        />
      </motion.span>
      <motion.span whileHover={{ scale: 1.3 }}>
        <SocialIcon
          url="https://www.linkedin.com/in/pedro-fernando-m%C3%A1rquez-soto-1218a345/"
          fgColor="white"
          style={{ marginBottom: '10px' }}
        />
      </motion.span>
      <motion.span whileHover={{ scale: 1.3 }}>
        <SocialIcon
          url="https://medium.com/@pfernandom"
          fgColor="white"
          style={{ marginBottom: '10px' }}
        />
      </motion.span>
      <motion.span whileHover={{ scale: 1.3 }}>
        <SocialIcon
          url="https://pedromarquez.dev"
          fgColor="white"
          style={{ marginBottom: '10px' }}
        />
      </motion.span>
      <motion.span whileHover={{ scale: 1.3 }}>
        <SocialIcon url="mailto:pfernandom+cv@gmail.com" fgColor="white" />
      </motion.span>
    </div>
  );
}
