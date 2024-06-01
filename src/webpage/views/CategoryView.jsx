import React, { useEffect, useState } from "react";
import axios from "axios";
import { fileApi, categoryApi } from "../../api";
import { ImageItem, Loading, Picture } from "../common/components";
import { Button, FloatingLabel, Form, Image, Table } from "react-bootstrap";
import swal from "sweetalert";

function CategoryView(props) {
	// Hook
	const [inputValue, setInputValue] = useState("");
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("");
	const [showModalNewCategory, setShowModalNewCategory] = useState(false);
	const [categoryInformation, setCategoryInformation] = useState({});
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
		const response = await categoryApi.getAllCategory(inputValue);
		if (response.isSuccess) {
			setIsLoading(false);
			setData(response.data);
		} else {
			setIsLoading(false);
			swal("Warning", response.message, "warning");
		}
	};

	// Add _ Update _ Delete
	const handleAddNewCategory = () => {
		setStatus("Add");
		setCategoryInformation({});
		setShowModalNewCategory(true);
	};
	const handleDoubleClick = (item) => {
		setStatus("Update");
		setCategoryInformation(item);
		setShowModalNewCategory(true);
	};
	const handleInfoCategory = (item) => {
		setStatus("Info");
		setCategoryInformation(item);
		setShowModalNewCategory(true);
	};
	const handleUpdateCategory = (item) => {
		setStatus("Update");
		setCategoryInformation(item);
		setShowModalNewCategory(true);
	};
	const handleDeleteCategory = (item) => {
		swal({
			title: "Are you sure?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await categoryApi.deleteCategoryById(item.categoryId);
				if (response.isSuccess) {
					swal("Success", response.message, "success");
					fetchData();
				}
			}
		});
	};

	// Show _ hide modal
	const handleHideModal = () => {
		setShowModalNewCategory(false);
	};

	// Pass props to modal Category
	const modalProps = {
		status: status,
		show: showModalNewCategory,
		categoryInformation: categoryInformation,
		handleHideModal: handleHideModal,
		fetchData: fetchData,
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<div className="mb-5">
						<form onSubmit={handleSubmit} className="form-inline">
							<div className="d-flex mx-4 p-4 border border-3 rounded">
								<FloatingLabel label="Search by Category Name..." className="flex-grow-1 overflow-hidden">
									<Form.Control value={inputValue} onChange={handleInputChange} name="id" type="text" id="search" placeholder="id" />
								</FloatingLabel>
								<Button type="submit" variant="primary" className="px-4 mx-2">
									<i className="bi bi-search fs-3"></i>
								</Button>
								<Button type="button" variant="success" className="px-4 mx-2" onClick={handleAddNewCategory} data-toggle="modal" data-target="#popupNewCategory">
									<i className="bi bi-plus-circle fs-3"></i>
								</Button>
							</div>
						</form>
					</div>

					<Table striped bordered hover responsive>
						<thead className="thead-light text-center">
							<tr>
								<th>Category name</th>
								<th>Description</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={index} onDoubleClick={() => handleDoubleClick(item)} className="text-center">
									<td>{item.categoryName}</td>
									<td>{item.categoryDescription}</td>
									<td className="d-flex justify-content-around">
										<Button variant="danger" onClick={() => handleDeleteCategory(item)}>
											<i className="bi bi-x-circle"></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
			{/* {showModalNewCategory && <ModalCategory modalProps={modalProps} />} */}
		</>
	);
}

export default CategoryView;
