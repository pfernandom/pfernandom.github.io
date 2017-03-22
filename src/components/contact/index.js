import React from 'react'
import './ContactCard.scss'

class ContactCard extends React.Component {
	render() {
		return (
			<div className="contact-card">
				<h1>Pedro Marquez</h1>
				<h2>Full-stack Software Developer</h2>
				
				<p>
					Full Stack developer, Java Architect and Certified Ethical Hacker. 
				</p>
				<ul>
					<li>5+ years of experience in Java technologies (back-end).</li>
					<li>7+ years of experience in front-end technologies (JavaScript, CSS, HTML).</li>
					<li>2 years of experience in Application Security and Penetration Testing.</li>
					<li>Scrum Master trained.</li>
					<li>Six Sigma Green Belt trained.</li>
				</ul>

			</div>
		)
	}
}

export default ContactCard