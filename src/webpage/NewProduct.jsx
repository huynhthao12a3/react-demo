import React, { useState } from "react";
import axios from "axios";

function NewProduct(props) {
	// define formData
	const [formData, setFormData] = useState({
		productId: "",
		productName: "",
		remark: "",
		inputPrice: 0,
		outputPrice: 0,
		inputDate: "2024-05-01",
		quantity: 0,
		expiredDate: "2025-05-01",
		image: "",
	});
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
		await axios
			.post("http://localhost:9999/tds/product/createProduct", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(function (response) {
				// if (response.ok) {
				console.log(response);
				alert(response.data);
				// }
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<>
			<form className="container" onSubmit={handleFormSubmit}>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="title">ID:</label>
					</div>
					<div className="col-10">
						<input id="title" name="productId" onChange={handleInputChange} type="text" className="form-control" placeholder="ID..." />
					</div>
				</div>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="name">Name:</label>
					</div>
					<div className="col-10">
						<input id="name" name="productName" onChange={handleInputChange} type="text" className="form-control" placeholder="Name..." />
					</div>
				</div>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="description">Remark:</label>
					</div>
					<div className="col-10">
						<textarea id="description" name="remark" onChange={handleInputChange} type="text" className="form-control" rows={4} placeholder="Remark..."></textarea>
					</div>
				</div>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="inputPrice">Input price:</label>
					</div>
					<div className="col-10">
						<input id="inputPrice" name="inputPrice" onChange={handleInputChange} type="number" className="form-control" placeholder="Input Price..." />
					</div>
				</div>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="outputPrice">Output price:</label>
					</div>
					<div className="col-10">
						<input id="outputPrice" name="outputPrice" onChange={handleInputChange} type="number" className="form-control" placeholder="Output Price..." />
					</div>
				</div>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="inputDate">Input date:</label>
					</div>
					<div className="col-10">
						<input id="inputDate" name="inputDate" onChange={handleInputChange} type="date" className="form-control" placeholder="Input date..." />
					</div>
				</div>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="quantity">Quantity:</label>
					</div>
					<div className="col-10">
						<input id="quantity" name="quantity" onChange={handleInputChange} type="number" className="form-control" placeholder="Quantity..." />
					</div>
				</div>
				<div className="form-group row py-3">
					<div className="col-2 text-left">
						<label htmlFor="expiredDate">Expired date:</label>
					</div>
					<div className="col-10">
						<input id="expiredDate" name="expiredDate" onChange={handleInputChange} type="date" className="form-control" placeholder="Expired date..." />
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
		</>
	);
}

export default NewProduct;
