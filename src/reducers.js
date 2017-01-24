import { combineReducers } from 'redux'
import { ADD_TAG, REQUEST_STATE, RECEIVE_STATE } from './actions'


const initialState = {
	isLoadingTags:false,
	tags:[]
}
/*
 export const REQUEST_STATE = 'REQUEST_STATE'
 export const RECEIVE_STATE = 'RECEIVE_STATE'
 */

function isLoadingTags(state = initialState.isLoadingTags, action){
	console.log("-----------------Loading -------------");
	switch (action.type) {
		case REQUEST_STATE:
			console.log("Loading state");
			return true;
		case RECEIVE_STATE:
			console.log("State Loaded");
			return true;
		default:
			return state
	}
}

function tags(state = initialState.tags, action) {
	switch (action.type) {
		case ADD_TAG:
			return [
				...state,
				action.value
			]
		case RECEIVE_STATE:
			return action.value;
		default:
			return state
	}
}


const todoApp = combineReducers({
	tags
})

export default todoApp