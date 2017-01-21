import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import todoApp from './reducers'
import About from './components/about'
import Menu from './components/menu'
import Help from './components/about/help'
import NotFound from './components/error'
import Home from './components/home'
import { SignUpForm, ConfirmForm, LoginForm } from './components/user'

import {loadSession} from './actions'

import {VisibleProjectList, ProjectDetail, NewProject} from './components/projects'
import { Grid, Row, Col } from 'react-bootstrap';
import './style.scss';
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute  } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css';

const loggerMiddleware = createLogger()

let store = createStore(todoApp,
	applyMiddleware(
	thunkMiddleware, // lets us dispatch() functions
	loggerMiddleware // neat middleware that logs actions
))

let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
)

class Main extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<div>
				<Menu/>
				<Grid>
					{this.props.children}
				</Grid>
				</div>
			</Provider>
		)
	}
}

store.dispatch(loadSession())

render((
	<Router history = {browserHistory}>
		<Route path = "/" component = {Main}>
			<IndexRoute component = {Home} />
			<Route path = "about" component = {About}>
				<Route path="help" component={Help} />
			</Route>
			<Route path = "login" component = {LoginForm}/>
			<Route path = "signup" component = {SignUpForm}/>
			<Route path = "confirm" component = {ConfirmForm}/>
			<Route path = "project" component = {VisibleProjectList}/>
			<Route path = "project/new" component = {NewProject}/>
			<Route path = "project(/:projectId)" component = {ProjectDetail}/>
			<Route path='*' component={NotFound} />
		</Route>
	</Router>

), document.getElementById('app'))


