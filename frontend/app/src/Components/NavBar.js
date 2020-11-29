import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/home">Expense Tracker</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/home">Home</Nav.Link>
					<Nav.Link href="/expenses">Expenses</Nav.Link>
					<Nav.Link href="/add">Add</Nav.Link>
					<Nav.Link href="#pricing">Statistic</Nav.Link>
				</Nav>
				</Navbar>
			</div>
		)
	}
}

export default NavBar;