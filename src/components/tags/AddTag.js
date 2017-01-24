import React from 'react'
import {  Link } from 'react-router'
import { connect } from 'react-redux'
import { addTag } from '../../actions'

import { Form, FormGroup, FormControl, Col, Checkbox, Button, ControlLabel } from 'react-bootstrap'
import ReactDOM from "react-dom";

class AddTag extends React.Component {
	render() {
		let name
		let description
		return (
			<Form horizontal onSubmit={e => {
				e.preventDefault()
				name = ReactDOM.findDOMNode(this.refs.name).value;
				description = ReactDOM.findDOMNode(this.refs.description).value;
				if (!name.trim()) {
					return
				}
				this.props.dispatch(addTag({value:name,label:name,description:description}))
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

				<Button onClick={(e)=> {
					console.log(this.props.tags)   ;
					let uriContent = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(this.props.tags));
					let newWindow = window.open(uriContent, 'state.json');
				}}>Export</Button>
			</Form>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		tags: state.tags
	}
}

AddTag = connect( mapStateToProps )(AddTag)

export default AddTag