import React from "react";
import { Link } from "react-router-dom";
// import "../css/bootstrap.min.css";
import logo from "../images/tkg_logo.webp";

function Navigation(props) {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" routerlink="/home" routerlinkactive="active">
					<img src={logo} width={80} /> {/* Thay đổi chiều rộng theo ý muốn */}
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link to="/home" className="nav-lick">
								Home
							</Link>
						</li>
						<li className="nav-item ">
							<Link to="/about" className="nav-lick">
								About
							</Link>
						</li>
						<li className="nav-item ">
							<Link to="/contact" className="nav-lick">
								Contact
							</Link>
						</li>
						<li className="nav-item ">
							<Link to="/product" className="nav-lick">
								Product
							</Link>
						</li>
					</ul>
				</div>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">{/* (các mục menu hiện tại) */}</ul>
					<ul className="navbar-nav">
						{/* Thêm link Logout */}
						<li className="nav-item">
							<a className="nav-link">Logout</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

export default Navigation;
