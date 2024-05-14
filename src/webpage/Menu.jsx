import React, { useState } from "react";
import "../webpage/style.css";

function Menu(props) {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<a className="myfont" href="#">
							Home
						</a>
					</li>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a href="#">Services</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
					<li>
						<a href="#">Shopping Card {props.value}</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Menu;
