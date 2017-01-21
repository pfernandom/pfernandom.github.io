import React from 'react'
import {Dashboard} from '../layout'
import {VisibleProjectList, ProjectDetail, NewProject} from '../projects'

import App from '../App'

class Home extends React.Component {
	render() {
		return (
			<Dashboard
			 topLeft={<App/>}
			 topRight={<VisibleProjectList/>}
			 bottomLeft={<div/>}
			 bottomRight={<div/>}/>
		)
	}
}

export default Home