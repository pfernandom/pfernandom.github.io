import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, browserHistory, hashHistory, IndexRoute  } from 'react-router'

import todoApp from './reducers'
import Menu from './components/menu'
import NotFound from './components/error'
import { Home, SplitHome } from './components/home'
import {TagDetail} from './components/tags'
import { loadState } from './actions'

import { Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css'
import './style.scss';

const loggerMiddleware = createLogger()

let store = createStore(todoApp,
	applyMiddleware(
	thunkMiddleware, // lets us dispatch() functions
	loggerMiddleware // neat middleware that logs actions
))

let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
)

store.dispatch(loadState('json/data.json')).then(() =>
	console.log(store.getState())
)

class Main extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<div>
				<Grid>
					{this.props.children}
				</Grid>
				</div>
			</Provider>
		)
	}
}

render((
	<Router history = {hashHistory}>
		<Route path = "/" component = {Main}>
			<IndexRoute component = {Home} />
			<Route path = "tags" component = {SplitHome}>
				<Route path=":tag" component={TagDetail} />
			</Route>
			<Route path='*' component={NotFound} />
		</Route>
	</Router>

), document.getElementById('app'))


