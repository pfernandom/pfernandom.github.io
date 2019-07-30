import React from 'react';
import PropTypes from 'prop-types';
import Expandable from '../expandable';
import Markdown from '../markdown';
import Tooltip from '../tooltip';
import Tag from '../tag';
import Responsibility from './responsibility';
import './experience.scss';

const COLLAPSED_DESCRIPTION_LENGTH = 350;

const ExpandableTitle = ({ experience: e }) => {
  const options = { year: 'numeric', month: 'short' };
  const startDate = e.startDate ? e.startDate.toLocaleDateString('en-US', options) : 'Today';
  const endDate = e.endDate ? e.endDate.toLocaleDateString('en-US', options) : 'Today';
  return (
    <span className="collapsible-heading">
      <div className="collapsible-heading__title">
        <div className="collapsible-heading__role">{e.role}</div>
        {e.startDate && (
          <div className="collapsible-heading__date">
            {startDate} to {endDate}
          </div>
        )}
      </div>
      <div className="collapsible-heading__project">{e.project}</div>
    </span>
  );
};
ExpandableTitle.propTypes = {
  experience: PropTypes.object.isRequired,
};

const ExperiencePreview = ({ toggle, isVisible, description }) => (
  <React.Fragment>
    {!isVisible && (
      <span className="instructions">The selected skills were not used in this project</span>
    )}
    <Markdown className="experience--description__collapsed">{description}</Markdown>
    <Tag toggle={toggle} className="experience--expand-message no-print">
      Expand to see more details...
    </Tag>
  </React.Fragment>
);
ExperiencePreview.propTypes = {
  toggle: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  description: PropTypes.string.isRequired,
};

ExperiencePreview.defaultProps = {
  isVisible: true,
};

const NoPrintCheck = ({ toggleSkipProject }) => (
  <div className="experience--no-print-check no-print">
    <label htmlFor="chk1-label">
      <input type="checkbox" onChange={toggleSkipProject} id="chk1-label" />
      <Tooltip
        className="instructions experience--tooltip"
        hoverText="Check this box if
        you don't want to include this project in the printable version of this page"
      >
        Don&apos;t print this project
      </Tooltip>
    </label>
  </div>
);

export default class ExperienceElement extends React.Component {
  constructor(props) {
    super(props);
    const { experience, shouldPrint } = this.props;
    this.state = { experience, shouldPrint };

    this._toggleSkipProject = this.toggleSkipProject.bind(this);
    this._isHighlighted = this.isHighlighted.bind(this);
  }

  toggleSkipProject() {
    const { shouldPrint } = this.state;
    this.setState({ shouldPrint: !shouldPrint });
  }

  hasHighlights() {
    const { highlights } = this.props;
    return highlights.length > 0;;
  }

  isHighlighted(responsibilities) {
    const { highlights } = this.props;
    return responsibilities.some(v => highlights.includes(v));
  }

  isVisible(responsibilities) {
    const { highlights } = this.props;
    if (highlights.length === 0) {
      return true;
    }
    return responsibilities.some(v => highlights.includes(v));
  }

  renderDescriptionPreview(description) {
    return `${description.substring(0, COLLAPSED_DESCRIPTION_LENGTH)}${
      description.length <= COLLAPSED_DESCRIPTION_LENGTH ? '' : '...'
    }`;
  }

  render() {
    const { experience, shouldPrint } = this.state;
    const { isExpanded } = this.props;
    return (
      <div
        className={`experience__project ${this.isVisible(experience.tags) ? '' : ' disabled'} ${
          shouldPrint ? '' : 'no-print'
        }`}
      >
        <Expandable
          title={<ExpandableTitle experience={experience} />}
          preview={context => (
            <ExperiencePreview
              toggle={context.toggle}
              isVisible={this.isVisible(experience.tags)}
              description={this.renderDescriptionPreview(experience.description)}
            />
          )}
          ariaLabel={`Project: ${experience.project}`}
          expanded={isExpanded || (this.hasHighlights() && this.isVisible(experience.tags))}
        >
          {!this.isVisible(experience.tags) && (
            <span className="instructions">The selected skills were not used in this project</span>
          )}
          <Markdown className="experience--description">{experience.description}</Markdown>
          <NoPrintCheck toggleSkipProject={this._toggleSkipProject} />
          <ul className={`responsibilities ${!this.isVisible(experience.tags) && 'hidden'}`}>
            {experience.responsibilities &&
              experience.responsibilities.map(r => (
                <Responsibility
                  key={`${r.content}`}
                  value={r}
                  isHighlighted={this._isHighlighted(r.categories)}
                />
              ))}
          </ul>
        </Expandable>
      </div>
    );
  }
}

ExperienceElement.propTypes = {
  experience: PropTypes.object.isRequired,
  shouldPrint: PropTypes.bool,
  isExpanded: PropTypes.bool,
  highlights: PropTypes.arrayOf(PropTypes.string),
};

ExperienceElement.defaultProps = {
  shouldPrint: true,
  isExpanded: false,
  highlights: [],
};
