/**
 * Created by pedro.f.marquez.soto on 4/13/2017.
 */
import React from 'react'
import Expandable from './expandable'
import './experience.scss'

class Experience extends React.Component{
  constructor(props) {
    super(props);
    this.state = { areExpanded: true }
  }
  toggleExperiences() {
    let { areExpanded } = this.state;
    areExpanded = !areExpanded;
    this.setState({ areExpanded })
  }
	isVisible(reponsabilities){
		if(this.props.highlight.length === 0){
			return true;
		}
    return reponsabilities.some((v) => this.props.highlight.includes(v));
	}
	isHighlighted(reponsabilities){
    return reponsabilities.some((v) => this.props.highlight.includes(v));
	}
	render(){
    const { data = [] }  = this.props;
    const { areExpanded } = this.state;
		return <section aria-labelledby="experience-heading">
        <h3 id="experience-heading">Professional Experience</h3>
        {data.map((e, i) => (
          <div
            className={
              'project' + (this.isVisible(e.tags) ? '' : ' disabled')
            }
            key={`${e.project}-${i}`}
          >
            <Expandable
              title={
                <span>
                  <span>{e.project},{' '}</span>
                  <span className="experience-heading-date">
                    {e.startDate} to {e.endDate}
                  </span>
                </span>
              }
              ariaLabel={`Project: ${e.project}`}
              expanded={areExpanded}
            >
              {!this.isVisible(e.tags) ? (
                <span className="instructions">
                  The selected skills were not used in this project
                </span>
              ) : (
                ''
              )}
              <span className="role">Role: {e.role}</span>
              <p>{ e.description}</p>
              <ul
                className={
                  'responsabilities' +
                  (this.isVisible(e.tags) ? '' : ' hidden')
                }
              >
                {e.responsabilities
                  ? e.responsabilities.map((r, i) => (
                      <li
                        className={
                          this.isHighlighted(r.categories)
                            ? 'highlighted'
                            : ''
                        }
                        key={`${r.content}-${i}`}
                      >
                      {r.summary? (
                        <React.Fragment>
                          <div>{r.summary}</div>
                          <ul><li>{r.content}</li></ul>
                        </React.Fragment>
                      ) : (
                        <span>{r.content}</span>
                      )}
                      </li>
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