import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import './ProjectList.scss'

let ProjectDetail= (props) => (
	<div>
			<h2>{props.params.projectId}</h2>
			Name:{props.project.name}
	</div>
)

const mapStateToProps = (state, ownProps) => {

	return {
		project: state.projects[ownProps.params.projectId]
	}
}

ProjectDetail = connect(
	mapStateToProps
)(ProjectDetail)

export default ProjectDetail