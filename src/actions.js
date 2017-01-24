import axios from 'axios'

/*
 * action types
 */
export const ADD_TAG = 'ADD_TAG'
export const REQUEST_STATE = 'REQUEST_STATE'
export const RECEIVE_STATE = 'RECEIVE_STATE'

/*
 * action creators
 */

export function addTag(tag) {
	return { type: ADD_TAG, value:tag }
}

export function requestState(url) {
	return { type: REQUEST_STATE, value:url }
}

export function receiveState(newState) {
	return { type: RECEIVE_STATE, value:newState }
}

export function loadState(url) {
	return dispatch => {
		dispatch(requestState(url))
		return axios.get(url)
			.then(response => response.data)
			.then(newState => dispatch(receiveState(newState)))
	}
}