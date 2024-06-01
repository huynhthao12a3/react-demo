import React, { useEffect, useState } from "react";
import { fileApi } from "../../api";
import swal from "sweetalert";
import { Image, Table } from "react-bootstrap";
import Loading from "./../common/components/Loading";
import { Link, useLocation } from "react-router-dom";

function FileView(props) {
	const location = useLocation();
	// console.log(location);
	const [fileList, setFileList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fileApi.getAllFile();
		if (response.isSuccess) {
			setIsLoading(false);
			setFileList(response.data);
		} else {
			setIsLoading(false);
			swal("Warning", response.message, "warning");
		}
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Table striped bordered hover responsive>
					<thead className=" text-center">
						<tr>
							<th>File Name</th>
							<th>File Type</th>
							<th>File Size</th>
							<th>File Path</th>
							<th>File Review</th>
						</tr>
					</thead>
					<tbody>
						{fileList.map((item, index) => (
							<tr key={index} className="text-center">
								<td>{item.fileName}</td>
								<td>{item.fileType}</td>
								<td>{item.fileSize} KB</td>
								<td>
									<Link to={location.pathname + "/" + item.filePath}> {item.filePath}</Link>
								</td>
								<td>
									<Image src={item.fileData} thumbnail width={80} />
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}

export default FileView;
