import React, { useEffect, useState } from "react";
import axios from "axios";
import { fileApi, employeeApi } from "../../api";
import { ImageItem, Loading, Picture, ModalEmployee } from "../common/components";
import { Button, FloatingLabel, Form, Image, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import swal from "sweetalert";

function EmployeeView(props) {
	// Hook
	const [inputValue, setInputValue] = useState("");
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("");
	const [showModalNewEmployee, setShowModalNewEmployee] = useState(false);
	const [employeeInformation, setEmployeeInformation] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetchData();
	}, []);

	// Handle
	const handleSubmit = (event) => {
		event.preventDefault();
		fetchData();
	};
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	// Call API
	const fetchData = async () => {
		const response = await employeeApi.getEmployeeByName(inputValue);
		if (response.isSuccess) {
			setIsLoading(false);
			setData(response.data);
		} else {
			setIsLoading(false);
			swal("Warning", response.message, "warning");
		}
	};
	const deleteData = async (employeeId) => {
		const response = await employeeApi.deleteEmployeeById(employeeId);
		return response;
	};
	const fetchImage = async (filePath) => {
		const response = await fileApi.getFileInfo(filePath);
	};

	// Add _ Update _ Delete
	const handleAddNewEmployee = () => {
		setStatus("Add");
		setEmployeeInformation({});
		setShowModalNewEmployee(true);
	};
	const handleDoubleClick = (item) => {
		setStatus("Update");
		setEmployeeInformation(item);
		setShowModalNewEmployee(true);
	};
	const handleInfoEmployee = (item) => {
		setStatus("Info");
		setEmployeeInformation(item);
		setShowModalNewEmployee(true);
	};
	const handleUpdateEmployee = (item) => {
		setStatus("Update");
		setEmployeeInformation(item);
		setShowModalNewEmployee(true);
	};
	const handleDeleteEmployee = (item) => {
		swal({
			title: "Are you sure?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await employeeApi.deleteEmployeeById(item.employeeId);
				if (response.isSuccess) {
					swal("Success", response.message, "success");
					fetchData();
				}
			}
		});
	};

	// Show _ hide modal
	const handleHideModal = () => {
		setShowModalNewEmployee(false);
	};

	// Pass props to modal Employee
	const modalProps = {
		status: status,
		show: showModalNewEmployee,
		employeeInformation: employeeInformation,
		handleHideModal: handleHideModal,
		fetchData: fetchData,
	};

	// Tooltip
	const infoTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Information
		</Tooltip>
	);
	const updateTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Update
		</Tooltip>
	);
	const deleteTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Delete
		</Tooltip>
	);
	const searchTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Search
		</Tooltip>
	);
	const addTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Add
		</Tooltip>
	);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<div className="mb-5">
						<form onSubmit={handleSubmit} className="form-inline">
							<div className="d-flex mx-4 p-4 border border-3 rounded">
								<FloatingLabel label="Search by Employee Name..." className="flex-grow-1 overflow-hidden">
									<Form.Control value={inputValue} onChange={handleInputChange} name="id" type="text" id="search" placeholder="id" />
								</FloatingLabel>
								<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={searchTooltip}>
									<Button type="submit" variant="primary" className="px-4 mx-2">
										<i className="bi bi-search fs-3"></i>
									</Button>
								</OverlayTrigger>
								<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={addTooltip}>
									<Button type="button" variant="success" className="px-4 mx-2" onClick={handleAddNewEmployee} data-toggle="modal" data-target="#popupNewEmployee">
										<i className="bi bi-plus-circle fs-3"></i>
									</Button>
								</OverlayTrigger>
							</div>
						</form>
					</div>

					<Table striped bordered hover responsive>
						<thead className="thead-light text-center">
							<tr>
								<th>Full Name</th>
								<th>Phone</th>
								<th>Email</th>
								<th>Address</th>
								<th>Hire Date</th>
								<th>End Date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={index} onDoubleClick={() => handleDoubleClick(item)} className="text-center">
									<td>{item.employeeName}</td>
									<td>{item.employeePhone}</td>
									<td>{item.employeeEmail}</td>
									<td>{item.employeeAddress}</td>
									<td>{item.employeeHireDate}</td>
									<td>{item.employeeEndDate}</td>
									<td className="d-flex justify-content-around">
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={infoTooltip}>
											<Button variant="info" onClick={() => handleInfoEmployee(item)}>
												<i className="bi bi-info-circle"></i>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={updateTooltip}>
											<Button variant="success" onClick={() => handleUpdateEmployee(item)}>
												<i className="bi bi-pencil-square"></i>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={deleteTooltip}>
											<Button variant="danger" onClick={() => handleDeleteEmployee(item)}>
												<i className="bi bi-x-circle"></i>
											</Button>
										</OverlayTrigger>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
			{showModalNewEmployee && <ModalEmployee modalProps={modalProps} />}
		</>
	);
}

export default EmployeeView;
