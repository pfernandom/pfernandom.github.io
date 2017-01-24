import React from 'react'
import {Dashboard} from '../layout'
import ContactCard from '../contact'
import {Tag, AddTag} from '../tags'
import { connect } from 'react-redux'


class Home extends React.Component {
	render() {
		return (
			<div>
				<ContactCard/>
				<h3>Skills</h3>
				<div className="animated fadeIn">
					{this.props.tags.map(tag =>
					<Tag key={tag.value} value={tag.value}>{tag.label}</Tag>
					)}
				</div>
				{this.props.location.query.edit ?
					<div>Edit mode
						<AddTag></AddTag>
					</div>

					: null}

				{this.props.children}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tags: state.tags
	}
}

Home = connect(
	mapStateToProps
)(Home)


export default Home;