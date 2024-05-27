import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../images/tkg_logo.webp";

function Navigation(props) {
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem("token"));
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};
	return (
		<>
			<Navbar id="client-navbar" collapseOnSelect expand="xl" className="bg-light text-dark shadow border-bottom flex-shrink-0">
				<div className="container-fluid">
					<Navbar.Brand href="/home">
						<img alt="logo" src={logo} width="260px" className=" d-inline-block " />{" "}
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mx-auto">
							<NavLink className="nav-link" to="/home">
								<i className="mdi mdi-home-outline me-2"></i>Home
							</NavLink>
							<NavLink className="nav-link" to="/product">
								<i className="mdi mdi-archive-outline me-2"></i>Product
							</NavLink>
							<NavLink className="nav-link" to="/about">
								<i className="mdi mdi-newspaper me-2"></i>About
							</NavLink>
							<NavLink className="nav-link" to="/contact">
								<i className="mdi mdi-note-multiple-outline me-2"></i>Contact
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

			{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						<img src={logo} width={80} />
					</a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link to="/home" className="nav-link">
									Home
								</Link>
							</li>
							<li className="nav-item ">
								<Link to="/about" className="nav-link">
									About
								</Link>
							</li>
							<li className="nav-item ">
								<Link to="/contact" className="nav-link">
									Contact
								</Link>
							</li>
							<li className="nav-item ">
								<Link to="/product" className="nav-link">
									Product
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav> */}
		</>
	);
}

export default Navigation;
