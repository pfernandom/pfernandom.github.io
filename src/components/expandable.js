import React from 'react';
import PropTypes from 'prop-types';
import './expandable.scss';

export default class Expandable extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      expanded: null,
    };
  }

  componentDidUpdate({ expanded: prevExpanded }) {
    const { expanded } = this.props;
    if (expanded !== prevExpanded) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        expanded,
      });
    }
  }

  onToggle(ev) {
    // This is needed because pouter <details> elements were
    // capturing the inner details event
    ev.stopPropagation();
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle.call(this, ev);
    }
    this.setState({
      expanded: ev.target.open,
    });
  }

  toggle() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { expanded: expandedInState } = this.state;
    const {
      title,
      theme,
      expanded: expandedInProps,
      children,
      preview,
      buttonClassName,
    } = this.props;
    const expanded = expandedInState == null ? expandedInProps : expandedInState;
    return (
      <React.Fragment>
        <details open={expanded} onToggle={this.onToggle.bind(this)}>
          <summary
            className={`expandable__title 
            ${theme === 'inline' && 'expandable__title--inline'}
            ${buttonClassName}
            `}
          >
            <h3
              className={`expandable__heading 
            ${theme === 'inline' && 'expandable__heading--inline'}`}
            >
              {title}
            </h3>
          </summary>

          <div
            className={`expandable__content
            ${theme === 'inline' && 'expandable__content--inline'}
            ${expanded ? '' : 'no-print'}`}
            hidden={!expanded}
          >
            {children}
          </div>
        </details>
        {preview && (
          <div className={`expandable__preview ${expanded ? 'no-print' : ''}`} hidden={expanded}>
            {preview.call(this, { toggle: this.toggle.bind(this) })}
          </div>
        )}
      </React.Fragment>
    );
  }
}
Expandable.propTypes = {
  title: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  theme: PropTypes.string,
  buttonClassName: PropTypes.string,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  preview: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Expandable.defaultProps = {
  expanded: false,
  buttonClassName: '',
  theme: '',
  onToggle: () => {},
  preview: () => {},
};
