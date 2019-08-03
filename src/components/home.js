import React from 'react';
import ContactCard from './contact-card';
import { ExperienceList } from './experience';
import Tag from './tag';
import Tooltip from './tooltip';

const Instruction = ({ text }) => (
  <Tooltip className="instructions pulse" hoverText={text}>
    &#8984;
  </Tooltip>
);

const Skill = ({ tag, isSelected, onToggleSkill }) => {
  function updateSelectedTag() {
    onToggleSkill(tag);
  }

  return <Tag key={`${tag}`} value={tag} isSelected={isSelected} toggle={updateSelectedTag} />;
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    const { roles } = props;
    const urlRole =
      typeof window !== `undefined` ? decodeURI(window.location.hash).replace('#', '') : '';
    const highlights =
      roles.filter(curRole => curRole.title === urlRole).flatMap(r => r.tags) || [];
    this.state = {
      highlights,
      role: urlRole,
    };

    this._onToggleSkill = this.onToggleSkill.bind(this);
  }

  onToggleSkill(tag) {
    this.updateSelectedRoles('');
    const { highlights } = this.state;
    const index = highlights.indexOf(tag);
    if (index >= 0) {
      highlights.splice(index, 1);
    } else {
      highlights.push(tag);
    }
    this.setState({
      highlights,
    });
  }

  updateSelectedRoles(selectedRole) {
    const { role: stateRole } = this.state;
    const { roles } = this.props;
    const role = selectedRole === stateRole ? '' : selectedRole;
    if (typeof window !== `undefined`) {
      window.history.pushState({}, role, `/#${role}`);
    }
    this.setState({
      role,
    });

    const highlights = roles.filter(curRole => curRole.title === role).flatMap(r => r.tags) || [];
    this.setState({
      highlights,
    });
  }

  isRoleSelected(selectedRole) {
    const { role } = this.state;
    return selectedRole === role;
  }

  isTagSelected(tag) {
    const { highlights } = this.state;
    return highlights.includes(tag);
  }

  clearTags() {
    this.updateSelectedRoles('');
    this.setState({
      highlights: [],
    });
  }

  render() {
    const {
      identification: { role, name, summary, contact = [], highlights: idHighlights },
      roles = [],
      experience,
    } = this.props;
    const { highlights = [], role: stateRole } = this.state;
    let tags = roles.reduce((acc, cur) => {
      acc.push(...cur.tags);
      return acc;
    }, []);
    tags = Array.from(new Set(tags));
    return (
      <div className="summary" id="top">
        <ContactCard
          role={stateRole || role}
          name={name}
          summary={summary}
          contact={contact}
          highlights={idHighlights}
        />

        <section aria-labelledby="roles-heading" className="no-print">
          <h3 id="roles-heading">Roles</h3>
          <Instruction text="Select a role to filter the experience related to it" />
          <div className="roles tags-collection">
            {roles.length <= 0 ? (
              <span>Loading roles...</span>
            ) : (
              roles.map(curRole => (
                <Tag
                  key={curRole.title}
                  value={curRole.title}
                  isSelected={this.isRoleSelected(curRole.title)}
                  // eslint-disable-next-line react/jsx-no-bind
                  toggle={this.updateSelectedRoles.bind(this, curRole.title)}
                />
              ))
            )}
          </div>
        </section>
        <section
          aria-labelledby="skills-heading"
          className={highlights.length <= 0 ? 'no-print' : null}
        >
          <h3 id="skills-heading">Skills</h3>
          <Instruction text="Select one or more skills to filter the experience by them" />
          {highlights.length > 0 ? (
            <button className="no-print clear" onClick={this.clearTags.bind(this)}>
              Clear skills
            </button>
          ) : null}
          <div className="tags-collection no-print">
            {tags.length <= 0 ? (
              <span>Loading skills...</span>
            ) : (
              tags.map(tag => (
                <Skill
                  key={tag}
                  tag={tag}
                  isSelected={this.isTagSelected(tag)}
                  onToggleSkill={this._onToggleSkill}
                />
              ))
            )}
          </div>
          <div className="only-print tags-collection--print" aria-hidden="true">
            {tags.filter(tag => this.isTagSelected(tag)).join(', ')}
          </div>
          <hr />
        </section>
        <ExperienceList data={experience} highlights={highlights} />
      </div>
    );
  }
}

export default Home;
