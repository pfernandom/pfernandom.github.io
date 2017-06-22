/**
 * Created by pedro.f.marquez.soto on 4/13/2017.
 */
import React from 'react'
import {Accordion, Panel} from 'react-bootstrap'
import './experience.scss';

class Experience extends React.Component{
	isVisible(reponsabilities){
		if(this.props.highlight.length == 0){
			return true;
		}
		return reponsabilities.some((v) => this.props.highlight.indexOf(v) >= 0 );
	}
	isHighlighted(reponsabilities){
		return reponsabilities.some((v) => this.props.highlight.indexOf(v) >= 0 );
	}
	render(){
		return (
			<div className="animated fadeIn">
				<h3>Professional Experience</h3>
				{this.props.data.map(e =>
					<div className={"project"+(this.isVisible( e.tags )?'':' disabled')} key={e.project}>
						<h4>{e.project}</h4>
						{ !this.isVisible( e.tags ) ? (<span className="instructions">The selected skills were not used in this project</span>): null }
						<h5 className="role">{e.role}</h5>
						<span className="start-date">{e.startDate}</span> until <span className="start-date">{e.endDate}</span>

						<p>{e.description}</p>
						<ul className={"responsabilities"+(this.isVisible( e.tags )?'':' hidden')}>
							{e.responsabilities.map(r =>
								<li className={this.isHighlighted(r.categories)? 'highlighted' :''} key={r.content}>{r.content}</li>)
							}
						</ul>
					</div>
				)}

			</div>
		);
	}
}

Experience.propTypes = {
	highlight: React.PropTypes.array
}

export default Experience;