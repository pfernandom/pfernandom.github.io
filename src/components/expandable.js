import React from 'react'
import styles from './expandable.module.scss'
import { FaPlus, FaMinus } from 'react-icons/fa'

class Expandable extends React.Component {
  constructor(props) {
    super(props)
    const { expanded = false } = props
    this.state = { expanded }
  }
  toggle() {
    const expanded = !this.state.expanded
    this.setState({ expanded })
  }
  render() {
    const { expanded } = this.state
    const { title, ariaLabel } = this.props
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

            {expanded ? <FaMinus /> : <FaPlus />}
          </button>
        </h3>
        <div className={styles.content} hidden={!expanded}>{this.props.children}</div>
      </React.Fragment>
    )
  }
}

export default Expandable
