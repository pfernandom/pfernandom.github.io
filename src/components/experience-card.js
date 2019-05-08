/**
 * Created by pedro.f.marquez.soto on 4/13/2017.
 */
import React from 'react'
import { Expandable, InlineExpandable } from './expandable'
import Markdown from './markdown';
import Tag from './tag';
import Tooltip from './tooltip'
import './experience.scss'

const ExpandableTitle = ({experience : e}) => {
  console.log({e})
  const options = { year: 'numeric', month: 'short'};
  const startDate = e.startDate ? e.startDate.toLocaleDateString("en-US", options) : 'Today';
  const endDate = e.endDate ? e.endDate.toLocaleDateString("en-US", options) : 'Today';
  return (<span className="collapsible-heading">
    <div className="collapsible-heading__title">
      <div className="collapsible-heading__role">{e.role}</div>
      { e.startDate &&
        <div className="collapsible-heading__date">
        {startDate} to {endDate}
      </div>
      }
      
    </div>
    
    <div className="collapsible-heading__project">
      {e.project}
    </div>
  </span>
)
}

const Responsibility = ({isHighlighted, value}) => (
  <li
    className={
      isHighlighted(value.categories)
        ? 'experience--content highlighted'
        : 'experience--content'
    }
  >
  {value.summary? (
    <React.Fragment>
      <InlineExpandable
        buttonClassName="experience--collapsible"
        ariaLabel={value.summary}
        title={
          <Markdown className="experience--summary" value={value.summary}/>
        }
      >
        <Markdown className="experience--collapsible-content" value={value.content}/>
      </InlineExpandable>
    </React.Fragment>
  ) : (
    <Markdown value={value.content}/>
  )}
  </li>
)

const COLLAPSED_DESCRIPTION_LENGTH = 350;
class Experience extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      areExpanded: false,
      data: props.data,
    }
  }
  toggleSkipProject(val, i) {
    this.state.data[i].print = !this.state.data[i].print;
    this.setState({
      data: this.state.data,
    });
  }
  toggleExperiences() {
    let { areExpanded } = this.state;
    areExpanded = !areExpanded;
    this.setState({ areExpanded })
  }
  hasHighlights() {
    return this.props.highlight.length > 0
  }
	isVisible(responsibilities){
		if(this.props.highlight.length === 0){
			return true;
		}
    return responsibilities.some((v) => this.props.highlight.includes(v));
	}
	isHighlighted(responsibilities){
    return responsibilities.some((v) => this.props.highlight.includes(v));
	}
	render(){
    const { data=[], areExpanded } = this.state;

		return <section aria-labelledby="experience-heading">
        <h3 id="experience-heading">Professional Experience</h3>
        <Tag className="no-print" toggle={this.toggleExperiences.bind(this)}>Expand all</Tag>
        {data.map((e, i) => (
          <div
            className={
              `project ${(this.isVisible(e.tags) ? '' : ' disabled')} ${e.print? '': 'no-print'}`
            }
            key={`${e.project}-${i}`}
          >
            <Expandable
              title={
                <ExpandableTitle experience={e}/>
              }
              preview={ context => (
                <React.Fragment>
                  {!this.isVisible(e.tags) ? (
                    <span className="instructions">
                      The selected skills were not used in this project
                    </span>
                  ) : (
                    ''
                  )}
                  <Markdown className="experience--description__collapsed">
                    {`${e.description.substring(0, COLLAPSED_DESCRIPTION_LENGTH)}${e.description.length <= COLLAPSED_DESCRIPTION_LENGTH ? '' : '...'}`} 
                  </Markdown>
                  <Tag toggle={context.toggle} className="experience--expand-message no-print">
                    Expand to see more details...
                  </Tag>
                </React.Fragment>
                )
              }
              ariaLabel={`Project: ${e.project}`}
              expanded={ areExpanded ||  (this.hasHighlights() && this.isVisible(e.tags)) }
            >
              {!this.isVisible(e.tags) ? (
                <span className="instructions">
                  The selected skills were not used in this project
                </span>
              ) : (
                ''
              )}
              <Markdown className="experience--description">
                {e.description}
              </Markdown>
              <div className="experience--no-print-check no-print">
                <input type="checkbox" onChange={this.toggleSkipProject.bind(this, e, i)} id="chk1-label"/>
                <label htmlFor="chk1-label">
                  <Tooltip className="instructions" hoverText="Check this box if you don't want to include this project in the printable version of this page">
                    Don't print this project
                  </Tooltip>
                </label>
              </div>
              <ul
                className={
                  'responsibilities' +
                  (this.isVisible(e.tags) ? '' : ' hidden')
                }
              >
                {e.responsibilities
                  ? e.responsibilities.map((r, i) => (
                      <Responsibility
                        key={`${r.content}-${i}`}
                        value={r}
                        isHighlighted={this.isHighlighted.bind(this)}
                      />
                    ))
                  : ''}
              </ul>
            </Expandable>
          </div>
        ))}
      </section>
	}
}


export default Experience;