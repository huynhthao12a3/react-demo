import React from "react";
import PropTypes from "prop-types";
import logo from "../images/tkg_logo.webp";
import loadingGif from "../images/loading.gif";

function Loading(props) {
	const style = {
		zIndex: 100,
	};
	return (
		<div style={style} className="position-fixed  start-0 end-0 top-0 bottom-0  bg-white">
			<div className="container-fluid d-flex flex-column h-100 align-items-center justify-content-center">
				<img src={logo} className="img-fluid" alt="Loading..." width={200} />
				<img src={loadingGif} alt="Loading..." />
			</div>
		</div>
	);
}

export default Loading;
