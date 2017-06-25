import React from 'react'
import ContactCard from '../contact'
import Experience from './Experience'
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import Tag from './Tag'

const getTooltip = (text)=>(<Tooltip id="tooltip">{text}</Tooltip>)

const Instruction = (props) => (
	<OverlayTrigger placement="right" overlay={getTooltip(props.text)}>
		<span className="instructions pulse">&#8984;</span>
	</OverlayTrigger>
)

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state={
			highlights:[],
			role:""
		}
	}
	updateSelectedRoles(role){
		let r = role === this.state.role? "":role;
		this.setState({
			role:r
		})

		let h = this.props.roles[r] || [];
		this.setState({
			highlights:h
		})
	}
	updateSelectedTag(tag){
		this.updateSelectedRoles("")
		let tags = this.state.highlights;
		let index = tags.indexOf(tag);
		index >= 0 ? tags.splice(index, 1):tags.push(tag);

		this.setState({
			highlights:tags
		})
	}
	isRoleSelected(role) {
		return this.state.role===role? true:false;
	}
	isTagSelected(tag) {
		return this.state.highlights.indexOf(tag) >= 0? true:false;
	}
	render() {
		let tags = this.props.skills;
		let roles = Object.keys(this.props.roles);
		return (
			<div className="summary">
				<ContactCard {...this.props.id}/>
				<section>
					<h3>Roles</h3>
					<Instruction text="Select a role to filter the experience related to it"/>
					<div className="roles">
					{
						roles.map(role =>
							<Tag key={role} value={role} isSelected={this.isRoleSelected(role)} toggle={this.updateSelectedRoles.bind(this)}></Tag>
						)
					}
					</div>
				</section>
				<section>
					<h3>Skills</h3>
					<Instruction text="Select one or more skills to filter the experience by them"/>
					<div>
						{tags.map(tag =>
							<Tag key={tag} value={tag} isSelected={this.isTagSelected(tag)} toggle={this.updateSelectedTag.bind(this)}></Tag>
						)}
					</div>
					<hr/>
				</section>
				<Experience data={this.props.experience} highlight={this.state.highlights}/>
			</div>
		)
	}
}

export default Home;