import React from 'react'
import ContactCard from './contact-card'
import Experience from './experience-card'
import Tag from './tag'
import Tooltip from './tooltip'

const Instruction = props => (
  <Tooltip className="instructions pulse" hoverText={props.text}>
    &#8984;
  </Tooltip>
)
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highlights: [],
      role: '',
    }
  }
  updateSelectedRoles(selectedRole) {
    let role = selectedRole === this.state.role ? '' : selectedRole
    this.setState({
      role,
    })

    let highlights = this.props.roles
        .filter(curRole => curRole.title === role)
        .flatMap(r => r.tags) || [];
    this.setState({
      highlights,
    })
  }
  updateSelectedTag(tag) {
    this.updateSelectedRoles('')
    let highlights = this.state.highlights
    let index = highlights.indexOf(tag)
    index >= 0 ? highlights.splice(index, 1) : highlights.push(tag)
    this.setState({
      highlights,
    })
  }
  isRoleSelected(role) {
    return this.state.role === role ? true : false
  }
  isTagSelected(tag) {
    return this.state.highlights.includes(tag);
  }
  clearTags() {
    this.updateSelectedRoles("");
    this.setState({
      highlights: [],
    })
  }
  render() {
    let roles = this.props.roles || []
    let tags = roles.reduce((acc, cur) => {
      acc.push(...cur.tags)
      return acc
    }, [])
    tags = Array.from(new Set(tags))

    let highlights = this.state.highlights || []
    return <div className="summary" id="top">
        <ContactCard subRole={this.state.role} {...this.props.identification} />

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
                  toggle={this.updateSelectedRoles.bind(this)}
                />
              ))
            )}
          </div>
        </section>
        <section aria-labelledby="skills-heading" className={highlights.length <= 0 ? "no-print" : null}>
          <h3 id="skills-heading">Skills</h3>
          <Instruction text="Select one or more skills to filter the experience by them" />
          {highlights.length > 0 ? <button className="no-print clear" onClick={this.clearTags.bind(this)}>
              Clear skills
            </button> : null}
          <div className="tags-collection">
            {tags.length <= 0 ? (
              <span>Loading skills...</span>
            ) : (
              tags.map((tag, i) => (
                <Tag
                  key={`${tag}-${i}`}
                  value={tag}
                  isSelected={this.isTagSelected(tag)}
                  toggle={this.updateSelectedTag.bind(this)}
                />
              ))
            )}
          </div>
          <hr />
        </section>
        <Experience data={this.props.experience} highlight={highlights} />
      </div>;
  }
}

export default Home
