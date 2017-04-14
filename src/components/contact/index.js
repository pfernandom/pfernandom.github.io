import React from 'react'
import './ContactCard.scss'

class ContactCard extends React.Component {
	render() {
		return (
			<div className="contact-card">
				<h1>{this.props.name}</h1>
				<h2>{this.props.role}</h2>
				
				<p>
					{this.props.summary}
				</p>
				<ul>
					{this.props.highlights.map(h =>
						<li key={h}>{h}</li>
					)}
				</ul>
			</div>
		)
	}
}

ContactCard.propTypes = {
	name: React.PropTypes.string.isRequired,
	role: React.PropTypes.string.isRequired,
	summary: React.PropTypes.string.isRequired,
	highlights: React.PropTypes.array.isRequired
}

export default ContactCard