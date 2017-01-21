import {Config, CognitoIdentityCredentials, AWS} from "aws-sdk";
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails
} from "amazon-cognito-identity-js";
import React from "react";
import ReactDOM from "react-dom";
import appConfig from "./config";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
	IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
	UserPoolId: appConfig.UserPoolId,
	ClientId: appConfig.ClientId,
});

class LogoutForm extends React.Component {
	constructor(props) {
		super(props);
	}

	logout(e) {
		e.preventDefault();
		var cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null) {
			cognitoUser.getSession(function(err, session) {
				if (err) {
					alert(err);
					return;
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

			});
		}
		cognitoUser.signOut();
	}

	render() {
		return (
			<a href="" onClick={this.logout.bind(this)}>Logout</a>
		);
	}
}

export default LogoutForm