import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {

	const isLoggedIn = localStorage.getItem('isLoggedIn');
	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('userId');
		window.location.href = "/login";
	}
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/home">Expense Tracker</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/home">Home</Nav.Link>
					<Nav.Link href="/expenses">Expenses</Nav.Link>
					<Nav.Link href="/add">Add</Nav.Link>
					<Nav.Link href="/statistic">Statistic</Nav.Link>
					{isLoggedIn && (
         			<Button variant='dark' onClick={handleLogout}>Logout</Button>
      				)}
				</Nav>
			</Navbar>
		</div>
	)
}

export default NavBar;
