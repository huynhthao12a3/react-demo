import React, { useEffect, useState } from "react";
import axios from "axios";
import { fileApi, customerApi } from "../../api";
import { ImageItem, Loading, ModalCustomer, Picture } from "../common/components";
import { Button, FloatingLabel, Form, Image, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import swal from "sweetalert";

function CustomerView(props) {
	// Hook
	const [inputValue, setInputValue] = useState("");
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("");
	const [showModalNewCustomer, setShowModalNewCustomer] = useState(false);
	const [customerInformation, setCustomerInformation] = useState({});
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
		const response = await customerApi.getCustomerByName(inputValue);
		if (response.isSuccess) {
			setIsLoading(false);
			setData(response.data);
		} else {
			setIsLoading(false);
			swal("Warning", response.message, "warning");
		}
	};
	const deleteData = async (customerId) => {
		const response = await customerApi.deleteCustomerById(customerId);
		return response;
	};
	const fetchImage = async (filePath) => {
		const response = await fileApi.getFileInfo(filePath);
	};

	// Add _ Update _ Delete
	const handleAddNewCustomer = () => {
		setStatus("Add");
		setCustomerInformation({});
		setShowModalNewCustomer(true);
	};
	const handleDoubleClick = (item) => {
		setStatus("Update");
		setCustomerInformation(item);
		setShowModalNewCustomer(true);
	};
	const handleInfoCustomer = (item) => {
		setStatus("Info");
		setCustomerInformation(item);
		setShowModalNewCustomer(true);
	};
	const handleUpdateCustomer = (item) => {
		setStatus("Update");
		setCustomerInformation(item);
		setShowModalNewCustomer(true);
	};
	const handleDeleteCustomer = (item) => {
		swal({
			title: "Are you sure?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await customerApi.deleteCustomerById(item.customerId);
				if (response.isSuccess) {
					swal("Success", response.message, "success");
					fetchData();
				}
			}
		});
	};

	// Show _ hide modal
	const handleHideModal = () => {
		setShowModalNewCustomer(false);
	};

	// Pass props to modal Customer
	const modalProps = {
		status: status,
		show: showModalNewCustomer,
		customerInformation: customerInformation,
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
								<FloatingLabel label="Search by Customer Name..." className="flex-grow-1 overflow-hidden">
									<Form.Control value={inputValue} onChange={handleInputChange} name="id" type="text" id="search" placeholder="id" />
								</FloatingLabel>
								<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={searchTooltip}>
									<Button type="submit" variant="primary" className="px-4 mx-2">
										<i className="bi bi-search fs-3"></i>
									</Button>
								</OverlayTrigger>
								<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={addTooltip}>
									<Button type="button" variant="success" className="px-4 mx-2" onClick={handleAddNewCustomer} data-toggle="modal" data-target="#popupNewCustomer">
										<i className="bi bi-plus-circle fs-3"></i>
									</Button>
								</OverlayTrigger>
							</div>
						</form>
					</div>

					<Table striped bordered hover responsive>
						<thead className="thead-light text-center">
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Address</th>
								<th>Phone</th>
								<th>Email</th>
								<th>Point</th>
								<th>Backlist Flag</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={index} onDoubleClick={() => handleDoubleClick(item)} className="text-center">
									<td>{item.customerId}</td>
									<td>{item.customerName}</td>
									<td>{item.customerAddress}</td>
									<td>{item.customerPhone}</td>
									<td>{item.customerEmail}</td>
									<td>{item.customerPoint}</td>
									<td>{item.customerBackListFlag ? "Y" : "N"}</td>
									<td className="d-flex justify-content-around">
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={infoTooltip}>
											<Button variant="info" onClick={() => handleInfoCustomer(item)}>
												<i className="bi bi-info-circle"></i>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={updateTooltip}>
											<Button variant="success" onClick={() => handleUpdateCustomer(item)}>
												<i className="bi bi-pencil-square"></i>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={deleteTooltip}>
											<Button variant="danger" onClick={() => handleDeleteCustomer(item)}>
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
			{showModalNewCustomer && <ModalCustomer modalProps={modalProps} />}
		</>
	);
}

export default CustomerView;
