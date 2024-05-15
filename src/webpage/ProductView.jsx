import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductView(props) {
	// Hook
	const [inputValue, setInputValue] = useState("");
	const [data, setData] = useState([]);
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
		await axios
			.get("http://localhost:9999/tds/product/getProductByProductName", {
				params: {
					keyword: inputValue,
				},
			})
			.then(function (response) {
				// handle success
				setData(response.data);
				console.log("data: ", typeof response.data);
			});
	};
	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<label>
						<input type="text" value={inputValue} onChange={handleInputChange}></input>
					</label>
					<button type="submit">Submit</button>
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
						<th>output price</th>
						<th>quantity</th>
						<th>expired date</th>
						<th>image</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td>{item.product_id}</td>
							<td>{item.product_name}</td>
							<td>{item.remark}</td>
							<td>{item.input_price}</td>
							<td>{item.output_price}</td>
							<td>{item.output_date}</td>
							<td>{item.quantity}</td>
							<td>{item.expired_date}</td>
							<td>{item.image}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ProductView;
