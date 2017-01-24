import React from 'react'
import { connect } from 'react-redux'
import './TagDetail.scss'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SimpleTagDetail extends React.Component {
	render() {
		var description = "";
		var name = "";
		var tagValue = this.props.params.tag;
		this.props.tags.forEach(function(tag) {
			if(tag.value === tagValue){
				description = tag.description
				name = tag.label;
			}
		});
		return (
			<div className="tag-description animated slideInRight">
				<h3>Skill: {name}</h3>
				<p>{description}</p>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tags: state.tags
	}
}

const TagDetail = connect(
	mapStateToProps
)(SimpleTagDetail)

export default TagDetail