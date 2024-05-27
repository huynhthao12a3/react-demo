import React, { useEffect, useState } from "react";
import axios from "axios";
import { productApi } from "../api";
import { ModalProduct } from "./common/components";

function ProductView(props) {
	// Hook
	const [inputValue, setInputValue] = useState("");
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("");
	const [showModalNewProduct, setShowModalNewProduct] = useState(false);
	const [productInformation, setProductInformation] = useState({});
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
		setData(response.data);
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
	const handleDeleteProduct = async (event) => {
		const response = await productApi.deleteProductById(event.target.value);
		fetchData();
	};

	// Show _ hide modal
	const handleHideModal = () => {
		console.log("Hide");
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

	return (
		<>
			<div>
				<div>
					<form onSubmit={handleSubmit} className="form-inline">
						<div className="form-group mx-sm-3 mb-2">
							<input value={inputValue} onChange={handleInputChange} name="id" type="text" className="form-control" id="search" placeholder="id" />
							<button style={{ marginTop: 30 }} type="submit" className="btn btn-primary mb-2">
								<i className="bi bi-search"></i>
							</button>
						</div>

						<button
							style={{ marginLeft: 50, marginTop: 30 }}
							type="button"
							className="btn btn-success mb-2"
							onClick={handleAddNewProduct}
							data-toggle="modal"
							data-target="#popupNewProduct"
						>
							<i className="bi bi-plus-circle"></i>
						</button>
					</form>
				</div>

				<table className="table table-hover table-striped ">
					<thead className="thead-light">
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
							<tr key={index} onDoubleClick={() => handleDoubleClick(item)}>
								<td>{item.productName}</td>
								<td>{item.remark}</td>
								<td>{item.inputPrice}</td>
								<td>{item.outputPrice}</td>
								<td>{item.inputDate}</td>
								<td>{item.quantity}</td>
								<td>{item.expiredDate}</td>
								<td>{item.image}</td>
								<td className="d-flex justify-content-around">
									<button className="btn btn-info" onClick={() => handleInfoProduct(item)}>
										<i className="bi bi-info-circle"></i>
									</button>
									<button className="btn btn-success" onClick={() => handleUpdateProduct(item)}>
										<i className="bi bi-pencil-square"></i>
									</button>
									<button className="btn btn-danger" onClick={handleDeleteProduct} value={item.productId}>
										<i className="bi bi-x-circle"></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showModalNewProduct && <ModalProduct modalProps={modalProps} />}
		</>
	);
}

export default ProductView;
