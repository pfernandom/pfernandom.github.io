import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute  } from 'react-router'
import axios from 'axios'

import NotFound from './components/error'
import { Home } from './components/home'

import { Grid } from 'react-bootstrap';
import 'animate.css'
import './style.scss';


import sw from "file?name=offline.js!babel!./workers/offline";

if ("serviceWorker" in navigator) {
	// Service worker registered
	navigator.serviceWorker.register(sw).catch(err => {
		console.error("Could not register service worker",err)
	});
} else {
	console.error("Service workers are not supported")
}

//'json/data.json'
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tags:[],
			id: {
				name:'',
				role:'',
				summary:'',
				highlights:[]
			},
			experience: [],
			roles:{},
			skills:[]
		};
	}
	componentDidMount(){
		axios.get('json/professionalExperience.json').then(data=>{
			let experience = data.data.experience;

			experience = experience.map(project => {
				let categories = project.responsabilities.map(r=> r.categories );
				project.tags = categories.reduce((ac, e)=> ac.concat(e),[]);
				return project;
			});

			let tags = experience.reduce((ac, e)=> ac.concat(e.tags),[]);
			tags = tags.filter((t,pos) => tags.indexOf(t) == pos ).sort()

			this.setState({
				id:data.data.id,
				experience:experience,
				roles:data.data.roles,
				skills: tags
			})
		});
	}
	render() {
		return (
			<Grid>
				<Home {...this.state}/>
			</Grid>
		)
	}
}

render((
	<Router history = {hashHistory}>
		<Route path = "/" component = {Main}>
			<IndexRoute component = {Main} />
			<Route path='*' component={NotFound} />
		</Route>
	</Router>

), document.getElementById('app'))


