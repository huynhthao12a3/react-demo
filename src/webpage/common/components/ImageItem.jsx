import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useEffect } from "react";
import { fileApi } from "./../../../api";
import { useParams } from "react-router-dom";
import { Loading } from "./";
import swal from "sweetalert";

function ImageItem(props) {
	let { filePath } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	// const { width, height, filePath } = { ...props };
	const [fileItem, setFileItem] = useState("");
	useEffect(() => {
		async function fetchImage() {
			const response = await fileApi.getFileInfo(filePath);
			if (response.isSuccess) {
				setIsLoading(false);
				setFileItem(response.data);
			} else {
				setIsLoading(false);
				swal("Warning", response.message, "warning");
			}
		}
		fetchImage();
	});
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Container fluid className="d-flex justify-content-center">
					<Image src={fileItem} fluid />
				</Container>
			)}
		</>
	);
}

export default ImageItem;
