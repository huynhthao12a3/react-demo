import React, { useEffect, useState } from "react";
import axios from "axios";
import { productApi } from "../api";

function PopupNewProduct(props) {
	const [formData, setFormData] = useState({ ...props.productInformation });
	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};
	const handleImageChange = (event) => {
		setFormData({
			...formData,
			image: URL.createObjectURL(event.target.files[0]),
		});
	};
	const handleFormSubmit = (event) => {
		event.preventDefault();
		console.group("Form data: ");
		console.log(formData);
		console.groupEnd();
		fetchData();
	};
	const fetchData = async () => {
		const response = await productApi.createProduct(formData);
		console.log(response);
		props.hidePopup();
	};
	return (
		// d-block
		<div className="modal " id="popupNewProduct" tabIndex={-1} role="dialog">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add New Product</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						{/* Thêm form để nhập thông tin sản phẩm mới */}
						<form className="container" onSubmit={handleFormSubmit}>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="title">ID:</label>
								</div>
								<div className="col-10">
									<input id="title" name="productId" onChange={handleInputChange} value={formData.productId} type="text" className="form-control" placeholder="ID..." />
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="name">Name:</label>
								</div>
								<div className="col-10">
									<input id="name" name="productName" onChange={handleInputChange} value={formData.productName} type="text" className="form-control" placeholder="Name..." />
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="description">Remark:</label>
								</div>
								<div className="col-10">
									<textarea
										id="description"
										name="remark"
										onChange={handleInputChange}
										value={formData.remark}
										type="text"
										className="form-control"
										rows={4}
										placeholder="Remark..."
									></textarea>
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="inputPrice">Input price:</label>
								</div>
								<div className="col-10">
									<input
										id="inputPrice"
										name="inputPrice"
										onChange={handleInputChange}
										value={formData.inputPrice}
										type="number"
										className="form-control"
										placeholder="Input Price..."
									/>
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="outputPrice">Output price:</label>
								</div>
								<div className="col-10">
									<input
										id="outputPrice"
										name="outputPrice"
										onChange={handleInputChange}
										value={formData.outputPrice}
										type="number"
										className="form-control"
										placeholder="Output Price..."
									/>
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="inputDate">Input date:</label>
								</div>
								<div className="col-10">
									<input
										id="inputDate"
										name="inputDate"
										onChange={handleInputChange}
										value={new Date(formData.inputDate).toISOString().substring(0, 10)}
										type="date"
										className="form-control"
										placeholder="Input date..."
									/>
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="quantity">Quantity:</label>
								</div>
								<div className="col-10">
									<input id="quantity" name="quantity" onChange={handleInputChange} value={formData.quantity} type="number" className="form-control" placeholder="Quantity..." />
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="expiredDate">Expired date:</label>
								</div>
								<div className="col-10">
									<input
										id="expiredDate"
										name="expiredDate"
										onChange={handleInputChange}
										value={new Date(formData.expiredDate).toISOString().substring(0, 10)}
										type="date"
										className="form-control"
										placeholder="Expired date..."
									/>
								</div>
							</div>
							<div className="form-group row py-3">
								<div className="col-2 text-left">
									<label htmlFor="image">Image:</label>
								</div>
								<div className="col-10">
									<input id="inputFile" name="image" onChange={handleImageChange} type="file" accept="image/*" className="form-control" />
								</div>
							</div>
							<button type="submit" className="btn btn-primary">
								Save
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

function ProductView(props) {
	// Hook
	const [inputValue, setInputValue] = useState("");
	const [data, setData] = useState([]);
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
	const handleDeleteProduct = async (event) => {
		const params = {
			productId: event.target.value,
		};
		const response = await productApi.deleteProductById(params);
		console.log(response.data);
		fetchData();
	};

	// Call API
	const fetchData = async () => {
		const params = {
			productName: inputValue,
		};
		const response = await productApi.getProductByName(params);
		setData(response.data);
	};
	const handleAddNewProduct = () => {
		setShowModalNewProduct(true);
	};
	const hidePopup = () => {
		console.log("hide popup run");
		setShowModalNewProduct(false);
	};
	const handleDoubleClick = (item) => {
		console.log(item);
		setProductInformation(item);
		setShowModalNewProduct(true);
	};
	console.log("showModalNewProduct: ", showModalNewProduct);
	return (
		<>
			<div>
				<div>
					<form onSubmit={handleSubmit} className="form-inline">
						<div className="form-group mx-sm-3 mb-2">
							<label htmlFor="search" className="sr-only">
								Search
							</label>
							<input value={inputValue} onChange={handleInputChange} style={{ marginTop: "30px" }} name="id" type="text" className="form-control" id="search" placeholder="id" />
						</div>

						<button style={{ marginTop: 30 }} type="submit" className="btn btn-primary mb-2">
							Search
						</button>
						<button
							style={{ marginLeft: 50, marginTop: 30 }}
							type="button"
							className="btn btn-success mb-2"
							onClick={handleAddNewProduct}
							data-toggle="modal"
							data-target="#popupNewProduct"
						>
							Add Product
						</button>
					</form>
				</div>

				<table className="table table-hover table-striped">
					<thead className="thead-light">
						<tr>
							<th>product id</th>
							<th>product name</th>
							<th>remark</th>
							<th>input price</th>
							<th>output price</th>
							<th>input date</th>
							<th>quantity</th>
							<th>expired date</th>
							<th>image</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<tr key={index} onDoubleClick={() => handleDoubleClick(item)}>
								<td>{item.productId}</td>
								<td>{item.productName}</td>
								<td>{item.remark}</td>
								<td>{item.inputPrice}</td>
								<td>{item.outputPrice}</td>
								<td>{item.inputDate}</td>
								<td>{item.quantity}</td>
								<td>{item.expiredDate}</td>
								<td>{item.image}</td>
								<td>
									<button className="btn btn-danger" onClick={handleDeleteProduct} value={item.productId}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showModalNewProduct && <PopupNewProduct hidePopup={hidePopup} productInformation={productInformation} />}
		</>
	);
}

export default ProductView;
