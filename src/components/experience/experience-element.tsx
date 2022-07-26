/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Responsibility, WorkExperience } from 'src/models/interfaces';
import { debouncer, filterLatestProjects, highlightTermInContent } from 'src/helpers/utils';
import { AnimationControls, motion, useAnimationControls } from 'framer-motion';
import Markdown from '../markdown';

function ResponsibilityContainer({ value }: { value: Responsibility }) {
  return (
    <li className="resp__content">
      {value.summary ? (
        <div>
          <Markdown className="resp__summary" value={value.summary} />
          <Markdown className="resp__collapsible-content" value={value.content} />
        </div>
      ) : (
        <Markdown value={value.content} />
      )}
    </li>
  );
}

function ExperienceTitle({ experience: e }: { experience: WorkExperience }) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  const startDate1 = new Date(e.startDate);
  const endDate1 = new Date(e.endDate);
  const startDate = e.startDate ? startDate1.toLocaleDateString('en-US', options) : 'Today';
  const endDate = e.endDate ? endDate1.toLocaleDateString('en-US', options) : 'Today';
  return (
    <span className="collapsible-heading">
      <div className="collapsible-heading__title">
        <h3 className="collapsible-heading__role">{e.role}</h3>
        {e.startDate && (
          <div className="collapsible-heading__date">
            {startDate} to {endDate}
          </div>
        )}
      </div>
      <h4 className="collapsible-heading__project">{e.project}</h4>
    </span>
  );
}

type ExperienceProps = {
  experience: WorkExperience;
  shouldPrint?: boolean;
  highlights?: Array<string>;
  skillToHighlight?: Array<string>;
  animControl: AnimationControls;
  alwaysVisible?: boolean;
};

export default function ExperienceElement({
  experience,
  shouldPrint,
  animControl,
  skillToHighlight,
  highlights,
  alwaysVisible,
}: ExperienceProps) {
  const control = animControl || useAnimationControls();

  function isVisible(responsibilities) {
    if (highlights.length === 0) {
      return true;
    }
    return responsibilities.some(v => highlights.includes(v));
  }

  const variants = {
    displayed: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'linear',
        duration: 0.3,
      },
    },
    hidden: alwaysVisible ? {} : { opacity: 0, x: -200, y: 0 },
  };

  const experienceToRender = highlightTermInContent(experience, skillToHighlight);
  useEffect(() => {
    control.start('displayed');
  });

  return (
    <motion.div
      initial="hidden"
      key={experienceToRender.project}
      variants={variants}
      animate={animControl}
      className={`experience__project ${isVisible(experience.tags) ? '' : ' disabled'} ${
        shouldPrint ? '' : 'no-print'
      }`}
    >
      <div>
        <ExperienceTitle experience={experienceToRender} />
        {!isVisible(experience.tags) && (
          <span className="instructions">The selected skills were not used in this project</span>
        )}
        <Markdown className="experience--description" value={experienceToRender.description} />
        <ul className={`responsibilities ${!isVisible(experience.tags) && 'hidden'}`}>
          {experienceToRender.responsibilities?.map(r => (
            <ResponsibilityContainer key={`${r.content}`} value={r} />
          ))}
        </ul>
        {experienceToRender.content && (
          <Markdown className="experience--description" value={experienceToRender.content} />
        )}
      </div>
    </motion.div>
  );
}

ExperienceElement.defaultProps = {
  shouldPrint: true,
  highlights: [],
  skillToHighlight: null,
  alwaysVisible: false,
};

export function ExperienceSection({
  experience,
  skillsToHighlight,
}: {
  experience: Array<WorkExperience>;
  skillsToHighlight?: Array<string>;
}) {
  const [isExpanded, setExpanded] = useState(false);
  const controls = useAnimationControls();

  const [experienceToRender, restOfExperience] = filterLatestProjects(experience, 4, 2);
  const onExpand = debouncer(500, async () => {
    if (isExpanded) {
      await controls.start('hidden');
      setExpanded(!isExpanded);
    } else {
      setExpanded(!isExpanded);
    }
  });

  if (restOfExperience.length === 0) {
    return (
      <>
        {experienceToRender.map(exp => (
          <ExperienceElement
            key={exp.project}
            experience={exp}
            skillToHighlight={skillsToHighlight}
            animControl={controls}
            alwaysVisible
          />
        ))}
      </>
    );
  }

  return (
    <>
      {experienceToRender.map(exp => (
        <ExperienceElement
          key={exp.project}
          experience={exp}
          skillToHighlight={skillsToHighlight}
          animControl={controls}
          alwaysVisible
        />
      ))}

      <button className="no-print nav-button" onClick={onExpand}>
        {isExpanded ? 'See less' : 'See all'} work experience
      </button>

      {isExpanded &&
        restOfExperience.map(exp => (
          <ExperienceElement
            key={exp.project}
            experience={exp}
            skillToHighlight={skillsToHighlight}
            animControl={controls}
          />
        ))}
    </>
  );
}

ExperienceSection.defaultProps = {
  skillsToHighlight: [],
};
