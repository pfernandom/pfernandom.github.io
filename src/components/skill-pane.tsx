import React from 'react';
import { LayoutService, useLayoutService } from 'src/context/layout-context';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { WorkExperience } from 'src/models/data';
import { ExperienceSection } from './experience/experience-element';

const SkillPange = observer(
  ({ context, experience }: { context: LayoutService; experience: Array<WorkExperience> }) => {
    const skill = context.selectedSkill;
    const role = context.selectedRole;

    const skllRegex = new RegExp(skill, 'ig');

    const relevantExperience = experience.filter(exp => {
      return (
        exp.tags.includes(skill) ||
        exp.responsibilities?.filter(resp => {
          return resp.categories.includes(skill);
        }).length > 0 ||
        skllRegex.test(exp.content)
      );
    });

    return (
      skill &&
      skill.length > 0 && (
        <motion.div className="skill-pane">
          <h2>
            Skill: <mark>{skill}</mark>, Role: {role}{' '}
          </h2>
          <button
            className="nav-button"
            style={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => {
              context.clearFilters();
            }}
          >
            &larr; Back
          </button>

          <ExperienceSection experience={relevantExperience} skillsToHighlight={[skill]} />
        </motion.div>
      )
    );
  },
);

function SkillPane({ experience }: { experience: Array<WorkExperience> }) {
  const context = useLayoutService();

  return <SkillPange context={context} experience={experience} />;
}

export default SkillPane;
