/**
 * Created by pedro.f.marquez.soto on 4/13/2017.
 */
import React from 'react'
import styles from './tag.module.scss'

const Tag = (props)=>{
	let classes = props.isSelected ? `${styles.tag} ${styles.selected}` : `${styles.tag} no-print`;
	let toggle = ()=>{
		props.toggle(props.value)

	}
	return (
		<button className={classes} onClick={toggle.bind(this)}>
			{props.value}
		</button>
	)
}

export default Tag;