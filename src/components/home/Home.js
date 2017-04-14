import React from 'react'
import ContactCard from '../contact'
import Experience from './Experience'
import Tag from './Tag'



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
			<div>
				<ContactCard {...this.props.id}/>
				<h3>Roles</h3>
				{
					roles.map(role =>
						<Tag key={role} value={role} isSelected={this.isRoleSelected(role)} toggle={this.updateSelectedRoles.bind(this)}></Tag>
					)
				}
				<h3>Skills</h3>
				<div className="animated fadeIn">
					{tags.map(tag =>
						<Tag key={tag} value={tag} isSelected={this.isTagSelected(tag)} toggle={this.updateSelectedTag.bind(this)}></Tag>
					)}
				</div>
				<hr/>
				<Experience data={this.props.experience} highlight={this.state.highlights}/>
			</div>
		)
	}
}

export default Home;