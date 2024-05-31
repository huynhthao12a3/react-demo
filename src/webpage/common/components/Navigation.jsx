import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../images/tkg_logo.webp";
import "../css/navigation.css";

function Navigation(props) {
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem("token"));
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<Navbar id="client-navbar" collapseOnSelect expand="xl" className="bg-light text-dark shadow border-bottom flex-shrink-0">
			<div className="container-fluid">
				<Navbar.Brand href="/home">
					<Image alt="logo" src={logo} width="200px" fluid />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="fs-6">
					<Nav className="mx-auto">
						<NavLink className="nav-link mx-2" to="/home">
							<i className="bi bi-house me-1"></i>Home
						</NavLink>
						<NavLink className="nav-link mx-2" to="/product">
							<i className="bi bi-menu-down me-1"></i>Product
						</NavLink>
						<NavLink className="nav-link mx-2" to="/employee">
							<i className="bi bi-person-square me-1"></i>Employee
						</NavLink>

						<NavLink className="nav-link mx-2" to="/file">
							<i className="bi bi-file-earmark-code me-1"></i>File
						</NavLink>
						<NavLink className="nav-link mx-2" to="/about">
							<i className="bi bi-info-square me-1"></i>About
						</NavLink>
						<NavLink className="nav-link mx-2" to="/contact">
							<i className="bi bi-patch-question me-1"></i>Contact
						</NavLink>
					</Nav>

					<div className="m-3 d-flex justify-content-end ">
						{token ? (
							<div className="d-flex flex-column text-end">
								<span id="admin-navbar-email" className="px-2">
									Hi <span className="fw-bold">User</span>!
								</span>

								<NavDropdown title={""} id="nav-dropdown" className=" px-2">
									<NavDropdown.Item as={NavLink} to="/profile">
										My information
									</NavDropdown.Item>
									<NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
								</NavDropdown>
							</div>
						) : (
							<div className="d-flex text-end align-items-center">
								<Link to="/login" className="text-decoration-none text-muted fw-bold border-end px-2 text-center">
									Login
								</Link>
								<Link to="/register" className="text-decoration-none text-muted fw-bold border-start px-2 text-center">
									Register
								</Link>
							</div>
						)}

						<img id="admin-img-avatar" src={logo} alt="" width="40" height="40" className=" rounded-circle border p-1" />
					</div>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
}

export default Navigation;
