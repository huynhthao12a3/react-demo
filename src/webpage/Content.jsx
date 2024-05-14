import React from "react";

function Content(props) {
	return (
		<div>
			<div>This is website content.</div>
			<p>{props.contentFromParent}</p>
		</div>
	);
}

export default Content;
