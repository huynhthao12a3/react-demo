import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useEffect } from "react";
import { fileApi } from "./../../../api";

function ImageItem(props) {
	console.log("props : ", props);
	const { width, height, filePath } = { ...props };
	const [fileItem, setFileItem] = useState("");
	useEffect(() => {
		async function fetchImage() {
			const response = await fileApi.getFileInfo(filePath);
			if (response.isSuccess) {
				setFileItem(response.data);
			}
		}
		fetchImage();
	});
	return <Image src={fileItem} width={width} height={height} />;
}

export default ImageItem;
