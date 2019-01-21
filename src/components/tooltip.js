import React from 'react'
import styles from './tooltip.module.scss'

export default (props) => (
    <div className={`${styles.tooltip} ${props.className}`}>
        {props.children}
        <span className={styles.tooltiptext}>
            {props.hoverText}
        </span>
    </div>
)