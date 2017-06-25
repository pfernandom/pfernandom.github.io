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
		<button className={classes} onClick={toggle.bind(this)}>
			{props.value}
		</button>
	)
}

export default Tag;