import React from 'react';
import PropTypes from 'prop-types';
import Expandable from '../expandable';
import Markdown from '../markdown';
import './responsibility.scss';

const Responsibility = ({ isHighlighted, value }) => (
  <li
    className={`resp__content ${
      isHighlighted ? 'resp__content--highlighted' : 'resp__content--dimmed'
    }`}
  >
    {value.summary ? (
      <Expandable
        theme="inline"
        ariaLabel={value.summary}
        expanded={isHighlighted}
        title={
          <Markdown
            className={`resp__summary ${isHighlighted && 'resp__summary--highlighted'}`}
            value={value.summary}
          />
        }
      >
        <Markdown className="resp__collapsible-content" value={value.content} />
      </Expandable>
    ) : (
      <Markdown value={value.content} />
    )}
  </li>
);
Responsibility.propTypes = {
  isHighlighted: PropTypes.bool,
  value: PropTypes.object.isRequired,
};
Responsibility.defaultProps = {
  isHighlighted: false,
};

export default Responsibility;
