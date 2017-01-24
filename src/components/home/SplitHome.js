import React from 'react'
import {SplitScreen} from '../layout'
import ContactCard from '../contact'
import {Tag, AddTag} from '../tags'
import { connect } from 'react-redux'

import './SplitHome.scss'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SplitHome extends React.Component {
	render() {
		return (
			<SplitScreen
				leftColSize={8}
				left={
					<div>
						<ContactCard/>
						<h3>Skills</h3>
						<div className="animated fadeIn">
							{this.props.tags.map(tag =>
								<Tag key={tag.value} value={tag.value}>{tag.label}</Tag>
							)}
						</div>
					</div>
				}
				rightColSize={4}
				right={
					<div>
						{this.props.location.query.edit ?
							<div>Edit mode
								<AddTag></AddTag>
							</div>

							: null}

						{this.props.children}
					</div>
				}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tags: state.tags
	}
}

SplitHome = connect(
	mapStateToProps
)(SplitHome)


export default SplitHome;