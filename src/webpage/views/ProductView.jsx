import React, { useEffect, useState } from "react";
import axios from "axios";
import { fileApi, productApi } from "../../api";
import { ImageItem, Loading, ModalProduct, Picture } from "../common/components";
import { Button, FloatingLabel, Form, Image, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import swal from "sweetalert";

function ProductView(props) {
	// Hook
	const [inputValue, setInputValue] = useState("");
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("");
	const [showModalNewProduct, setShowModalNewProduct] = useState(false);
	const [productInformation, setProductInformation] = useState({});
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
		const response = await productApi.getProductByName(inputValue);
		if (response.isSuccess) {
			setIsLoading(false);
			setData(response.data);
		} else {
			setIsLoading(false);
			swal("Warning", response.message, "warning");
		}
	};
	const deleteData = async (productId) => {
		const response = await productApi.deleteProductById(productId);
		return response;
	};
	const fetchImage = async (filePath) => {
		const response = await fileApi.getFileInfo(filePath);
	};

	// Add _ Update _ Delete
	const handleAddNewProduct = () => {
		setStatus("Add");
		setProductInformation({});
		setShowModalNewProduct(true);
	};
	const handleDoubleClick = (item) => {
		setStatus("Update");
		setProductInformation(item);
		setShowModalNewProduct(true);
	};
	const handleInfoProduct = (item) => {
		setStatus("Info");
		setProductInformation(item);
		setShowModalNewProduct(true);
	};
	const handleUpdateProduct = (item) => {
		setStatus("Update");
		setProductInformation(item);
		setShowModalNewProduct(true);
	};
	const handleDeleteProduct = (item) => {
		swal({
			title: "Are you sure?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await productApi.deleteProductById(item.productId);
				if (response.isSuccess) {
					swal("Success", response.message, "success");
					fetchData();
				}
			}
		});
	};

	// Show _ hide modal
	const handleHideModal = () => {
		setShowModalNewProduct(false);
	};

	// Pass props to modal Product
	const modalProps = {
		status: status,
		show: showModalNewProduct,
		productInformation: productInformation,
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
								<FloatingLabel label="Search by Product Name..." className="flex-grow-1 overflow-hidden">
									<Form.Control value={inputValue} onChange={handleInputChange} name="id" type="text" id="search" placeholder="id" />
								</FloatingLabel>
								<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={searchTooltip}>
									<Button type="submit" variant="primary" className="px-4 mx-2">
										<i className="bi bi-search fs-3"></i>
									</Button>
								</OverlayTrigger>

								<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={addTooltip}>
									<Button type="button" variant="success" className="px-4 mx-2" onClick={handleAddNewProduct} data-toggle="modal" data-target="#popupNewProduct">
										<i className="bi bi-plus-circle fs-3"></i>
									</Button>
								</OverlayTrigger>
							</div>
						</form>
					</div>

					<Table striped bordered hover responsive>
						<thead className="thead-light text-center">
							<tr>
								<th>Product Name</th>
								<th>Remark</th>
								<th>Input Price</th>
								<th>Output Price</th>
								<th>Input Date</th>
								<th>Quantity</th>
								<th>Expired Date</th>
								<th>Image</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={index} onDoubleClick={() => handleDoubleClick(item)} className="text-center">
									<td>{item.productName}</td>
									<td>{item.remark}</td>
									<td>{item.inputPrice}</td>
									<td>{item.outputPrice}</td>
									<td>{item.inputDate}</td>
									<td>{item.quantity}</td>
									<td>{item.expiredDate}</td>
									<td>
										<Picture filePath={item.image} height={50} />
									</td>
									<td className="d-flex justify-content-around">
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={infoTooltip}>
											<Button variant="info" onClick={() => handleInfoProduct(item)}>
												<i className="bi bi-info-circle"></i>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={updateTooltip}>
											<Button variant="success" onClick={() => handleUpdateProduct(item)}>
												<i className="bi bi-pencil-square"></i>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={deleteTooltip}>
											<Button variant="danger" onClick={() => handleDeleteProduct(item)}>
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
			{showModalNewProduct && <ModalProduct modalProps={modalProps} />}
		</>
	);
}

export default ProductView;
