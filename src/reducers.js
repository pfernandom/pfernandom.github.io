import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, ADD_PROJECT, LOAD_SESSION, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

const initialState = {
	visibilityFilter: VisibilityFilters.SHOW_ALL,
	todos: [],
	projects: {
		1:{
		id:1,
		name:"Project 1",
		description:"This is a test project"
	}},
	session:{}
}

function session(state = initialState.session, action) {
	switch (action.type) {
		case LOAD_SESSION:
			return action.session
		default:
			return state
	}
}


function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return state
	}
}

function todos(state = initialState.todos, action) {
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					completed: false,
					id: Math.random()
				}
			]
		case TOGGLE_TODO:
			return state.map((todo, index) => {
				if (todo.id === action.index) {
					return Object.assign({}, todo, {
						completed: !todo.completed
					})
				}
				return todo
			})
		default:
			return state
	}
}

function projects(state = initialState.projects, action){
	switch  (action.type){
		case ADD_PROJECT:
			let newState = Object.assign({}, state)
			newState[action.value.id] = action.value
			return  newState;
		default:
			return state;
	}
}

const todoApp = combineReducers({
	visibilityFilter,
	todos,
	projects,
	session
})

export default todoApp