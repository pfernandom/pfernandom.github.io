import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser
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

class ConfirmForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			username:''
		};
	}

	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	handleCodeChange(e) {
		this.setState({code: e.target.value});
	}


	handleSubmit(e) {
		e.preventDefault();
		const s = this.state;
		const code = s.code;
		const username = s.username;

		var userData = {
			Username : username,
			Pool : userPool
		};

		var cognitoUser = new CognitoUser(userData);
		cognitoUser.confirmRegistration(code, true, function(err, result) {
			if (err) {
				alert(err);
				return;
			}
			console.log('call result: ' + result);
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>

				User Name:<input type="text"
							value={this.state.username}
							placeholder="User Name"
							onChange={this.handleUsernameChange.bind(this)}/>

				Code:<input type="text"
								value={this.state.code}
								placeholder="Code"
								onChange={this.handleCodeChange.bind(this)}/>
				<input type="submit"/>

				<div>{this.state.message}</div>
			</form>
		);
	}
}

export default ConfirmForm