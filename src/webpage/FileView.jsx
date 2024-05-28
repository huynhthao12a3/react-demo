import React, { useEffect, useState } from "react";
import { fileApi } from "../api";
import swal from "sweetalert";
import { Image, Table } from "react-bootstrap";

function FileView(props) {
	const [fileList, setFileList] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fileApi.getAllFile();
		if (response.isSuccess) {
			setFileList(response.data);
		} else {
			swal("Warning", response.message, "warning");
		}
	};
	return (
		<>
			<Table hover striped bordered>
				<thead>
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
						<tr key={index}>
							<td>{item.fileName}</td>
							<td>{item.fileType}</td>
							<td>{item.fileSize} KB</td>
							<td>{item.filePath}</td>
							<td>
								<Image src={"data:image/jpeg;base64," + item.fileContent} thumbnail width={80} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}

export default FileView;
