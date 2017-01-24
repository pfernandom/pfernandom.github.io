import React from 'react'
import {  Link } from 'react-router'
import './Tag.scss'

class Tag extends React.Component {
	render() {
		return (
			<Link className={'tag btn btn-default'} to={'/tags/'+this.props.value}>{this.props.children}</Link>
		)
	}
}


export default Tag