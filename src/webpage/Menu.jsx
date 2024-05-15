import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../webpage/style.css";

function Menu(props) {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/app" className="myfont">
							Home
						</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/contact-us">Contact Us</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					{/* <li>
						<a href="#">Shopping Card {props.value}</a>
					</li> */}
				</ul>
			</nav>
		</div>
	);
}

export default Menu;
