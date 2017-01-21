import React from 'react'
import { Link } from 'react-router'

class About extends React.Component {
	render() {
		return (
			<div>
				<h1>About...</h1>
				<div><Link to={`/about/help`}>Help</Link></div>
				{this.props.children}
			</div>
		)
	}
}

export default About