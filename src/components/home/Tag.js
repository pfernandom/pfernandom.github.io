/**
 * Created by pedro.f.marquez.soto on 4/13/2017.
 */
import React from 'react'

const Tag = (props)=>{
	let classes = props.isSelected? "tag selected" : "tag";
	let toggle = ()=>{
		props.toggle(props.value)

	}
	return (
		<span className={classes} onClick={toggle.bind(this)}>
			{props.value}
		</span>
	)
}

export default Tag;