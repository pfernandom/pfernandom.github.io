import React from 'react';
import { LayoutService, useLayoutService } from 'src/context/layout-context';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { WorkExperience } from 'src/models/interfaces';
import { withStore } from 'src/helpers/store';
import { useRouter } from 'next/router';
import { ExperienceSection } from './experience/experience-element';

type SkillRangeParams = {
  context?: LayoutService;
  experience: Array<WorkExperience>;
};

function filterRelevantExperience(skill: string, experience: Array<WorkExperience>) {
  const store = withStore();
  const allSkills = store.getTermsWithVariations([skill]);

  if (skill.length === 0 || allSkills.length === 0) {
    return experience;
  }

  const skllRegex = new RegExp(`(${allSkills.join('|')})`, 'ig');

  return experience.filter(exp => {
    return (
      skllRegex.test(exp.content) ||
      skllRegex.test(exp.description) ||
      skllRegex.test(exp.tags.join(',')) ||
      exp.responsibilities?.filter(resp => {
        return (
          skllRegex.test(resp.categories.join(',')) ||
          skllRegex.test(resp.content) ||
          skllRegex.test(resp.summary)
        );
      }).length > 0
    );
  });
}

const SkillPaneInner = observer(({ context, experience }: SkillRangeParams) => {
  const skill = context.selectedSkill;
  const role = context.selectedRole;

  const relevantExperience = filterRelevantExperience(skill, experience);

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
});

function SkillPane(params: SkillRangeParams) {
  const context = useLayoutService();
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SkillPaneInner context={context} {...params} />;
}

export default SkillPane;
