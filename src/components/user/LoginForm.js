import {AWS, Config, CognitoIdentityCredentials} from "aws-sdk";
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails
} from "amazon-cognito-identity-js";
import React from "react";
import ReactDOM from "react-dom";
import appConfig from "./config";

import LogoutForm from './LogoutForm'

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
	IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
	UserPoolId: appConfig.UserPoolId,
	ClientId: appConfig.ClientId,
});

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		let isLogged = false;
		var cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null) {
			cognitoUser.getSession(function(err, session) {
				if (err) {
					alert(err);
					return;
				}
				console.log('session validity: ' + session.isValid());
				isLogged = session.isValid();
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

				cognitoUser.getUserAttributes(function(err, result) {
					if (err) {
						alert(err);
						return;
					}
					for (var i in result) {
						console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
					}
				});
			});
		}


		//let email =  result[i].getName()

		this.state = {
			email: '',
			password: '',
			isLoggedIn: isLogged
		};
	}

	handleEmailChange(e) {
		this.setState({email: e.target.value});
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		const s = this.state;
		const username = this.state.email.trim();
		const password = this.state.password.trim();


		var authenticationData = {
			Username : username,
			Password : password,
		};
		var authenticationDetails = new AuthenticationDetails(authenticationData);

		var userData = {
			Username : username,
			Pool : userPool
		};
		var cognitoUser = new CognitoUser(userData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function (result) {
				console.log('access token + ' + result.getAccessToken().getJwtToken());

				let conf = {
					IdentityPoolId : appConfig.IdentityPoolId, // your identity pool id here
					Logins : {
						// Change the key below according to the specific region your user pool is in.
					}
				}
				//'cognito-idp.'+appConfig.region+'.amazonaws.com/'+appConfig.UserPoolId : result.getIdToken().getJwtToken()
				conf.Logins['cognito-idp.'+appConfig.region+'.amazonaws.com/'+appConfig.UserPoolId] = result.getIdToken().getJwtToken();

				AWS.config.credentials = new AWS.CognitoIdentityCredentials(conf);

				// Instantiate aws sdk service objects now that the credentials have been updated.
				// example: var s3 = new AWS.S3();
				s.isLoggedIn = true;
			},

			onFailure: function(err) {
				alert(err);
			},

		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				Email:<input type="text"
					   value={this.state.email}
					   placeholder="Email"
					   onChange={this.handleEmailChange.bind(this)}/>
				Password:<input type="password"
					   value={this.state.password}
					   placeholder="Password"
					   onChange={this.handlePasswordChange.bind(this)}/>
				<input type="submit"/>

				<div>{this.state.message}</div>
				{ this.state.isLoggedIn ? <LogoutForm/> : null }

			</form>
		);
	}
}

export default LoginForm