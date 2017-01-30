import React from 'react'
import { connect } from 'react-redux'
import {  Link } from 'react-router'
import Tag from './Tag'
import './TagDetail.scss'
import { List } from 'immutable';


class SimpleTagDetail extends React.Component {
	render() {
		var allTags = List(this.props.tags);
		var tagValue = this.props.params.tag;

		var [tag] = allTags.filter(t => t.value === tagValue);

		if(tag){
			var related = allTags.filter(t => tag.related.indexOf(t.value) >= 0).toArray();
			return (
				<div className="tag-description animated slideInRight">
					<h3>Skill: {tag.label}</h3>
					<button className="close-detail">
						<Link to={'/'}>
							<span className="glyphicon glyphicon-remove"></span>
						</Link>
					</button>
					<p>{tag.description}</p>
					<ul>
						{tag.highlights.map(highlight =>
							<li key={highlight}>{highlight}</li>
						)}
					</ul>
					{related.length > 0? related.map(t =>
						<Tag key={t.value} value={t.value}>{t.label}</Tag>
					):null}
				</div>
			)
		}
		else{
			return(
			<div>
				<h3>Not found</h3>
			</div>
			)
		}
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