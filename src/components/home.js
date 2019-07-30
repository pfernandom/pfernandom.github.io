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
class Home extends React.Component {
  constructor(props) {
    super(props);
    const urlRole =
      typeof window !== `undefined` ? decodeURI(window.location.hash).replace('#', '') : '';
    const highlights =
      this.props.roles.filter(curRole => curRole.title === urlRole).flatMap(r => r.tags) || [];
    this.state = {
      highlights,
      role: urlRole,
    };
  }

  updateSelectedRoles(selectedRole) {
    const role = selectedRole === this.state.role ? '' : selectedRole;
    if (typeof window !== `undefined`) {
      window.history.pushState({}, role, `/#${role}`);
    }
    this.setState({
      role,
    });

    const highlights =
      this.props.roles.filter(curRole => curRole.title === role).flatMap(r => r.tags) || [];
    this.setState({
      highlights,
    });
  }

  updateSelectedTag(tag) {
    this.updateSelectedRoles('');
    const highlights = this.state.highlights;
    const index = highlights.indexOf(tag);
    index >= 0 ? highlights.splice(index, 1) : highlights.push(tag);
    this.setState({
      highlights,
    });
  }

  isRoleSelected(role) {
    return this.state.role === role ? true : false;
  }

  isTagSelected(tag) {
    return this.state.highlights.includes(tag);
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
    } = this.props;
    const { highlights = [] } = this.state;
    let tags = roles.reduce((acc, cur) => {
      acc.push(...cur.tags);
      return acc;
    }, []);
    tags = Array.from(new Set(tags));
    return (
      <div className="summary" id="top">
        <ContactCard
          role={this.state.role || role}
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
              roles.map(role => (
                <Tag
                  key={role.title}
                  value={role.title}
                  isSelected={this.isRoleSelected(role.title)}
                  toggle={this.updateSelectedRoles.bind(this, role.title)}
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
              tags.map((tag, i) => (
                <Tag
                  key={`${tag}`}
                  value={tag}
                  isSelected={this.isTagSelected(tag)}
                  toggle={this.updateSelectedTag.bind(this)}
                />
              ))
            )}
          </div>
          <div className="only-print tags-collection--print" aria-hidden="true">
            {tags.filter(tag => this.isTagSelected(tag)).join(', ')}
          </div>
          <hr />
        </section>
        <ExperienceList data={this.props.experience} highlights={highlights} />
      </div>
    );
  }
}

export default Home;
