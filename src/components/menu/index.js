import React from 'react'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

const Menu = () => {
	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="#">Scallywag</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<IndexLinkContainer to={`/`} activeHref="active">
						<NavItem>Home</NavItem>
					</IndexLinkContainer>

					<NavDropdown eventKey={3} title="Sign In" id="basic-nav-dropdown">
						<LinkContainer to={`/login`} activeHref="active">
							<NavItem>Login</NavItem>
						</LinkContainer>
						<LinkContainer to={`/signup`} activeHref="active">
							<NavItem>Signup</NavItem>
						</LinkContainer>
					</NavDropdown>

					{/*
					<NavItem eventKey={2} href="#">Link</NavItem>
					<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Action</MenuItem>
						<MenuItem eventKey={3.2}>Another action</MenuItem>
						<MenuItem eventKey={3.3}>Something else here</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.3}>Separated link</MenuItem>
					</NavDropdown>*/}
				</Nav>
				<Nav pullRight>
					{/*
					<NavItem eventKey={1} href="#">Link Right</NavItem>
					*/}
					<LinkContainer to={`/about`} activeHref="active">
						<NavItem>About</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Menu