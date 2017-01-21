import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import {Glyphicon,Button} from 'react-bootstrap'

import {SCTable} from '../table';

import './ProjectList.scss'

class ProjectList extends React.Component{


	constructor(props){
		super(props)
	}

	render(){
		console.log(this)
	return (
	<div className="projectList">
		<SCTable>
			<thead>
				<tr>
					<th colSpan="2">
						<LinkContainer to='/project/new'>
							<Button><Glyphicon glyph="plus" />New</Button>
						</LinkContainer>
						<span className="navbar-right">
						{ this.props.route && (this.props.route.path = "project") ?
							<LinkContainer to='/'>
								<Button><Glyphicon glyph="resize-small" /></Button>
							</LinkContainer>
							:
							<LinkContainer to='/project'>
								<Button><Glyphicon glyph="resize-full" /></Button>
							</LinkContainer>
						}
						</span>
					</th>
				</tr>
				<tr>
					<th>Name</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
			{this.props.projects.map(project =>
				<tr key={project.id} onClick={() => this.props.onProjectClick(project.id)} className="project-item">
					<td><Link to={`/project/`+project.id}activeClassName="active">{project.name}</Link></td>
					<td>{project.description}</td>
				</tr>
			)}
			</tbody>
		</SCTable>
	</div>
	)
	}
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	}).isRequired).isRequired,
	onProjectClick: PropTypes.func.isRequired
}

export default ProjectList