import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap';

const FullScreen = () => (
	<Row className="show-grid">
		<Col md={12}>
			{this.props.children}
		</Col>
	</Row>

)

export default FullScreen