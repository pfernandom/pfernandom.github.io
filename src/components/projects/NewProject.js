import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { addProject } from '../../actions'
import { Form, FormGroup, FormControl, Col, Checkbox, Button, ControlLabel } from 'react-bootstrap'

class NewProject extends React.Component{
	render (){
		let name
		let description
		return(
		<Form horizontal onSubmit={e => {
			e.preventDefault()
			name = ReactDOM.findDOMNode(this.refs.name).value;
			description = ReactDOM.findDOMNode(this.refs.description).value;
			if (!name.trim()) {
				return
			}
			this.props.dispatch(addProject({name:name,description:description}))
		}}>
			<FormGroup controlId="formHorizontalName">
				<Col componentClass={ControlLabel} sm={2}>
					Name
				</Col>
				<Col sm={10}>
					<FormControl type="text" placeholder="Name" ref='name'/>
				</Col>
			</FormGroup>

			<FormGroup controlId="formHorizontalDescription">
				<Col componentClass={ControlLabel} sm={2}>
					Description
				</Col>
				<Col sm={10}>
					<FormControl type="textarea" placeholder="Description" ref='description'/>
				</Col>
			</FormGroup>

			<FormGroup>
				<Col smOffset={2} sm={10}>
					<Button type="submit">
						Save
					</Button>
				</Col>
			</FormGroup>
		</Form>
)}}

NewProject = connect()(NewProject)

export default NewProject