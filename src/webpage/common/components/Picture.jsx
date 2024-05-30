import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useEffect } from "react";
import { fileApi } from "../../../api";
import { useParams } from "react-router-dom";
import { Loading } from ".";
import swal from "sweetalert";

function Picture(props) {
	const { width, height, filePath } = { ...props };
	const [fileItem, setFileItem] = useState("");
	useEffect(() => {
		async function fetchImage() {
			const response = await fileApi.getFileInfo(filePath);
			if (response.isSuccess) {
				setFileItem(response.data);
			} else {
				setFileItem(response.message);
			}
		}
		fetchImage();
	});
	return <Image src={fileItem} width={width} height={height} />;
}

export default Picture;
