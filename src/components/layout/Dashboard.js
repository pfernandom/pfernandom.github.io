import React from 'react'
import { Grid, Row, Col, Breadcrumb } from 'react-bootstrap';

class Dashboard extends React.Component{

	render(){
		return (
	<Grid>
		<Breadcrumb>
			<Breadcrumb.Item href="#">
				Home
			</Breadcrumb.Item>
			<Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
				Library
			</Breadcrumb.Item>
			<Breadcrumb.Item active>
				Data
			</Breadcrumb.Item>
		</Breadcrumb>

		<Row className="show-grid">
			<Col md={6}>
				{this.props.topLeft}
			</Col>
			<Col md={6}>
				{this.props.topRight}
			</Col>
		</Row>
		<Row className="show-grid">
			<Col md={6}>
				{this.props.bottomLeft}
			</Col>
			<Col md={6}>
				{this.props.bottomRight}
			</Col>
		</Row>
	</Grid>
		)
	}}

export default Dashboard