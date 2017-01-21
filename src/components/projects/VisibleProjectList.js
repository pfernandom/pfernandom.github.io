import { connect } from 'react-redux'
import ProjectList from './ProjectList'

const mapStateToProps = (state) => {
	return {
		projects: Object.values(state.projects)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onProjectClick: (id) => {
			console.log("Clicked on project "+id);
		}
	}
}

const VisibleProjectList = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectList)

export default VisibleProjectList