import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap';

class SplitScreen extends React.Component {
	render() {
		return (
			<Row className="show-grid">
				<Col md={this.props.leftColSize}>
					{this.props.left}
				</Col>
				<Col md={this.props.rightColSize}>
					{this.props.right}
				</Col>
			</Row>

		)
	}
}

SplitScreen.defaultProps = {
	leftColSize: 6,
	rightColSize: 6
};

export default SplitScreen