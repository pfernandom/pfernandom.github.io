import { WorkExperience } from 'src/models/data';

// eslint-disable-next-line no-unused-vars
export type Callback<P, T> = (params: P | unknown) => T;

export function debouncer(timeInMillis: number, _fn: Callback<any, any>, args?) {
  let canCall = true;
  return function _voidFn(...params) {
    if (canCall) {
      _fn.call(args ?? this, ...params);
      canCall = false;
      setTimeout(() => {
        canCall = true;
      }, timeInMillis);
    }
  };
}

export function highlightTermInContent(
  workExperience: WorkExperience,
  skillToHighlight: Array<string>,
) {
  if (!skillToHighlight || skillToHighlight.length === 0) {
    return workExperience;
  }

  const highlight = [...(Array.isArray(skillToHighlight) && skillToHighlight)].join('|');

  const regEx = new RegExp(`(${highlight})`, 'ig');

  const { description, content: experienceContent, responsibilities, ...rest } = workExperience;
  const newDescription = description.replaceAll(regEx, '<mark>$1</mark>');
  const newResponsibilities = responsibilities?.map(({ summary, content, ...restResp }) => ({
    summary: summary?.replaceAll(regEx, '<mark>$1</mark>'),
    content: content.replaceAll(regEx, '<mark>$1</mark>'),
    ...restResp,
  }));

  const newExperience: WorkExperience = {
    description: newDescription,
    responsibilities: newResponsibilities,
    content: experienceContent?.replaceAll(regEx, '<mark>$1</mark>'),
    ...rest,
  };

  return newExperience;
}

export function parseDates(allWorkExperience: Array<WorkExperience>) {
  return allWorkExperience
    .map(i => {
      const startDate: Date | null = i.startDate && new Date(i.startDate);
      const endDate: Date | null = i.endDate && new Date(i.endDate);
      const print = true;
      return { ...i, startDate, endDate, print };
    })
    .sort((a, b) => {
      if (!a.startDate) {
        return -1;
      }
      if (!b.startDate) {
        return 1;
      }
      return b.startDate.getTime() - a.startDate.getTime();
    });
}

export function mapBySkillsSet(skillsSet: Set<string>) {
  return exp => {
    if (exp.tags.filter(tag => skillsSet.has(tag)).length > 0) {
      return exp;
    }
    const responsibilities = [
      {
        content: `<div class="no-relevant-text">
            No relevant work experience for this project for the selected role
            </div>`,
        categories: [],
      },
    ];
    return { ...exp, responsibilities };
  };
}

export function filterLatestProjects(
  workExperienceList: Array<WorkExperience>,
  years: number,
  count: number,
): Array<Array<WorkExperience>> {
  const thisYear = new Date().getFullYear();
  const filteredByDate = workExperienceList.filter(
    experience => thisYear - new Date(experience.startDate).getFullYear() < years,
  );

  const limit = Math.max(count, filteredByDate.length);
  return [workExperienceList.slice(0, limit), workExperienceList.slice(limit)];
}
