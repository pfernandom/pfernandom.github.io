import personalData from './data/workExperience/personal';
import linkedData from './data/workExperience/linkedin';
import magellanData from './data/workExperience/magellan';
import reachData from './data/workExperience/reach';
import apspData from './data/workExperience/apsp';
import softtekData from './data/workExperience/softtek';
import tdsiData from './data/workExperience/tdsi';

describe('linkedin data', () => {
  function responsibilitySkillsMatch(experience) {
    const allTags = experience.responsibilities.reduce((acc, el) => [...acc, ...el.categories], []);
    const expTags = experience.tags;
    return allTags.every(val => {
      if (!expTags.includes(val)) {
        // eslint-disable-next-line no-console
        console.log('Missing skill:', val);
      }
      return expTags.includes(val);
    });
  }

  it('Personal data renders correctly', () => {
    expect(personalData.project).toBe('Personal Projects');
    expect(responsibilitySkillsMatch(personalData)).toBe(true);
  });

  it('LinkedIn renders correctly', () => {
    expect(linkedData.project).toBe('LinkedIn');
    expect(responsibilitySkillsMatch(linkedData)).toBe(true);
  });

  it('Magellan renders correctly', () => {
    expect(magellanData.project).toBe('Magellan (at Accenture)');
    expect(responsibilitySkillsMatch(magellanData)).toBe(true);
  });

  it('Reach renders correctly', () => {
    expect(reachData.project).toBe('ACSSP/REACH (at Accenture)');
    expect(responsibilitySkillsMatch(reachData)).toBe(true);
  });

  it('APSP renders correctly', () => {
    expect(apspData.project).toBe('APSP (at Accenture)');
    expect(responsibilitySkillsMatch(apspData)).toBe(true);
  });

  it('Softtek renders correctly', () => {
    expect(softtekData.project).toBe('Center of Excellence for Security (at Softtek)');
    expect(responsibilitySkillsMatch(softtekData)).toBe(true);
  });

  it('TDSI renders correctly', () => {
    expect(tdsiData.project).toBe('TDSI Consultoria');
    expect(responsibilitySkillsMatch(tdsiData)).toBe(true);
  });
});
