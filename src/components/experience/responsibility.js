import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Expandable from '../expandable';
import Markdown from '../markdown';
import './responsibility.scss';

const Responsibility = ({ isHighlighted, value, canExclude }) => {
  const [canPrint, setCanPrint] = useState(true);

  function onTogglePrint(ev) {
    setCanPrint(ev.target && ev.target.checked);
  }

  return (
    <li
      className={`resp__content ${
        isHighlighted ? 'resp__content--highlighted' : 'resp__content--dimmed'
      } ${canExclude && 'resp__content--can-exclude'} ${!canPrint && 'no-print'}`}
    >
      {canExclude && (
        <input
          className="resp__content_print_check"
          checked={canPrint}
          type="checkbox"
          onChange={onTogglePrint}
        />
      )}
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
};
Responsibility.propTypes = {
  isHighlighted: PropTypes.bool,
  value: PropTypes.object.isRequired,
};
Responsibility.defaultProps = {
  isHighlighted: false,
};

export default Responsibility;
