import React from 'react'
import styles from './expandable.module.scss'
import { FaPlus, FaMinus } from 'react-icons/fa'

class Expandable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  toggle() {
    const expanded = !this.state.expanded
    this.setState({ expanded })
  }
  render() {
    const expanded = this.state.expanded || this.props.expanded;
    const { title, ariaLabel } = this.props
    console.log({expanded})
    return (
      <React.Fragment>
        <h3 className={styles.heading}>
          <button
            aria-expanded={expanded}
            aria-label={ariaLabel || title}
            className={styles.headingButton}
            onClick={this.toggle.bind(this)}
          >
            {title}

            {expanded ? 
              <FaMinus className={`${styles.icon} no-print`} /> :
              <FaPlus  className={`${styles.icon} no-print`} />
            }
          </button>
        </h3>
        <div className={`${styles.content} ${expanded ? 'no-print' : ''}`} hidden={expanded}>{this.props.preview.call(this, {toggle:this.toggle.bind(this)})}</div>
        <div className={`${styles.content} ${expanded ? '' : 'no-print'}`} hidden={!expanded}>{this.props.children}</div>
      </React.Fragment>
    )
  }
}


class InlineExpandable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { }
  }
  toggle() {
    const expanded = !this.state.expanded
    this.setState({ expanded })
  }
  render() {
    const expanded = this.state.expanded || this.props.expanded;
    const { title, ariaLabel } = this.props;
    return (
      <React.Fragment>
        <button
          aria-expanded={expanded}
          aria-label={ariaLabel || title}
          className={`${styles.inlineHeadingButton} ${this.props.buttonClassName}`}
          onClick={this.toggle.bind(this)}
        >
          {title}

          {expanded ? 
            <FaMinus className={`${styles.icon} no-print`} /> :
            <FaPlus  className={`${styles.icon} no-print`} />
          }
        </button>
        <div className={styles.content} hidden={!expanded}>{this.props.children}</div>
      </React.Fragment>
    )
  }
}
export { Expandable, InlineExpandable }
