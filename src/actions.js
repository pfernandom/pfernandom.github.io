/*
 * action types
 */
import {config, Config, CognitoIdentityCredentials} from "aws-sdk";
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails
} from "amazon-cognito-identity-js";
import appConfig from "./components/user/config";
import Q from 'Q'

config.setPromisesDependency(Promise);

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
	IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
	UserPoolId: appConfig.UserPoolId,
	ClientId: appConfig.ClientId,
});


export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const ADD_PROJECT = 'ADD_PROJECT'

export const LOADING_SESSION = 'LOADING_SESSION'
export const LOAD_SESSION = 'LOAD_SESSION'
export const LOAD_FAILED_SESSION = 'LOAD_FAILED_SESSION'

/*
 * other constants
 */

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(text) {
	return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
	return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
	return { type: SET_VISIBILITY_FILTER, filter }
}

export function addProject(project={}){
	project.id=Math.random()
	return { type: ADD_PROJECT, value:project }
}

export function loadSession(){
	return function (dispatch) {
		var deferred = Q.defer()
		dispatch({ type: LOADING_SESSION, e:"" })
		let session;
		var cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null) {
			return cognitoUser.getSession(function(err, session) {

				if(err){
					alert(err);
					session = "";
					dispatch({ type:LOAD_FAILED_SESSION })
					deferred.reject(err)
				}

				console.log('session validity: ' + session.isValid());
				/*
				 AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				 IdentityPoolId : '...', // your identity pool id here
				 Logins : {
				 // Change the key below according to the specific region your user pool is in.
				 'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
				 }
				 });
				 */
				// Instantiate aws sdk service objects now that the credentials have been updated.
				// example: var s3 = new AWS.S3();
				session =  session;
				dispatch({ type: LOAD_SESSION, session:session })
				deferred.resolve({ type: LOAD_SESSION, session:session })
			})
		}
		else{
			dispatch({ type:LOAD_FAILED_SESSION })
		}
		return deferred.promise
	}
}

export function login(){
	return function (dispatch) {
		var deferred = Q.defer()
		dispatch({ type: LOADING_SESSION, e:"" })
		let session;
		var cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null) {
			return cognitoUser.getSession(function(err, session) {

				if(err){
					alert(err);
					session = "";
					dispatch({ type:LOAD_FAILED_SESSION })
					deferred.reject(err)
				}

				console.log('session validity: ' + session.isValid());
				/*
				 AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				 IdentityPoolId : '...', // your identity pool id here
				 Logins : {
				 // Change the key below according to the specific region your user pool is in.
				 'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
				 }
				 });
				 */
				// Instantiate aws sdk service objects now that the credentials have been updated.
				// example: var s3 = new AWS.S3();
				session =  session;
				dispatch({ type: LOAD_SESSION, session:session })
				deferred.resolve({ type: LOAD_SESSION, session:session })
			})
		}
		else{
			dispatch({ type:LOAD_FAILED_SESSION })
		}
		return deferred.promise
	}
}