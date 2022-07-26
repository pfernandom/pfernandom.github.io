import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FaLevelUpAlt } from 'react-icons/fa';
import { Metadata } from 'src/models/data';
import NewsComponent from './news';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'linear',
      duration: 0.3,
    },
  },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Layout({
  data,
  children,
}: {
  data: Metadata;
  children: React.ReactElement;
}) {
  return (
    <>
      <div id="top" />
      <motion.main
        key="mainanimation"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        <AnimatePresence>
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              paddingTop: 0,
            }}
          >
            {children}
          </div>
        </AnimatePresence>
      </motion.main>
      <footer style={{ marginTop: '2em' }}>
        <div>{data?.title}</div>© {new Date().getFullYear()}
        <a href="#top" className="no-print">
          &uarr; Go to top
        </a>
      </footer>
    </>
  );
}
