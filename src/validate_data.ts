import colors from 'colors/safe';
import { IdCard, Role, Metadata, PostInfo, WorkExperience } from './models/interfaces';
import { parseDates, mapBySkillsSet, filterBySkills } from './helpers/utils';
import { getAllPosts } from './helpers/page-fetcher';
import { getDataFile, getDataFiles } from './helpers/data-fetchers';

async function main() {
  const idCard: IdCard = await getDataFile('src/data/idCard/idCard.json');
  const allRoles: Array<Role> = await getDataFiles('src/data/roles/');
  const metadata: Metadata = await getDataFile('src/data/metadata.json');

  const posts: Array<PostInfo> = getAllPosts();

  function print(str, isError = false) {
    if (isError) {
      console.log(colors.red(str));
      return;
    }
    console.log(colors.green(str));
  }

  const allWorkExperience: Array<WorkExperience> = await getDataFiles('src/data/workExperience/');

  let allSkillsInExperiences = [];
  posts.forEach(post => {
    const skillsSet = new Set(post.frontmatter.skills);
    const experience = parseDates(allWorkExperience)
      .map(mapBySkillsSet(skillsSet))
      .filter(filterBySkills(skillsSet));

    console.log(
      `For role ${post.frontmatter.title}, there are ${experience.length} experience records`,
    );

    allSkillsInExperiences = [...allSkillsInExperiences, ...post.frontmatter.skills];
  });

  const allSkillsSet = new Set([
    ...allSkillsInExperiences,
    ...allWorkExperience.reduce((acc, exp) => [...acc, ...exp.tags], []),
  ]);

  allSkillsInExperiences = Array.from(allSkillsSet);

  allSkillsInExperiences.sort();

  allSkillsInExperiences.forEach(skill => {
    const filteredPosts = posts.filter(p => p.frontmatter.skills.includes(skill));
    const msg = `For skill ${skill}, there are ${filteredPosts.length} experience records`;
    print(msg, filteredPosts.length === 0);
  });

  const unusedSkills = allSkillsInExperiences.filter(
    skill => posts.filter(p => p.frontmatter.skills.includes(skill)).length === 0,
  );
  const allUsedSkills = allSkillsInExperiences.filter(
    skill => posts.filter(p => p.frontmatter.skills.includes(skill)).length > 0,
  );

  const results = {
    unusedSkills,
    allUsedSkills,
  };

  console.log(results);
}

main();
