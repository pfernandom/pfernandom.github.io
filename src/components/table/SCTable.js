import React, { PropTypes } from 'react'

import './Table.scss'

class SCTable extends React.Component {
	componentDidMount(){
		console.log("yes");
	}
	render(){
	return (
		<table className="scTable">
			{this.props.children}
		</table>
		)
	}
}

export default SCTable