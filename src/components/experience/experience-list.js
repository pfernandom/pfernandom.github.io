/* eslint-disable prettier/prettier */
/**
 * Created by pedro.f.marquez.soto on 4/13/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../tag';
import ExperienceElement from './experience-element';

export default class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areExpanded: false,
      data: props.data,
    };
    this._toggleExperiences = this.toggleExperiences.bind(this);
  }

  toggleExperiences() {
    let { areExpanded } = this.state;
    areExpanded = !areExpanded;
    this.setState({ areExpanded });
  }

  render() {
    const { data = [], areExpanded } = this.state;
    const { highlights } = this.props;
    return (
      <section aria-labelledby="experience-heading">
        <h3 id="experience-heading">Professional Experience</h3>
        <Tag className="no-print" toggle={this._toggleExperiences}>
          Expand all
        </Tag>
        {data.map(e => (
          <ExperienceElement
            key={`${e.id}`}
            experience={e}
            shouldPrint={e.print}
            isExpanded={areExpanded}
            highlights={highlights}
          />
        ))}
      </section>
    );
  }
}
Experience.propTypes = {
  data: PropTypes.array.isRequired,
  highlights: PropTypes.array.isRequired,
};
