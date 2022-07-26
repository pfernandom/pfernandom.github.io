import {
  motion,
  MotionValue,
  useScroll,
  useMotionTemplate,
  useTransform,
  useAnimation,
  AnimatePresence,
} from 'framer-motion';
import React, { useRef, useState } from 'react';
import { LayoutService, useLayoutService } from 'src/context/layout-context';
import { observer, Observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { Callback } from 'src/helpers/utils';
import { useMediaQuery } from './category-link';

function ScrollableContainer({ children, useShadows = true }) {
  const elementRef = useRef<HTMLDivElement>();

  const { scrollYProgress }: { scrollYProgress: MotionValue; scrollY: MotionValue } = useScroll({
    container: elementRef,
  });

  const bottomScrollY = useTransform(scrollYProgress, latest => 1 - latest);

  const backgroundImage: any = useMotionTemplate`
  linear-gradient(to bottom,rgba(54, 69, 79,${scrollYProgress}), rgba(54, 69, 79, 0))`;

  const bottomBackgroundImage: any = useMotionTemplate`
  linear-gradient(to bottom, rgba(54, 69, 79, 0), rgba(54, 69, 79,${bottomScrollY}))`;

  return (
    <motion.div className="scroll-list-container">
      {useShadows && (
        <motion.div
          className="fade_top"
          style={{
            backgroundImage,
          }}
        />
      )}

      <motion.div animate={{ x: 0 }} ref={elementRef} className="scroll-list-container--scrollable">
        {children}
      </motion.div>

      {useShadows && (
        <motion.div
          className="fade_top"
          style={{
            bottom: 0,
            backgroundImage: bottomBackgroundImage,
          }}
        />
      )}
    </motion.div>
  );
}

function ExpandableList({
  skills,
  onClick,
}: {
  skills: Array<string>;
  onClick: Callback<string, void>;
}) {
  const context = useLayoutService();
  const isLg = useMediaQuery('(max-width: 700px)');

  const skillButoonsVariants = {
    initial: { scale: 1, opacity: 1 },
    selected: custom => {
      if (context.selectedSkill === custom) {
        return {
          scale: 1,
          opacity: 1,
        };
      }
      return {
        scale: 1,
        opacity: 1,
      };
    },
  };

  return (
    <ScrollableContainer useShadows>
      <motion.ul className="skill-list">
        <li className="skill-list-separator skill-list-separator--top" />
        {skills.map(skill => (
          <li key={skill} className="skill-action">
            <motion.button
              custom={skill}
              variants={skillButoonsVariants}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: isLg ? 1.1 : 1.2 }}
              onClick={() => {
                onClick.call(null, skill);
              }}
            >
              {skill}
            </motion.button>
          </li>
        ))}
        <li className="skill-list-separator skill-list-separator--bottom" />
      </motion.ul>
    </ScrollableContainer>
  );
}

const HideWhenFiltered = observer(
  ({ context, children }: { context: LayoutService; children: any }) => {
    if (context.getIsSkillSelected()) {
      return <div />;
    }
    return children;
  },
);

function SkillsList({ roles }: { roles: Array<any> }) {
  const context = useLayoutService();

  const controls = useAnimation();

  return (
    <AnimatePresence key="animatePrescence2" exitBeforeEnter>
      <HideWhenFiltered context={context}>
        <motion.div className="skill-list-container" animate={controls}>
          {roles.map(roleWithSkills => (
            <motion.div key={roleWithSkills.role} className="skill-list-column">
              <div style={{ color: 'white' }} className={['text-align-center', 'pv-1'].join(' ')}>
                {roleWithSkills.role}
              </div>

              <ExpandableList
                skills={roleWithSkills.skills}
                onClick={async skill => {
                  await controls.start({ opacity: 0 });
                  context.setRoleAndSkill({ role: roleWithSkills.role, skill });
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </HideWhenFiltered>
    </AnimatePresence>
  );
}

export default SkillsList;
