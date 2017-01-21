import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
	CognitoUserPool,
	CognitoUserAttribute
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

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	handleEmailChange(e) {
		this.setState({email: e.target.value});
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}

	handleNameChange(e) {
		this.setState({name: e.target.value});
	}

	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		const s = this.state;
		const email = this.state.email.trim();
		const password = this.state.password.trim();
		const name = this.state.name;
		const username = this.state.username;
		const attributeList = [
			new CognitoUserAttribute({
				Name: 'email',
				Value: email,
			}),
			new CognitoUserAttribute({
				Name: 'name',
				Value: name,
			}),
			new CognitoUserAttribute({
				Name: 'preferred_username',
				Value: username,
			})
		];
		userPool.signUp(email, password, attributeList, null, (err, result) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log('user name is ' + result.user.getUsername());
			console.log('call result: ', result);
			s.message = "A confirmation code has been sent to "+result.CodeDeliveryDetails.Destination;
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				Email:<input type="text"
					   value={this.state.email}
					   placeholder="Email"
					   onChange={this.handleEmailChange.bind(this)}/>
				User Name:<input type="text"
							value={this.state.username}
							placeholder="User Name"
							onChange={this.handleUsernameChange.bind(this)}/>
				Password:<input type="password"
					   value={this.state.password}
					   placeholder="Password"
					   onChange={this.handlePasswordChange.bind(this)}/>
				Name:<input type="text"
								value={this.state.name}
								placeholder="Name"
								onChange={this.handleNameChange.bind(this)}/>
				<input type="submit"/>

				<div>{this.state.message}</div>
			</form>
		);
	}
}

export default SignUpForm