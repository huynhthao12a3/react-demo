import React from "react";
import noteFoundPage from "../common/images/notfoundpage.png";

function NotFound(props) {
	return (
		<div className="w-100 d-flex justify-content-center">
			<img className="img-fluid" src={noteFoundPage} alt="not-found-page" />
		</div>
	);
}

export default NotFound;
